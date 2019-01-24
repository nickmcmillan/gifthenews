import React, { Component } from 'react';
import Card from './components/Card'
import Loader from './components/Loader'
import getNews from './utilities/get-news'
import mapGifs from './utilities/map-gifs'
import getQuery from './utilities/get-query'
import './css/App.scss'
import giphyImg from './images/giphy.png'

export default class App extends Component {

	// constructor is like getInitialState but for classes
	constructor() {
		super()

		this.state = {
			loading: true,
			index: 0,
			currentItem: {},
			itemCount: 0,
			rating: 'g',
			delay: 15000,
			feed: 'https://www.news.com.au/technology/rss' // default feed
		}
	}

	_startInterval(response) {

		this.setState({
			itemCount: response.length
		})

		// setInterval is calling this function, so theres no initial delay
		function tick() {

			this.setState({
				currentItem: response[this.state.index],
				index: this.state.index += 1,
				loading: false

			})

			// if we run out of news items, start again
			if (this.state.index === this.state.itemCount) {
				this.setState({
					index: 0
				})
			}
		}

		// keep 'this' within 'tick'
		tick.apply(this)
		setInterval(tick.bind(this), this.state.delay)


		// refresh the browser without cache after 2 hours
		setTimeout(() => {
			document.location.reload(true)
		}, 720000) // 2 hours

	}

	_toggleDebugDisplay() {

		// hold the shift key to display debug stuff
		function checkShiftKey(e) {
			e = e || window.event;

			if (e.shiftKey) {
				this.setState({
					debug: true
				})
			} else {
				this.setState({
					debug: false
				})
			}
		}

		document.onkeydown = checkShiftKey.bind(this)
		document.onkeyup = checkShiftKey.bind(this)

	}

	componentWillMount() {

		// you can set the Giphy filter using a query string paramater, otherwise it default to 'g'.
		// example: /?rating=g

		// you can also set a custom RSS news feed using 'feed='

		this.setState({
			feed: getQuery('feed') ? getQuery('feed') : this.state.feed, // default to initial state
			rating: getQuery('rating') ? getQuery('rating') : this.state.rating
		})

		this._toggleDebugDisplay()
	}

	componentDidMount() {

		getNews(this.state.feed)
			.then(response => mapGifs(this, response))
			.then(response => this._startInterval(response)),

		(err) => {
			console.log(err);
		}

	}

	render() {

		if (this.state.loading) {
			return (
				<div>
					<Loader
						className="card"
						title='Hang tight'
					/>
					<img className='giphy-logo' src={giphyImg} alt='Powered by Giphy logo' / >
				</div>
			);
		} else {
			return (
				<div>
					<Card
						className="card"
						index={this.state.index}
						title={this.state.currentItem.title}
						description={this.state.currentItem.description}
						keywords={this.state.currentItem.keywords}
						gif={this.state.currentItem.gif}
						rating={this.state.rating}
						debug={this.state.debug}
						feed={this.state.feed}
					/>
					<img className='giphy-logo' src={giphyImg} alt='Powered by Giphy logo' / >
				</div>
			);
		}

	}
}
