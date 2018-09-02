import React from 'react';

class SignOutButton extends React.Component {
  render() {
    if (this.props.isShowing) {
      let htmlButtonClasses = 'btn btn-sm btn-outline-secondary btn--logout';
      return (
        <form class='form-inline float-right'>
          <div class='member-name'>{`Hi ${this.props.memberName}`}!</div>
          <button onClick={this.props.clickSignOutButton} class={htmlButtonClasses} type='button'>Sign Out</button>
        </form>
      );
    }
    else {
      return null;
    }
  }
}

export default SignOutButton;
