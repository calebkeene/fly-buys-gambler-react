import React from 'react';

class AlertPanel extends React.Component {
  render(){
    if(this.props.isShowing) {
      let htmlClasses = `col alert alert-${this.props.alertType} fade show`;
      if (this.props.dismissable) {
        return (
          <div class='row'>
            <div class={htmlClasses} role='alert'>
              {this.props.displayText}
              <button type='button' class='close' data-dismiss='alert' aria-label='Close'>
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
          </div>
        )
      }
      else {
        let htmlClasses = `col alert alert-${this.props.alertType}`;
        return (
          <div class='row'>
            <div class={htmlClasses} role='alert'>
              {this.props.displayText}
            </div>
          </div>
        )
      }
    }
    else {
      return null;
    }
  }
}

export default AlertPanel;
