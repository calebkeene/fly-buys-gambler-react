import React, { Component } from 'react';
import Header from './Header';
import SignInForm from './SignInForm';
import GamblePage from './GamblePage';

import MemberService from '../services/MemberService';
import FlyBuysCardService from '../services/FlyBuysCardService';

import '../../styles/css/App.css'

class App extends Component {
  constructor(props) {
    super(props);

    this._checkMemberExists = this._checkMemberExists.bind(this);
    this._signInMember = this._signInMember.bind(this);
    this._signOutMember = this._signOutMember.bind(this);
    this._gambleBalance = this._gambleBalance.bind(this);
    this._defaultSignInForm = this._defaultSignInForm.bind(this);
    this._defaultMember = this._defaultMember.bind(this);
    this._magicallyGivePoints = this._magicallyGivePoints.bind(this);

    this.state = {
      signInForm: this._defaultSignInForm(),
      member: this._defaultMember(),
      gamblePage: {
        error: null,
        successMessage: null
      },
      currentView: 'SignInForm' //SignInForm, GamblePage
    };
  }

  _defaultSignInForm() {
    return {
      show: true,
      enteringCardOrEmail: true,
      enteringPassword: false,
      error: null
    };
  }

  _defaultMember() {
    return {
      name: null,
      email: null,
      currentBalance: null,
      isSignedIn: false
    };
  }

  _checkMemberExists(cardNumberOrEmail) {
    // API call (GET /member/api/v1/exists.json)
    let signInForm = this.state.signInForm;
    signInForm.error = null;

    MemberService.checkMemberExists(cardNumberOrEmail)
    .then(result => {
      console.log("result => " + JSON.stringify(result));
      if(result['status'] !== 200) {
        console.log("response.status != 200");
        signInForm.error = result['message'];
      }
      else {
        console.log('200 OK, everything\'s fine');
        signInForm.enteringCardOrEmail = false;
        signInForm.enteringPassword = true;
      }
      this.setState({ signInForm }); // so props error will not show in component
      });
  }

  _signInMember(memberPassword, cardNumberOrEmail) {
    let signInForm = this.state.signInForm;
    let currentView = this.state.currentView;
    let member = this.state.member;
    console.log('calling _signInMember, cardNumberOrEmail =>', + cardNumberOrEmail);

    MemberService.signInMember(memberPassword, cardNumberOrEmail)
      .then(result => {
        if(result['status'] !== 200) {
          console.log('sign-in unsuccessful')
          signInForm.error = result['message'];
          member.isSignedIn = false;
        }
        else {
          console.log("sign-in success");
          // may move these into signOut call
          signInForm.error = null;
          signInForm.enteringCardOrEmail = true;
          signInForm.enteringPassword = false;
          signInForm.resetMemberData = false;

          currentView = 'GamblePage';
          member.email = result['email'];
          member.name = result['name'];
          member.currentBalance = result['currentBalance'];
          member.isSignedIn = true;
        }
        this.setState({ currentView, member, signInForm });
      })
  }

  _signOutMember() {
    console.log("signing out member!");
    let member = this.state.member
    // tell server to delete signed cookie
    MemberService.signOutMember(member.email)
      .then(result => {
        if(result['status'] === 200) {
          console.log('successfully signed out');
          // reset component states to default
          // let member = this._defaultMember();
          // let signInForm = this._defaultSignInForm();
          // signInForm.resetMemberData = true;
          // let gamblePage = { error: null, successMessage: null };

          //this.setState({ currentView: 'SignInForm', member, signInForm, gamblePage });
          window.location.reload(); // just hard-reset for now (blow away all component state)
        }
      })
  }

  _gambleBalance(successfulGamble) {
    console.log("gambling balance!");
    let member = this.state.member;
    let gamblePage = this.state.gamblePage;

    let updatedBalance = successfulGamble ? (member.currentBalance * 2) : 0;
    console.log("updating balance to " + updatedBalance);
    FlyBuysCardService.updateBalance(updatedBalance, member.email)
      .then(result => {
        console.log('result => ' + JSON.stringify(result));
        if(result['status'] === 200) {
          console.log('gamble API call success');
          gamblePage.error = null;
          gamblePage.successMessage = 'Congratuations! you doubled your balance!';
          member.currentBalance = result['updatedBalance'];
        }
        else {
          console.log('gamble API call error')
          gamblePage.error = result['message'];
        }
        this.setState({ gamblePage, member });
      })
  }

  // this function is just for testing and will be removed
  _magicallyGivePoints(updatedBalance) {
    let member = this.state.member;
    let gamblePage = this.state.gamblePage;

    FlyBuysCardService.updateBalance(updatedBalance, member.email)
      .then(result => {
        gamblePage.error = null;
        gamblePage.successMessage = 'Points magically added';
        member.currentBalance = result['updatedBalance'];
        this.setState({ gamblePage, member });
      })
  }

  render() {
    let signInForm = this.state.signInForm;
    let member = this.state.member;
    let gamblePage = this.state.gamblePage;

    return (
      <React.Fragment>
        <Header
          member={member}
          signOutMember={this._signOutMember}
        />
        <div class='container'>
          <div class='row align-items-center'>
            <div class='col-10 offset-1 col-sm-8 offset-sm-2 col-md-6 offset-md-3'>
              <SignInForm
                isShowing={this.state.currentView === 'SignInForm'}
                isEnteringCardOrEmail={signInForm.enteringCardOrEmail}
                isEnteringPassword={signInForm.enteringPassword}
                cardNumberOrEmail={this.state.member.cardNumberOrEmail}
                checkMemberExists={this._checkMemberExists}
                signInMember={this._signInMember}
                error={signInForm.error}
                resetMemberData={signInForm.resetMemberData}
                userIsSignedIn={member.isSignedIn}
              />
              <GamblePage
                isShowing={this.state.currentView === 'GamblePage' && (member.currentBalance !== null)}
                currentBalance={member.currentBalance}
                gambleBalance={this._gambleBalance}
                successMessage={gamblePage.successMessage}
                error={gamblePage.error}
                magicallyGivePoints={this._magicallyGivePoints} // added for testing purposes
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
