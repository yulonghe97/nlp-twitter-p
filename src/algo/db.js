const mongoose = require('mongoose');
const clue = new mongoose.Schema({
    PosScore: Number,
    NegScore: Number,
    SynsetTerm: String
});

const wordClue = mongoose.model('wordClue', clue);
mongoose.connect("mongodb+srv://nlp:110110@rmc0-quigt.mongodb.net/nlp?retryWrites=true&w=majority",{ useUnifiedTopology: true, useNewUrlParser: true});
module.exports = wordClue;