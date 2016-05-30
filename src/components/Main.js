require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';
import Card from '../components/Card/Card'
import keywordFinder from './keyword-finder'
import stripHTML from './strip-html'


var $ = require('jquery');
var reutersFeed = 'http://feeds.reuters.com/reuters/technologyNews';
let reutersCount;

const delay = 10000;

// var feeds = require('../sources/Feeds');
// console.log(feeds);

// let yeomanImage = require('../images/yeoman.png');

class AppComponent extends React.Component {

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
      },
      nextItem: {
        title: '',
        summary: '',
        gif: ''
      }
    };
  }

  componentDidMount() {

    let xhr = new XMLHttpRequest();

    // use an arrow function to preserve the state of 'this' as the component
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let data = JSON.parse(xhr.responseText);

            if (data.status === 'ok') {
              //console.log(JSON.parse(xhr.responseText).items);

              reutersCount = JSON.parse(xhr.responseText).items.length

              this.setState({
                feeds: JSON.parse(xhr.responseText).items
              });

              this.getNextItem();

            }
        }
    };

    xhr.open('GET',`http://rss2json.com/api.json?rss_url=${encodeURIComponent(reutersFeed)}`,true);
    xhr.send();

  }

  getNextItem() {
    var This = this;

     //console.log('currentIndex: ' + This.state.currentIndex);

    This.getGiphyImage(this.state.feeds[this.state.currentIndex], function(item) {


        This.setState({
          // nextItem: item
          currentItem: item,
          currentIndex: This.state.currentIndex + 1,
          delay: delay
        });


        // reached the end of the news feed, restart from the beginning
        if (This.state.currentIndex === reutersCount) {
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

    if (forcedTag) {
      url = giphyApi + 'random?api_key=dc6zaTOxFJmzC&tag=' + forcedTag;

    } else {
      let strippedTitle = stripHTML(item.title)
      let strippedDescription = stripHTML(item.description)
      tag = keywordFinder(strippedTitle + strippedDescription)[0].word
      tag2 = keywordFinder(strippedTitle + strippedDescription)[1].word

      //console.log(strippedTitle + strippedDescription);

      url = giphyApi + 'search?api_key=dc6zaTOxFJmzC&limit=1&q=' + tag + '+' + tag2
    }

    console.log(`${tag}, ${tag2}`);

    $.getJSON(url, function(res) {

      // if giphy didn't come through with any goods, like a real obscure keyword:
      if (Array.isArray(res.data) && !res.data.length) {
        console.log('nothing found:', tag, 'using cats instead')
        This.getGiphyImage(item, callback, 'cats')
        return;
      }

      //console.log(res.data[0].images);
      item.gif = res.data[0].images.original.mp4;

      // console.log('loading image for: ' + item.title);
      var image = new Image();
      image.src = item.gif;
      setTimeout(function() {

          callback(item);

      },
      This.state.delay);
    }, 'jsonp')
  }

  render() {

    // if no gifs are in state yet, render a loader instead
    if (this.state.currentItem.gif === '') {

      return (
        <div className="cards">
          <Card
            className="card card--current"
            title='Hang tight'
          />
        </div>
      );

    } else {
      return (
        <div className="cards">
          <Card
            className="card card--current"
            title={this.state.currentItem.title}
            summary={ stripHTML(this.state.currentItem.description) }
            gif={this.state.currentItem.gif}
          />
          <Card
            className="card card--next"
            title={this.state.nextItem.title}
            summary={ stripHTML(this.state.nextItem.description) }
            gif={this.state.nextItem.gif}
          />
        </div>
      );
    }


  }
}

// AppComponent.defaultProps = {
//   feeds: []
// };

export default AppComponent;
