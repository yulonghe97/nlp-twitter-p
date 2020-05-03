// GET TWEETS BY HASHTAG
const Tweet = require('./tweet');
const TAGS = [
    "POSITIVE",
    "NEGATIVE",
    "NEUTRAL"
]

exports.tagTweets = (tweets) => {
    const tagged = [];
    const counter = {POSITIVE: 0, NEGATIVE: 0, NEUTRAL: 0}
    tweets.forEach(tweet => {
        // for test purpose
        const randTag = TAGS[Math.floor(Math.random() * 3)];
        counter[randTag] ++;
        tagged.push({'tweet' : tweet, 'tag':randTag});
    });
    return {tagged, counter};
}

