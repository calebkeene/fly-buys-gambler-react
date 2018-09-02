import React from 'react';

class SignInInput extends React.Component {
  constructor(props) {
    super(props);
    this._updateCurrentInputValue = this._updateCurrentInputValue.bind(this);
  }

  _updateCurrentInputValue(event) {
    let currentInput = event.target.value;
    this.props.updateCurrentInputValue(currentInput);
  }
  render(){
    let enteringCardOrEmail = this.props.isEnteringCardOrEmail;
    let value = this.props.currentInput;
    // TODO: remove duplication
    if(enteringCardOrEmail) {
      let formInputPlaceholder = 'FlyBuys card number OR email';
      return(
        <input
          type='text'
          class='sign-in-form__form-input col form-control'
          name='form-input'
          placeholder={formInputPlaceholder}
          value={value}
          onChange={this._updateCurrentInputValue}
          id='sign-in-input'
        />
      )
    }
    else {
      let formInputPlaceholder = 'Account Password';
      return(
        <input
          type='password'
          class='sign-in-form__form-input col form-control'
          name='form-input'
          placeholder={formInputPlaceholder}
          value={value}
          onChange={this._updateCurrentInputValue}
          id='sign-in-input'
        />
      )
    }
  }
}

export default SignInInput;
