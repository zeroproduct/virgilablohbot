var http = require('http');
var twit = require('twit');
var config = require('./config.js');
var express = require('express');
var request = require('request');
const fs = require('fs');

// Canvas Node
const { createCanvas, loadImage, Image } = require('canvas');
const canvas = createCanvas(500, 500);
const ctx = canvas.getContext('2d');

var app = express();

var Twitter = new twit(config);

var randomWord = {
  host: 'api.wordnik.com',
  path:
    '/v4/words.json/randomWords?hasDictionaryDef=false&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=3&maxLength=-1&limit=1&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5'
};

var tweetRandom = function() {
  http
    .request(randomWord, function(response) {
      var str = '';

      //another chunk of data has been recieved, so append it to `str`
      response.on('data', function(chunk) {
        str += chunk;
      });

      //the whole response has been recieved, so we just print it out here
      response.on('end', function() {
        var parsed = JSON.parse(str);
        var parsedString = parsed[0].word;
        var formattedString = '"' + parsedString.toUpperCase() + '"';
        console.log(formattedString);

        //Create random image with random text
        request
          .get('https://source.unsplash.com/random')
          .on('response', function(response) {
            // console.log(response.request);
            console.log(response.headers['content-type']); // 'image/png'

            var chunks = [];

            response.on('data', function(data) {
              chunks.push(data);
            });
            response.on('end', function() {
              var img = new Image();
              img.src = Buffer.concat(chunks);
              ctx.drawImage(img, 0, 0);
              ctx.font = '40px Helvetica';
              ctx.textAlign = 'center';
              ctx.fillStyle = 'white';
              ctx.fillText(
                formattedString,
                canvas.width / 2,
                canvas.height / 2
              );

              var b64content = canvas.toDataURL();
              var b64contentFormatted = b64content.replace(
                /^data:image\/[a-z]+;base64,/,
                ''
              );

              Twitter.post(
                'media/upload',
                { media_data: b64contentFormatted },
                function(err, data, response) {
                  // now we can assign alt text to the media, for use by screen readers and
                  // other text-based presentations and interpreters
                  console.log(data);

                  var mediaIdStr = data.media_id_string;
                  var meta_params = {
                    media_id: mediaIdStr
                  };

                  Twitter.post('media/metadata/create', meta_params, function(
                    err,
                    data,
                    response
                  ) {
                    if (!err) {
                      // now we can reference the media and post a tweet (media will attach to the tweet)
                      var params = {
                        status: formattedString,
                        media_ids: [mediaIdStr]
                      };

                      Twitter.post('statuses/update', params, function(
                        err,
                        data,
                        response
                      ) {
                        console.log(data);
                      });
                    } else {
                      console.log(err);
                    }
                  });
                }
              );
            });
          });
      });
    })
    .end();
};

app.get('/', function(req, res) {
  res.send('Hello World!');
  // setInterval(tweetRandom, 1800000);
  tweetRandom();
});

app.listen(8000, function() {
  console.log('Example app listening on port 8000!');
  tweetRandom();
  // setInterval(tweetRandom, 1800000);
});
