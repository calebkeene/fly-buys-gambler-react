import React from 'react';
import '../../styles/css/Buttons.css';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this._clickLogoutButton = this._clickLogoutButton.bind(this);
  }

  _clickLogoutButton() {
    this.props.logoutMember();
  }

  render() {
    //let imageSource = require('../../public/images/fly_buys_logo.png');
    console.log("memberIsLoggedIn => " + this.props.memberIsLoggedIn);
    if(this.props.memberIsLoggedIn) {
      return (
        <div class='header bs-component'>
          <nav class='navbar navbar-expand-lg navbar-light bg-light'>
            {/* <img src={imageSource} /> */}
            <div class='header__right'>
              <div>Hi {this.props.memberName}!</div>
              <button class='btn btn--logout' onClick={this._clickLogoutButton}>Logout</button>
            </div>
          </nav>
        </div>
      )
    }
    else {
      return (
        <div class='header bs-component'>
          <nav class='navbar navbar-expand-lg navbar-light bg-light'>
            <div class='row'>
              <div class='col'>
                {/* <img class='header__left' src={imageSource} /> */}
                <div class='float-right'>Gambler</div>
              </div>
            </div>
          </nav>
        </div>
      )
    }
  }
}

export default Header;
