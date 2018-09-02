import React from 'react';
import Cards from 'react-credit-cards';
import AlertPanel from './AlertPanel';
import 'react-credit-cards/es/styles-compiled.css';

class GamblePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toppingUpAccount: false
    }
    this._handleGambleButtonClick = this._handleGambleButtonClick.bind(this);
    this._handleTopUpButtonClick = this._handleTopUpButtonClick.bind(this);
    this._magicallyGivePoints = this._magicallyGivePoints.bind(this);
    this._successfulGamble = this._successfulGamble.bind(this);
    this._randomNumber = this._randomNumber.bind(this);
  }

  _randomNumber(max) {
    // pseudorandom number between 1 and max
    return Math.floor((Math.random() * max) + 1);
  }

  _successfulGamble() {
    console.log('rolling dice!')
    let diceRollResult = this._randomNumber(6);
    console.log('dice roll result => ' + diceRollResult);
    return [2, 4, 6].includes(diceRollResult);
  }

  _handleGambleButtonClick() {
    let successfulGamble = this._successfulGamble();
    console.log("successful gamble? => " + successfulGamble);
    this.setState({ toppingUpAccount: false });
    this.props.gambleBalance(successfulGamble);
  }

  _handleTopUpButtonClick() {
    console.log('handling topup button click');
    this.setState({ toppingUpAccount: true })
  }

  _magicallyGivePoints() {
    let updatedBalance = this._randomNumber(100);
    this.props.magicallyGivePoints(updatedBalance);
  }

  render() {
    if (this.props.isShowing) {
      let currentBalance = this.props.currentBalance;
      let error = this.props.error;
      let successMessage = this.props.successMessage;
      let showAlertPanel = error || successMessage;

      let alertPanelInput = {};
      if(showAlertPanel) {
        if (error) {
          alertPanelInput = { text: error, type: 'warning' };
        }
        else {
          alertPanelInput = { text: successMessage, type: 'success' };
        }
      }

      if(currentBalance > 0) {
        return (
          <React.Fragment>
            <div class='row'>
              <h2 class='col'>{`You currently have ${this.props.currentBalance} points!`}</h2>
            </div>
            <div class='row'>
              <button type='button' class='btn btn-primary btn--gamble col' onClick={this._handleGambleButtonClick}>Gamble my points</button>
            </div>
            <AlertPanel
              alertType={alertPanelInput.type}
              isShowing={showAlertPanel}
              displayText={alertPanelInput.text}
              dismissable={false}
            />
          </React.Fragment>
        );
      }
      else { // TODO: refactor this - put account top-up stuff into shared component
        if (this.state.toppingUpAccount) {
          console.log('topping up account!')
          //const { number, name, expiry, cvc, focused } = this.state;
          let number;
          let name;
          let expiry;
          let cvc;
          let focused;

          return (
            <React.Fragment>
              <div class='row'>
                <h2 class='col'>Account Top Up</h2>
              </div>
              <form>
                <p>This is a fancy credit card form specially designed to take your money</p>
              </form>
              <div class='row'>
                <button type='button' class='btn btn-primary btn--gamble col' onClick={this._magicallyGivePoints}>Give me more points</button>
              </div>
            </React.Fragment>
          );
        }
        else {
          console.log('not topping up account!');
          return (
            <React.Fragment>
              <div class='row'>
                <h2 class='col'>You're all out of Fly Buys points!</h2>
              </div>
              <div class='row'>
                <button type='button' class='btn btn-primary btn--gamble col' onClick={this._handleTopUpButtonClick}>Top up my account</button>
              </div>
            </React.Fragment>
          );
        }
      }
    }
    else {
      return null;
    }
  }
}

export default GamblePage;
