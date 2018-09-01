import React from 'react';

class AlertPanel extends React.Component {
  render(){
    if(this.props.isShowing) {
      let htmlClasses = `col alert alert-${this.props.alertType} ${this.props.additionalHtmlClasses}`;
      return(
        <div class='row'>
          <div class={htmlClasses} role='alert'>{this.props.displayText}</div>
        </div>
      )
    }
    else {
      return null;
    }
  }
}

export default AlertPanel;
