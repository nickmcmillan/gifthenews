require('components/Card/Card.scss');

import React from 'react'

class Card extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={this.props.className} style={{backgroundImage: 'url(' + this.props.gif + ')'}}>
        <div className="card__content">
          <h1 className="card__h1"><span>{this.props.title}</span></h1>
          <p className="card__summary"><span>{this.props.summary}</span></p>
        </div>
      </div>
    );
  }
}

export default Card;