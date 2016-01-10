import React from 'react';

class FBShare extends React.Component {

  render() {
    return <div />
  }

  componentDidMount() {
    let description = 'Hiihdin tänään ' + this.props.length + ' kilometriä.';
    FB.ui({
        method: 'feed',
        name: this.props.day + ' hiihdetty: ' + this.props.length + ' km.',
        link: 'https://semitaho.github.io/lenkki'
      },
      // callback
      (response) => {
        console.log('hei hou');
        this.props.didShare();

      }
    );
  }
}

export default FBShare;