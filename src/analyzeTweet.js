// GET TWEETS BY HASHTAG
const Tweet = require('./tweet');
const Algo = require('./algo/algo');
const TAGS = [
    "POSITIVE",
    "NEGATIVE",
    "NEUTRAL"
]

exports.tagTweets = async (tweets) => {
    const tagged = [];
    const counter = {POSITIVE: 0, NEGATIVE: 0, NEUTRAL: 0}
    for(let i=0; i<tweets.length; i++){
        const tagResult = await Algo.calculate(tweets[i]);
        tagged.push({'tweet': tweets[i], 'tag':tagResult.sentiment, 'score':tagResult.score});
        counter[tagResult.sentiment] ++;
        console.log(tagResult);
    }
    return {tagged, counter};
}

