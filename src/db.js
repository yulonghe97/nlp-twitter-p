const mongoose = require('mongoose');

const nlpSchema = new mongoose.Schema({
    id: Number,
    tweet: String,
    user: String,
    annotation: String,
});

const progressSchema = new mongoose.Schema({
   user: String,
   lastAnnotation: {type: Number, required:true},
   total: {type: Number, required: true}
});

const NLP = mongoose.model('NLP', nlpSchema);
const Progress = mongoose.model('Progress', progressSchema);

let dbconf;
if (process.env.NODE_ENV === 'PRODUCTION') {
    const fs = require('fs');
    const path = require('path');
    const fn = path.join(__dirname, '/config.json');
    const data = fs.readFileSync(fn);
    const conf = JSON.parse(data);
    dbconf = conf.dbconf;
} else {
    console.log(`Mode Error.`)
}

function connectDB(){
    mongoose.connect(dbconf, {useNewUrlParser: true, useUnifiedTopology: true}, (error) => {
        if(!error){
            console.log(`Cloud Database Connection success! with NLP`);
        }else {
            console.log(error);
        }
    });
    mongoose.connection.on('error', (err) => {
        console.error(`Mongoose connection error: ${err}`);
        process.exit(1);
    });
}

module.exports = {
    NLP: NLP
};


// connect Database
connectDB();


