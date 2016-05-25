import React from 'react';

var $ = require('jquery');

var yqlApi = 'https://query.yahooapis.com/v1/public/yql';
// var feed = 'http://au.rss.news.yahoo.com/technology.xml';
var feed = 'http://feeds.bbci.co.uk/news/technology/rss.xml';


// class Feeds extends React.Component {

// }

class Feeds extends React.Component {
// var Feeds = {
  getFeeds() {
    
    var yql = yqlApi + '?q=' + encodeURIComponent('select title, description from rss where url=\'' + feed + '\'') + '&format=json&diagnostics=true&callback=';

    $.getJSON(yql, function(res) {
        console.log(res);


    }, 'jsonp');

  }
}

export default Feeds;