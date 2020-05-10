path = require("path");
require('./db.js')

let tokenizer = require( 'wink-tokenizer' );
let sentiment = require( 'wink-sentiment' );
let posTagger = require('wink-pos-tagger');
const fs = require('fs')
const mongoose = require("mongoose");
const clue = mongoose.model("wordClue");
const Twit = require('twit');

var tagger = posTagger();
var myTokenizer = tokenizer();
const T = new Twit({
  consumer_key:         '2PrOYIlorhZuq7DwrQ4Zh07pj',
  consumer_secret:      'ag4a9ZjhuJJvLIlTA6NJVT69FtDq5rwHPEE46bGTkHQUBy0jB7',
  access_token:         '1253503141154299904-WJubNsAelmblhhJOZTWZWW2v1S7qAj',
  access_token_secret:  'LlUXzl0I9br8oENZN1uIIi7AUsmzM2gl0cDTTPOYEdml0',
  timeout_ms:           60*1000,  
  strictSSL:            true,    
});

getTweet(10,'call of duty', async (result) => {
    const arrObj = [];
    for(let i = 0; i < result.length; i++){
        const cleanObj = clean(result[i]);
        const score = await find(cleanObj);
        arrObj.push({tweet:result[i],score:score})
    };
    fs.writeFileSync('result.json',JSON.stringify(arrObj, null, '\t'));
});

async function tag(tweet){
    const cleanObj = clean(tweet);
    const tagResult = await find(cleanObj);
    return tagResult;
}

async function find(cleanObj){
    let negation = ["not","no","never","nothing","nobody","nowhere","neither","nor","none","rarely","little","few","hardly","barely","rarely","scarcely",
        "uncertain","seldom","won’t","isn't","aren't","ain't","hasn’t","haven't","wasn’t","weren't","hadn’t","wouldn't","shouldn't","couldn't",
        "can't","cannot","mightn’t","mustn’t","needn't","doesn’t","didn't","don't"];
    const cleanArr = cleanObj.wordArr;
    let emojiString = '';
    let emojiscore = 0;
    if(cleanObj.emojiArr.length !== 0){
        emojiString = cleanObj.emojiArr.join('');
        emojiscore = (sentiment(emojiString).normalizedScore/(2*(cleanObj.emojiArr.length)));
    }
    let prev = "";
    let sentenceScore = 0;
    
    for(let i = 1; i < cleanArr.length; i++){
        prev = cleanArr[i-1];
        try{
            const result = await findDB(cleanArr[i].toLowerCase());
            if(negation.includes(prev) && result.length !==0){
                sentenceScore = sentenceScore - (getAverage(result));
            }
            else if(result.length !== 0){
                sentenceScore += getAverage(result);
            }

        }catch(e){
            console.log(e);
        }       
    };
    console.log(sentenceScore);
    console.log(emojiscore);
    
}

function getTweet(amount, tag, cb) {
    T.get('search/tweets', { q: tag, count: amount, lang:'en', result_type:"mixed", tweet_mode:'extended',}, function(err, data, response) {
        const tweets = [];
        for (let i = 0; i < data.statuses.length; i++){
            const post = data.statuses[i].full_text.trim().replace('\n', ' ');
            tweets.push(post);
        }
        cb(tweets);
    });
};

function clean(sentence){
    const obj = myTokenizer.tokenize(sentence);
    const cleanedObj = {emojiArr:[],wordArr:[]};
    obj.forEach(ele => {
        if(ele.tag === 'word' && ele.value.length > 1){
            cleanedObj.wordArr.push(ele.value);
        }
        else if(ele.tag === 'emoji'){
            cleanedObj.emojiArr.push(ele.value);
        }
    }); 
    return cleanedObj;
}

async function findDB(word){
    // convert tree bank to senti-word-net
    const pos = tagger.tagSentence(word)[0].pos;
    const sentiTag = posToSenti(pos);
    let result = await clue.find({$and:[{"SynsetTerm":word},{"pos":sentiTag},{$or:[{'PosScore':{$ne:0}},{'NegScore':{$ne:0}}]}]});
    return result;
}


function posToSenti(pos){
    switch(pos.charAt(0)){
        case 'V':
            return 'v';
        case 'N':
            return 'n';
        case 'J':
            return 'a';
        case 'R':
            return 'r';
        default:
            return 'N/A';
    }
}

function getAverage(resultArr){
    let totalScore = 0;
    let length = resultArr.length;
    for (let i = 0; i < length; i++) {
        if (resultArr[i].PosScore != 0) {
            totalScore += resultArr[i].PosScore;
        }
        else if (resultArr[i].NegScore != 0) {
            totalScore -= resultArr[i].NegScore;
        }
    }
    let average = totalScore / length;
    return average;    
}


module.exports = {
    tag: tag
}