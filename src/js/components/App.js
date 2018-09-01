import React, { Component } from 'react';
import Header from './Header';
import SignInForm from './SignInForm';

import MemberService from '../services/MemberService';

import '../../styles/css/App.css'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      signInForm: {
        show: true,
        memberIsSignedIn: false,
        error: null
      },
      member: {
        name: null,
        cardNumberOrEmail: null,
        currentBalance: null
      }
    };
    this._checkMemberExists = this._checkMemberExists.bind(this);
    this._loginMember = this._loginMember.bind(this);
  }

  _checkMemberExists(cardNumberOrEmail) {
    // API call (GET /member/api/v1/exists.json)
    MemberService.checkMemberExists(cardNumberOrEmail).then( (result) => {
      console.log('returning result!');
      console.log(JSON.stringify(result));
    });
    //this.setState({ signInForm: signInFormState });

  }

  _loginMember() {

  }

  render() {
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
                isShowing={this.state.signInForm.show}
                cardNumberOrEmail={this.state.member.cardNumberOrEmail}
                checkMemberExists={this._checkMemberExists}
                loginMember={this._loginMember}
                error={this.state.signInForm.error}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
