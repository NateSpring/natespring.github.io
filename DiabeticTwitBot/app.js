console.log('All cylinders firing!');
require('dotenv').config()
var Twitter = require('twitter');
var config = require('./config');
var T = new Twitter(config);

var params = {
    q: '#lowcarb',
    count: 10,
    result_type: 'recent',
    lang: 'en'
}
function retweetLatest () {
    T.get('search/tweets', params, function (error, data) {
      var tweets = data.statuses
      for (var i = 0; i < tweets.length; i++) {
        console.log(tweets[i].text)
      }
      if (!error) {
        var retweetId = data.statuses[0].id_str
        T.post('statuses/retweet/' + retweetId, {}, tweeted)
      }
      else {
        if (debug) {
          console.log('There was an error with your hashtag search:', error)
        }
      }
    })
  }
    function tweeted (err, reply) {
    if (err !== undefined) {
      console.log(err)
    } else {
      console.log('Successfully Tweeted: ' + reply)
    }
  }
  
  retweetLatest()
 
  setInterval(retweetLatest, 1000 * 60 * 12)
  