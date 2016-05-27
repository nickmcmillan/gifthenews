require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';
import Card from '../components/Card/Card'
import keywordFinder from './keyword-finder'
import stripHTML from './strip-html'


var $ = require('jquery');
var yqlApi = 'https://query.yahooapis.com/v1/public/yql';
// var feed = 'http://au.rss.news.yahoo.com/technology.xml';
var feed = 'http://feeds.reuters.com/reuters/technologyNews';

var giphyApi = 'http://api.giphy.com/v1/gifs/';

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

    var yql = yqlApi + '?q=' + encodeURIComponent('select title, description from rss where url=\'' + feed + '\'') + '&format=json&diagnostics=true&callback=';
    //console.log(yql);

    var This = this;

    $.getJSON(yql, function(res) {
      // console.log('got feed');

      This.setState({
        feeds: res.query.results.item

      });


      This.getNextItem();

    }, 'jsonp');
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


      This.getNextItem();

    });
  }

  getGiphyImage(item, callback, forcedTag) {

    var This = this;

    if (forcedTag) {
      var tag = forcedTag
    } else {
      let strippedDescription = stripHTML(item.description)
      var tag = keywordFinder(strippedDescription)[0].word
    }

    console.log('giphy tag used:', tag)
    var url = giphyApi + 'random?api_key=dc6zaTOxFJmzC&tag=' + tag;

    $.getJSON(url, function(res) {

      // if giphy didn't come through with any goods, like a real obscure keyword
      if (Array.isArray(res.data) && !res.data.length) {
        console.log('nothing found:', tag, 'using cats instead')
        This.getGiphyImage(item, callback, 'cats')
        return;
      }

      // console.log('got giphy');
      // console.log(res);
      item.gif = res.data.image_url;

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
