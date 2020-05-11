## Realtime Twitter Sentiment Analysis

This is the program souce code for the NLP final project. For detail about this code, please read our essay:

***A New Approach to Real-time Twitter Sentiment Analysis***

*Contributor:*

- Yulong He (full-stack web application, Algorithm Testcase, Annotation tool)
- Haoran Chen (Algorithm Implementation, Database, Annotator)
- Henry Zou (Research,  Annotator, Essay)
- Xinwei Han (Research,  Annotator, Essay)

----

##### This is a deployed website, please check 

[NLP Twitter Sentiment Analysis](https://nlp.ratemyclass.io)



##### Instruction to use the program:

The program is written under React.js, Node.js Express, Mongodb, please make sure you have the correct environment setup.

For first time running:

```
$ npm install 
```

Database Configuration:
```
$ vi src/config.js
```

Replace @username and @password for our database, the username and password is upon request. 



After installed the package, run the following to start server

```javascript
$ npm start // default port = 8080, visit http://localhost:8080
```

To run the test case, use:

```
$ npm run run-test
```

The test will run based on 100 annotated tweets data by ourselves. It will output a "output.json" in the main folder that contains:

```jsonc
[
  "tweets":[
  		{
  			"tweet": "A single Tweet",	// Tweet
  			"annotation": "POS",		// Manual Annotation
  			"programAnno": "POS"		// Computer Annotation
  		}
		...
	],
	"computerCount":{
    	"POS": 250,		// Positive Terms
		"NEU": 74,		// Neutral Terms
		"NEG": 85,		// Negative Terms
		"POS_SAME": 110,	// Positive Term Matched to Manual Annotation
		"NEU_SAME": 38,		// Neutral Term Matched to Manual Annotation
		"NEG_SAME": 41,		// Negative Term Matched to Manual Annotation
		"POS_ACCU": 0.7432432432432432,	// Positive Term Accuracy
		"NEU_ACCU": 0.2878787878787879,	// Negative Term Accuracy
		"NEG_ACCU": 0.3178294573643411	// Negative Term Accuracy
  },
  "annotatorCount": {
      "POS": 148,					// Positive Terms of manual annotation
      "NEU": 132,					// Neutral Terms of manual annotation 
      "NEG": 129					// Negative Terms of manual annotation
    },
    "accuracy": {
      "DIFF": 220,					// Different Terms 
      "SCORE": 0.46210268948655253			// Total Accuracy
    }
]
```



