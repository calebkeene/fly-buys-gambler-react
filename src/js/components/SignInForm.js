import React from 'react';
import AlertPanel from './AlertPanel';
import '../../styles/css/Buttons.css';
import '../../styles/css/SignInForm.css';

class SignInForm extends React.Component {
  constructor(props) {
    super(props);
    this._handleNextButtonClick = this._handleNextButtonClick.bind(this);
    this._updateCurrentInputValue = this._updateCurrentInputValue.bind(this);
    this._checkInputIsValid = this._checkInputIsValid.bind(this);

    this.state = {
      cardNumberOrEmail: '',
      enteringCardOrEmail: true,
      enteringPassword: false,
      error: null,
      memberExistanceCheckInitiated: false // for displaying responsive errors after they've failed once
    }
  }

  _validEmailRegxp() {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  }
  _validFlyBuysCardRegxp() {
    return /(6014)-\d{4}-\d{4}-\d{4}/;
  }

  _checkInputIsValid(cardNumberOrEmail) {
    let input = cardNumberOrEmail;
    let error = null;

    let validEmail = this._validEmailRegxp().test(input.toLowerCase());
    let validCardNumber = this._validFlyBuysCardRegxp().test(input);

    if (validEmail || validCardNumber) {
      this.setState({ error: null });
    }
    else {
      error = 'Invalid email address or card number';
      this.setState({ error });
    }
    return (error ? false : true);
  }

  _updateCurrentInputValue(event) {
    let cardNumberOrEmail = event.target.value;
    if(this.state.memberExistanceCheckInitiated) {
      // give quick user feedback if they've already failed with the format
      this._checkInputIsValid(cardNumberOrEmail);
    }
    console.log("updating current input value")
    this.setState({ cardNumberOrEmail });
  }

  _handleNextButtonClick() {
    let cardNumberOrEmail = this.state.cardNumberOrEmail;
    this.setState({ memberExistanceCheckInitiated: true });

    if (this._checkInputIsValid(cardNumberOrEmail)) { // extra safety check before calling API
      console.log("input is valid");
      this.setState({ memberExistanceCheckInitiated: false });

      if (this.state.enteringCardOrEmail) {
        console.log("checking member exists");
      }
      else {
        console.log("logging in member");
        //this.props.loginMember();
      }
    }
    else {
      console.log("input is invalid, error: " + this.state.error);
      return null;
    }
  }

  render() {
    let formInputPlaceholder = this.state.enteringCardOrEmail ? 'FlyBuys card number OR email' : 'password';
    // error (AlertPanel) component will show if either of these are truthy
    let error = this.props.error || this.state.error;
    console.log("error => " + error);
    return(
      <React.Fragment>
        <div class='sign-in-form'>
            <div class='row'>
              <h2 class='col'>Sign In</h2>
            </div>
            <div class='row'>
              <input
                type='text'
                class='sign-in-form__form-input col form-control'
                name='form-input'
                placeholder={formInputPlaceholder}
                value={this.state.cardNumberOrEmail}
                onChange={this._updateCurrentInputValue}
              />
            </div>
            <div class='row'>
              <button type='button' class='btn btn-primary btn--next col' onClick={this._handleNextButtonClick}>Next</button>
            </div>
        </div>
        <AlertPanel
          alertType='warning'
          additionalHtmlClasses='sign-in-form__errors'
          isShowing={!(error === null)} // bit more explicit than assuming falsey-ness
          displayText={error}
        />
      </React.Fragment>
    )
  }
}

export default SignInForm;
