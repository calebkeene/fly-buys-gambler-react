import React from 'react';
import SignInInput from './SignInInput';
import AlertPanel from './AlertPanel';
import '../../styles/css/Buttons.css';

class SignInForm extends React.Component {
  constructor(props) {
    super(props);
    this._handleNextButtonClick = this._handleNextButtonClick.bind(this);
    this._updateCurrentInputValue = this._updateCurrentInputValue.bind(this);
    this._checkInputIsValid = this._checkInputIsValid.bind(this);

    this.state = {
      cardNumberOrEmail: '',
      memberPassword: '',
      error: null,
      showLocalError: false,
      showApiError: false,
      previousApiCallMade: false // for displaying responsive errors after they've failed once
    }
  }

  _validEmailRegxp() {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  }
  _validFlyBuysCardRegxp() {
    return /(6014)-\d{4}-\d{4}-\d{4}/;
  }

  _showInternalError() {
    this.state.error && this.state.previousApiCallMade;
  }

  // only used when entering card number or email
  _checkInputIsValid(cardNumberOrEmail) {
    let input = cardNumberOrEmail;
    let error = null;

    let validEmail = this._validEmailRegxp().test(input.toLowerCase());
    let validCardNumber = this._validFlyBuysCardRegxp().test(input);

    if (validEmail || validCardNumber) {
      this.setState({ error, showLocalError: false });
    }
    else {
      error = 'Invalid email address or card number';
      this.setState({ error });
    }
    return (error ? false : true);
  }

  _updateCurrentInputValue(currentInput) {
    let showApiError = false;
    if(this.props.isEnteringCardOrEmail) {
      let cardNumberOrEmail = currentInput;
      this.setState({ cardNumberOrEmail, showApiError });
      this._checkInputIsValid(cardNumberOrEmail);
    }
    else { //password
      let memberPassword = currentInput; // TODO: encrypt this before saving
      this.setState({ memberPassword, showApiError });
    }
  }

  _handleNextButtonClick() {
    let showLocalError = true;
    let showApiError = true;
    let cardNumberOrEmail = this.state.cardNumberOrEmail;

    if (this.props.isEnteringCardOrEmail) {
      if (this._checkInputIsValid(cardNumberOrEmail)) {
        this.props.checkMemberExists(cardNumberOrEmail);
      }
    }
    else if (this.props.isEnteringPassword) { // entering password
      showLocalError = false;
      let memberPassword = this.state.memberPassword;
      this.props.signInMember(memberPassword, cardNumberOrEmail);
    }
    this.setState({ showLocalError, showApiError });
  }

  render() {
    if (this.props.isShowing) {
      let error = null;
      if (this.state.showLocalError || this.state.showApiError) {
        error = (this.props.error && this.state.showApiError) ? this.props.error : this.state.error;
      }

      let signInInputValue = this.props.isEnteringCardOrEmail ? this.state.cardNumberOrEmail : this.state.memberPassword;
      return (
        <React.Fragment>
          <div class='sign-in-form'>
            <div class='row'>
              <h2 class='col'>Sign In</h2>
            </div>
            <div class='row'>
              <SignInInput
                isEnteringCardOrEmail={this.props.isEnteringCardOrEmail}
                currentInput={signInInputValue}
                updateCurrentInputValue={this._updateCurrentInputValue}
              />
            </div>
            <div class='row'>
              <button type='button' class='btn btn-primary btn--next col' onClick={this._handleNextButtonClick}>Next</button>
            </div>
          </div>
          <AlertPanel
            alertType='warning'
            isShowing={error}
            displayText={error}
            dismissable={false}
          />
        </React.Fragment>
      )
    }
    else {
      return null;
    }
  }
}

export default SignInForm;
