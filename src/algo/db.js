const mongoose = require('mongoose');
const clue = new mongoose.Schema({
    PosScore: Number,
    NegScore: Number,
    SynsetTerm: String
});

const wordClue = mongoose.model('wordClue', clue);

// DATABASE
const USERNAME = 'nlp';
const PASSWORD = '110110';
mongoose.connect(`mongodb+srv://${USERNAME}:${PASSWORD}@rmc0-quigt.mongodb.net/nlp?retryWrites=true&w=majority`,{ useUnifiedTopology: true, useNewUrlParser: true});
module.exports = wordClue;