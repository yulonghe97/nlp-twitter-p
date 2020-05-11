// NLP Sentiment Anaylysis Algo Test
// by Yulong He @2020

const fs = require("fs");
const path = require("path");
const Analyzer = require("../analyzeTweet");

// Set the current training file
const CURRENT_FILE = 'test.json'

const computerCount = {
  POS: 0,
  NEU: 0,
  NEG: 0,
  POS_SAME: 0,
  NEU_SAME: 0,
  NEG_SAME: 0,
  POS_ACCU: 0,
  NEU_ACCU: 0,
  NEG_ACCU: 0,
};
const annotatorCount = { POS: 0, NEU: 0, NEG: 0 };
const accuracy = { DIFF: 0, SCORE: 0 };


async function testAlgo() {
  // Initialize each Catagories Number

  // Read JSON File
  const file = fs.readFileSync(path.join(__dirname, CURRENT_FILE));
  const testData = JSON.parse(file);
  const tweets = testData.map(function (ele) {
    return {
      tweet: ele.tweet,
      annotation: ele.annotation,
      programAnno: "",
    };
  });

  try{

  // Analyze use our own Annotator
  const { tagged } = await Analyzer.tagTweets(tweets.map((ele) => ele.tweet));

  // The res contains both analyzed Tweet and the Counter so we need to extract that
  const annotated = tagged;

  // Array to store different Annotation
  let diff = 0;
  for (let i = 0; i < annotated.length; i++) {
    // Since there is difference between the tag style we used, we need to convert eg. 'NEGATIVE' to 'NEG'
    const computerNormalizedTag = normalizeAnnotation(annotated[i].tag);

    // Count Different Catagory
    computerCount[computerNormalizedTag]++;
    annotatorCount[tweets[i].annotation]++;

    // put into the tweets object and compare difference
    tweets[i].programAnno = computerNormalizedTag;
    if (tweets[i].annotation === computerNormalizedTag){
        // Compute the number of correct annotation in each catagory
       computerCount[`${computerNormalizedTag}_SAME`] ++; 
    }else{
        diff ++;
    }

  }

  // calculate difference
  accuracy.DIFF = diff;
  accuracy.SCORE = 1 - (diff / annotated.length);

  // compute each section's accuracy
  computerCount.POS_ACCU = computerCount.POS_SAME / annotatorCount.POS;
  computerCount.NEU_ACCU = computerCount.NEU_SAME / annotatorCount.NEU;
  computerCount.NEG_ACCU = computerCount.NEG_SAME / annotatorCount.NEG;

  // combine Output Variables
  const output = {
    tweets: tweets,
    computerCount: computerCount,
    annotatorCount: annotatorCount,
    accuracy: accuracy,
  };

  // output JSON FILE
  fs.writeFileSync("output.json", JSON.stringify(output, null, "\t"));
  console.log("OUTPUT SUCCESSFULL...");

  }catch(err){
    throw err;
  }
  
}

// adjust the annotation
function normalizeAnnotation(annotation) {
  switch (annotation) {
    case "POSITIVE":
      return "POS";
    case "NEGATIVE":
      return "NEG";
    case "NEUTRAL":
      return "NEU";
    default:
      return "N/A";
  }
}

testAlgo();
