import React from 'react';

class GamblePage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.isShowing) {
      return (
        <div></div>
      );
    }
    else {
      return null;
    }
  }
}

export default GamblePage;
