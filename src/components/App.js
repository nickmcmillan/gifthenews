require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';
import Card from '../components/Card/Card'

import keywordFinder from './keyword-finder'
import stripHTML from './strip-html'
import stripUntilDash from './strip-until-dash'


let reutersFeed = 'http://feeds.reuters.com/reuters/technologyNews';
let articleCount;
const delay = 15000;
const reloadAfter = 100 * 60 * 60; // 1 hour


class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			feeds: [],
			delay: 0,
			currentIndex: 0,
			currentItem: {
				title: '',
				summary: '',
				gif: ''
			}

		};
	}

	componentDidMount() {


		// get the news feed
		let xhr = new XMLHttpRequest();

		// use an arrow function to preserve the state of 'this' as the component
		xhr.onreadystatechange = () => {
			if (xhr.readyState === 4 && xhr.status === 200) {
				let data = JSON.parse(xhr.responseText);

				if (data.status === 'ok') {
					//console.log(JSON.parse(xhr.responseText).items);

					articleCount = JSON.parse(xhr.responseText).items.length

					this.setState({
						feeds: JSON.parse(xhr.responseText).items
					});

					this.getNextItem();

				}
			}
		};

		xhr.open('GET',`http://rss2json.com/api.json?rss_url=${encodeURIComponent(reutersFeed)}`, true);
		xhr.send();

		// keep it freshhhh
		setTimeout(()=> {
			location.reload()
		}, reloadAfter)

	}

	getNextItem() {
		var This = this;

		//console.log('currentIndex: ' + This.state.currentIndex);

		This.getGiphyImage(this.state.feeds[this.state.currentIndex], function(item) {


			This.setState({
				currentItem: item,
				currentIndex: This.state.currentIndex + 1,
				delay: delay
			});


			// reached the end of the news feed, restart from the beginning
			if (This.state.currentIndex === articleCount) {
				This.setState({
					currentIndex: 0
				})
			}

			This.getNextItem();

		});
	}

	getGiphyImage(item, callback, forcedTag) {

		var giphyApi = 'http://api.giphy.com/v1/gifs/';

		var This = this;
		let url;
		let tag;
		let tag2;
		let tag3;

		if (forcedTag) {
			url = giphyApi + 'random?api_key=dc6zaTOxFJmzC&tag=' + forcedTag;

		} else {
			let strippedTitle = stripHTML(item.title)
			let strippedDescription = stripHTML(item.description)
			let dashedDescription = stripUntilDash(strippedDescription)
			tag = keywordFinder(strippedTitle + ' ' + dashedDescription)[0] // the most used word
			tag2 = keywordFinder(strippedTitle + ' ' + dashedDescription)[1] // the second most used word
			tag3 = keywordFinder(strippedTitle + ' ' + dashedDescription)[2] // the second most used word

			url = giphyApi + 'search?api_key=dc6zaTOxFJmzC&limit=1&rating=pg-13&q=' + tag + '+' + tag2 + '+' + tag3
			console.log(keywordFinder(strippedTitle + ' ' + dashedDescription));
		}


		let xhr = new XMLHttpRequest();

		// use an arrow function to preserve the state of 'this' as the component
		xhr.onreadystatechange = () => {
			if (xhr.readyState === 4 && xhr.status === 200) {
				let res = JSON.parse(xhr.responseText)
				let data = res.data[0];

				if (res.meta.msg === 'OK') {

					//console.log(JSON.parse(xhr.responseText).items);

					//articleCount = JSON.parse(xhr.responseText).items.length

					// if giphy didn't come through with any goods:
					if (Array.isArray(data) && !data.length) {
						console.log('nothing found:', tag, 'using cats instead')
						This.getGiphyImage(item, callback, 'cats')
						return;
					}

					item.gif = data.images.original.mp4;

					setTimeout(function() {

						callback(item);

					}, This.state.delay);

				}
			}
		};

		xhr.open('GET', url, true);
		xhr.send();

	}

	render() {
		// if no gifs are in state yet, render a loader instead
		if (this.state.currentItem.gif === '') {

			return (
				<div className="cards">
				<Card
				className="card"
				title='Hang tight'
				/>
				</div>
			);

		} else {

			return (
				<div>
					<Card
					currentIndex={this.state.currentIndex}
					className="card"
					title={this.state.currentItem.title}
					summary={ stripUntilDash( stripHTML(this.state.currentItem.description)) }
					gif={this.state.currentItem.gif}
					/>
					<img className='giphy-logo' src='images/giphy.png' alt='Powered by Giphy logo' / >
				</div>
			);
		}
	}
}

export default App;
