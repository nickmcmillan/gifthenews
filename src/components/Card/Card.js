require('components/Card/Card.scss');
import React from 'react'

var ReactCSSTransitionGroup = require('react-addons-css-transition-group');


class Card extends React.Component {

  constructor(props) {
	  super(props);
  }

  render() {

	  let key = this.props.currentIndex

		return (
		  <div>
		    <ReactCSSTransitionGroup transitionName="content" transitionAppear={true} transitionAppearTimeout={1000} transitionEnterTimeout={100} transitionLeaveTimeout={1000} >
		      <div className={this.props.className} key={key}>
		        <div className="card__content">
		          <div className="card__h1-wrapper">
		            <h1 className="card__h1">{this.props.title}</h1>
		          </div>
		          <div className="card__summary-wrapper">
		            <p className="card__summary">{this.props.summary}</p>
		          </div>
		        </div>


		      </div>
		    </ReactCSSTransitionGroup>
		    <ReactCSSTransitionGroup transitionName="video" transitionEnterTimeout={1000} transitionLeaveTimeout={1000} >
		      <video className="card__video" src={this.props.gif} loop autoPlay key={key}></video>
		    </ReactCSSTransitionGroup>
		  </div>
	  	);
	}
}

export default Card;
