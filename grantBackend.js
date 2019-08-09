const express = require('express');
const app = express();
const cors = require('cors');


var snoowrap = require('snoowrap');


const r = new snoowrap({
  userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36',
  clientId: '38BBGLjgEX3i8A',
  clientSecret: '3Ji_s4lJ4RzlXSIfxngu9WvTOfk',
  refreshToken: '23280913-oFa2QT9FoJEU2mLC2r-WeyHsXN0'
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var minScore = -100;

var checkScore = function (post) {
  console.log(post.score, minScore);
  return post.score > minScore;
}

app.get('/', function (req, res) {
  minScore = req.query.minScore;
  console.log(req.query);
  var x = `get${req.query.category}`;
  r[x](req.query.subreddit)
  .then(data => {
    console.log(data[0].score);
    data = data.slice(0 , req.query.numPosts).filter(checkScore);
    console.log(data);
    res.send(data);
  })

})

var port = process.env.PORT || 3154;

app.listen(port, function () {
  console.log('Example app listening on port ' + port + '!');
});