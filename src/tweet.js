const Twit = require('twit');

const T = new Twit({
  consumer_key:         '2PrOYIlorhZuq7DwrQ4Zh07pj',
  consumer_secret:      'ag4a9ZjhuJJvLIlTA6NJVT69FtDq5rwHPEE46bGTkHQUBy0jB7',
  access_token:         '1253503141154299904-WJubNsAelmblhhJOZTWZWW2v1S7qAj',
  access_token_secret:  'LlUXzl0I9br8oENZN1uIIi7AUsmzM2gl0cDTTPOYEdml0',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
  strictSSL:            true,     // optional - requires SSL certificates to be valid.
});



exports.getTweet = function (amount, tag, cb) {
    T.get('search/tweets', { q: tag, count: amount, lang:'en', result_type:"mixed", tweet_mode:'extended',}, function(err, data, response) {
        const tweets = [];
        for (let i = 0; i < data.statuses.length; i++){
            const post = data.statuses[i].full_text.trim().replace('\n', ' ');
            tweets.push(post);
            // console.log(i + '  ' + post + '\n');
        }
        cb(tweets);
    });
};
