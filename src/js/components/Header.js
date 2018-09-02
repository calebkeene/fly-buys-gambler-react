import React from 'react';
import SignOutButton from './SignOutButton';
import '../../styles/css/Buttons.css';
import '../../styles/css/Header.css';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this._clickSignOutButton = this._clickSignOutButton.bind(this);
  }

  _clickSignOutButton() {
    this.props.signOutMember();
  }

  render() {
    let member = this.props.member;
    return (
      <div class='header bs-component'>
        <nav class='navbar navbar-light bg-light'>
          <a class='navbar-brand' href='#'>
            <img class='header__left' src={require('../../assets/images/fly_buys_logo.png')} />
          </a>
          <SignOutButton
            isShowing={member.isSignedIn}
            memberName={member.name}
            clickSignOutButton={this._clickSignOutButton}
          />
        </nav>
      </div>
    );
  }
}

export default Header;
