import React, { Component } from 'react';
import Header from './Header';
import SignInForm from './SignInForm';
import GamblePage from './GamblePage';

import MemberService from '../services/MemberService';

import '../../styles/css/App.css'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      signInForm: {
        show: true,
        enteringCardOrEmail: true,
        enteringPassword: false,
        memberIsSignedIn: false,
        error: null,
      },
      member: {
        name: null,
        cardNumberOrEmail: null,
        currentBalance: null,
        isSignedIn: false
      },
      currentView: 'SignInForm' //SignInForm, GamblePage, WinningPage, LosingPage
    };
    this._checkMemberExists = this._checkMemberExists.bind(this);
    this._loginMember = this._loginMember.bind(this);
  }

  _checkMemberExists(cardNumberOrEmail) {
    // API call (GET /member/api/v1/exists.json)
    console.log('calling checkMemberExists in App.js');

    let signInForm = this.state.signInForm;
    signInForm.error = null;

    MemberService.checkMemberExists(cardNumberOrEmail)
    .then(result => {
      if(result['status'] != 200) {
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
    //this.setState({ signInForm: signInFormState });
  }

  _loginMember(memberPassword) {
    let signInForm = this.state.signInForm;

    MemberService.loginMember(memberPassword)
      .then(result => {
        console.log("login result => " + JSON.stringify(result))
        if(result['status'] !== 200) {
          console.log('login unsuccessful')
          signInForm.error = result['message']
        }
        else {
          console.log("sign-in success")
          this.setState({ currentView: 'GamblePage' });
        }
      })
  }

  render() {
    let signInForm = this.state.signInForm;
    let member = this.state.member;
    return (
      <React.Fragment>
        <Header
          memberIsLoggedIn={this.state.memberIsLoggedIn}
          memberName={this.state.memberName}
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
                loginMember={this._loginMember}
                error={signInForm.error}
              />
              <GamblePage
                isShowing={this.state.currentView === 'GamblePage' && member.currentBalance}
                currentBalance={member.currentBalance}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
