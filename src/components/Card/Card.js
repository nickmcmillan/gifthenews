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
          <h1 className="card__h1">{this.props.title}</h1>
          <div className="card__summary-wrapper">
            <p className="card__summary">{this.props.summary}</p>
          </div>
        </div>

        <video className="card__video" src={this.props.gif} loop autoPlay></video>

      </div>
    );
  }
}

export default Card;
