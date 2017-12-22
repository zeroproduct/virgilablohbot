# 🚧 "VIRGIL ABLOH BOT" 🚧

Bot available ⇒ [@virgilablohbot](https://twitter.com/virgilablohbot)

```
A Twitter bot who's tweets are
indistinguishable from the real @virgilabloh
```

A small project I decided to work on to learn more NodeJS and the Twitter API, as well as celebrate Virgil and his accomplishments.

## Dependencies
The bot uses [Wordnik's](http://developer.wordnik.com/) randomWord API to retrieve random words. Images are then fetched from [Unplash's](https://source.unsplash.com/) random API, which is then added on to a canvas src using [Node-Canvas](https://github.com/Automattic/node-canvas). The random word is then formatted and added on top of the canvas. Once complete, the canvas is converted to base 64, which is required for uploading/posting to Twitter using the [Twit](https://github.com/ttezel/twit) library.

## Install
Clone the repo then install the dependencies using:
```
npm install
```
You will need to create a **config.js** file in the root for your Twitter credentials. Inside should look something like:
```
module.exports = {
  consumer_key: '...',
  consumer_secret: '...',
  access_token: '...',
  access_token_secret: '...'
};
```

## Disclaimer
I do not own any of these photos. Please note that all images and copyrights belong to their original owners. No copyright infringement intended.

## Meta
Daniel Rica - [@REEKAH](http://reekah.now.sh/) - danrica92@gmail.com

http://viral-laboratories.com/
