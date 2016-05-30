require('components/Card/Card.scss');

import React from 'react'

class Card extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={this.props.className}>
        <div className="card__content">
          <h1 className="card__h1"><span>{this.props.title}</span></h1>
          <p className="card__summary"><span>{this.props.summary}</span></p>
        </div>

        <video className="card__video" src={this.props.gif} loop autoPlay></video>

      </div>
    );
  }
}

export default Card;
