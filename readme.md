# GIF the News

Foyer installation app built with React which a) pulls in an RSS feed and cycles through articles and b) picks out the most frequently used words in the article in order to display a relevant GIF from Giphy.

## Features
* Ability to configure the news feed by adding a query string – it supports any RSS feed. Sort of. Some don’t work, it really depends on the news feed. Here’s an example that works;
 * `/?feed=http://feeds.reuters.com/reuters/entertainment`
 * By default it uses `http://www.news.com.au/technology/rss`

* Ability to configure the Giphy content filter. For example;
 * `/?rating=r`
 * By default it uses `‘g’`

* A nifty debug screen. If you hold the **shift** key you can see;
 * What the RSS feed is that it’s currently using
 * What are the 3 keywords that are currently used to generate a response from Giphy's API
 * What the Giphy content filter/rating is set to

* After 2 hours it reloads the whole page to keep content fressshhhh

## Usage
To develop locally: ``npm run start``.
To create a distribution version for deploying: ``npm run build``


## Authors:
- Nick McMillan - development
- Dixon Cheng - initial development
- Adam Stone - design
