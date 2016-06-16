import React from 'react'

export default class Card extends React.Component {

	render() {

		return (
			<div>
		      <div className={this.props.className} >
		        <div className="card__content">
		          <div className="card__h1-wrapper">
		            <h1 className="card__h1">{this.props.title}</h1>
		          </div>
		        </div>
		      </div>

			  </div>
		);
	}
}
