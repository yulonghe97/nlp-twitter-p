const db = require('./db');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const path = require('path');
const fs = require('fs');
const NLP = mongoose.model('NLP');
const Progress = mongoose.model('Progress');
const hbs = require('hbs');
const sessionOptions = {
   secret: 'secret key',
   saveUninitialized: false,
   resave: false
};
const Tweet = require('./tweet');
app.use(session(sessionOptions));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));

hbs.registerHelper('isPOS', function(anno, options)
{
   if (anno === 'POS')
   {
      return options.fn(this)
   }
   return options.inverse(this);
});
app.get('/', async (req, res)=>{
   if(req.session.user){
      // get user annotations
      const annotation = await NLP.find({user: req.session.user});
      res.render('list', {
         user: req.session.user,
         annotation: annotation
      });
   }else{
      res.render('login');
   }
});

app.get('/start', async (req, res) => {
   const currentProgress = await Progress.findOne({user: req.session.user});
   if(currentProgress.lastAnnotation === 0){
      res.redirect('/t/0');
   }else{
      res.redirect(`/t/${currentProgress.lastAnnotation + 1}`);
   }
});

app.get('/export', async (req, res)=>{
   let result = await NLP.find({user: req.session.user});
   fs.writeFile(`output-${req.session.user}.json`, JSON.stringify(result, null, '\t'), 'utf8', function (err) {
      if (err) {
         console.log("An error occured while writing JSON Object to File.");
         return console.log(err);
      }
      res.download(`output-${req.session.user}.json`);
      console.log("JSON file has been saved.");
   });
});


app.get('/t/:id', async(req, res)=>{
   if(req.session.user){
      try{
         const currentTweet = await NLP.findOne({id: req.params.id, user: req.session.user});
         res.render('annotate', {
            tweet: currentTweet.tweet,
            progress: currentTweet.id,
            user: req.session.user,
         });
      }catch (e) {
         res.redirect('/');
         console.log(e);
         return e;
      }
   }else{
      res.redirect('/');
   }
});

app.post('/t/:id', async (req, res) => {
   const currentId = parseInt(req.params.id);
   const annotation = req.body.annotation;
   const updated = await NLP.findOneAndUpdate({id: req.params.id, user: req.session.user}, {$set: {annotation: annotation}});
   console.log(req.session.user + ' ' + req.params.id + ' updated!!');
   // Save Progress
   saveProgress(currentId, req.session.user).then(() => {
      res.redirect(`/t/${currentId + 1}`)
   });
});


app.get('/logout', (req, res)=>{
   req.session.user = null;
   res.redirect('/');
});


app.post('/', (req, res)=>{
   if(req.body.user === 'henry' || req.body.user ==='mike' || req.body.user === 'samantha' || req.body.user === 'yulong') {
      req.session.user = req.body.user;
      res.redirect('/');
   }else{
      res.send('no such user.')
   }
});

app.get('/initialize/:offset', (req, res)=>{
   saveTweets(['henry', 'mike','samantha', 'yulong'], parseInt(req.params.offset)).then(
     res.send('Saved Successful!')
   );
});

app.get('/saveU', async (req, res)=>{
   try{
      const newAnnotation = new NLP({
         id: 2,
         user: 'henry',
         annotation: '',
         tweet:'Dont worry its ok'
      });
      const savedAnnotation = await newAnnotation.save();
      console.log('progress saved.');
   }catch(err){
      console.log(err);
      return err;
   }
});


app.get('/remove/:num', async (req, res) => {
   const result = await NLP.find({id: {$gt: 153}}).remove();
   await res.json(result);
});

async function checkDuplicates(tweet){
   const findTweet = await NLP.findOne({tweet: tweet});
   if(findTweet !== null){
      console.log('found!');
      return true
   }else{
      return false
   }
}

async function saveTweets(users, offset){
   const tweetNum = 8;
   let currentOffset = offset;
   Tweet.getTweet(tweetNum, '#covid19 -filter:retweets', async (res) => {
      for (let i = 0; i < res.length; i++) {
         const check = await checkDuplicates(res[i]);
         if(!check){
            for (let j = 0; j < users.length; j++) {
               const newAnnotation = new NLP({
                  id: currentOffset + i,
                  user: users[j],
                  annotation: '',
                  tweet:res[i]
               });
               await newAnnotation.save();
               console.log(i + ' ' + 'Annotation Saved.')
            }
         }else{
            currentOffset -= 1;
            console.log('duplicates found! Not added. at ' + (i + offset));
         }
      }
   });
}
async function saveProgress(currentProgress, user){
   try{
      const savedProgress = await Progress.findOneAndUpdate({user: user}, {$set: {lastAnnotation: currentProgress}});
      console.log('Progress saved.');
   }catch(err){
      console.log(err);
      return err;
   }
}

const PORT = 3000;

app.listen(PORT);