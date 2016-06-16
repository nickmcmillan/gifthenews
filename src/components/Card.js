import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import './Card.scss'

export default class Card extends React.Component {

  render() {

	  let key = this.props.index

		return (
		  <div>
		    <ReactCSSTransitionGroup transitionName="content" transitionAppear={true} transitionAppearTimeout={1000} transitionEnterTimeout={100} transitionLeaveTimeout={1000} >
		      <div className={this.props.className} key={key}>
		        <div className="card__content">
		          <div className="card__h1-wrapper">
		            <h1 className="card__h1">{this.props.title}</h1>
		          </div>
		          <div className="card__summary-wrapper">
		            <p className="card__summary">{this.props.description}</p>
		          </div>
		        </div>


		      </div>
		    </ReactCSSTransitionGroup>
		    <ReactCSSTransitionGroup transitionName="video" transitionEnterTimeout={1000} transitionLeaveTimeout={1000} >
		      <video className="card__video" src={this.props.gif} loop autoPlay key={key}></video>
		    </ReactCSSTransitionGroup>

			<div className={'debug ' + (this.props.debug ? 'show' : 'hide')}>
				<p>Keywords:</p>
				<ul>
					{this.props.keywords.map(function(value) {
						return <li key={value}>{value}</li>
					})}
				</ul>
				<p>Giphy filter: {this.props.rating} <br/> Use query string to set - eg '/?rating=pg-13'</p>
			</div>


		  </div>
	  	);
	}
}
