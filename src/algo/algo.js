path = require("path");
require("./db.js");
let tokenizer = require("wink-tokenizer");
let sentiment = require("wink-sentiment");
let posTagger = require("wink-pos-tagger");
const mongoose = require("mongoose");
const clue = mongoose.model("wordClue");
var tagger = posTagger();
var myTokenizer = tokenizer();

async function analysis(tweet) {
  const cleanObj = clean(tweet);
  const result = await find(cleanObj);
  result.tag = tagResult(result.sumScore);
  return result;
}

function tagResult(score) {
  if (score < -0.125) {
    return "NEGATIVE";
  } else if (score > 0.125) {
    return "POSITIVE";
  } else {
    return "NEUTRAL";
  }
}

async function find(cleanObj) {
  let negation = [
    "not",
    "no",
    "never",
    "nothing",
    "nobody",
    "nowhere",
    "neither",
    "nor",
    "none",
    "rarely",
    "little",
    "few",
    "hardly",
    "barely",
    "rarely",
    "scarcely",
    "uncertain",
    "seldom",
    "won’t",
    "isn't",
    "aren't",
    "ain't",
    "hasn’t",
    "haven't",
    "wasn’t",
    "weren't",
    "hadn’t",
    "wouldn't",
    "shouldn't",
    "couldn't",
    "can't",
    "cannot",
    "mightn’t",
    "mustn’t",
    "needn't",
    "doesn’t",
    "didn't",
    "don't",
  ];
  
  const cleanArr = cleanObj.wordArr;
  let emojiString = "";
  let emojiScore = 0;
  if (cleanObj.emojiArr.length !== 0){
    emojiString = cleanObj.emojiArr.join("");
    emojiScore = sentiment(emojiString).normalizedScore /(10);
  }
  let prev = "";
  let sentenceScore = 0;
  let validCount = 0;
  for (let i = 1; i < cleanArr.length; i++) {
    prev = cleanArr[i - 1];
    try {
      const result = await findDB(cleanArr[i].toLowerCase());
      if (negation.includes(prev) && result.length !== 0) {
        validCount += 1;
        sentenceScore = sentenceScore - getAverage(result);
      } else if (result.length !== 0) {
        validCount += 1;
        sentenceScore += getAverage(result);
      }
    } catch (e) {
      console.log(e);
    }
  }
  if (validCount === 0) {
    averageResult = 0;
  }
  else {
    averageResult = sentenceScore / validCount;
  }
  return {
    sentenScore: averageResult,
    emojiScore: emojiScore,
    sumScore: averageResult + emojiScore,
  };
}

function clean(sentence) {
  const obj = myTokenizer.tokenize(sentence);
  const cleanedObj = { emojiArr: [], wordArr: [] };
  obj.forEach((ele) => {
    if (ele.tag === "word" && ele.value.length > 1) {
      cleanedObj.wordArr.push(ele.value);
    } else if (ele.tag === "emoji") {
      cleanedObj.emojiArr.push(ele.value);
    }
  });
  return cleanedObj;
}

async function findDB(word) {
  const pos = tagger.tagSentence(word)[0].pos;
  const sentiTag = posToSenti(pos);
  let result = await clue.find({
    $and: [
      { SynsetTerm: word },
      { pos: sentiTag },
      { $or: [{ PosScore: { $ne: 0 } }, { NegScore: { $ne: 0 } }] },
    ],
  });
  return result;
}

function posToSenti(pos) {
  switch (pos.charAt(0)) {
    case "V":
      return "v";
    case "N":
      return "n";
    case "J":
      return "a";
    case "R":
      return "r";
    default:
      return "N/A";
  }
}

function getAverage(resultArr) {
  let totalScore = 0;
  let length = resultArr.length;
  for (let i = 0; i < length; i++) {
    if (resultArr[i].PosScore != 0) {
      totalScore += resultArr[i].PosScore;
    } else if (resultArr[i].NegScore != 0) {
      totalScore -= resultArr[i].NegScore;
    }
  }
  let average = totalScore / length;
  return average;
}

module.exports = {
  analysis: analysis,
};