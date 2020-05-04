path = require("path");
require('./db.js')
const publicPath = path.resolve(__dirname,'')
const mongoose = require("mongoose");
const clue = mongoose.model("wordClue");
const fs = require("fs");
const file = fs.readFileSync("senti.txt");
const textByLine = file.toString().split("\n");
const len = textByLine.length;
for(let i = 60000; i < 80000; i++){
    const eachArr = textByLine[i].split('\t');
    const PosScore = eachArr[2];
    const NegScore = eachArr[3];
    const SynsetTerm = eachArr[4].split(" ");
    const arr = [];
    SynsetTerm.forEach(ele=>{
        arr.push(ele.substring(0,ele.indexOf('#')));
    })
    if(arr.length > 1){
        arr.forEach(ele=>{
            save(PosScore,NegScore,ele, i);
        })
    }
    else if(arr.length == 1){
        save(PosScore,NegScore,arr[0], i);
    }
}

async function save(PosScore, NegScore, word, index) {
    try {
        const newclue = new clue({
            PosScore: PosScore,
            NegScore: NegScore,
            SynsetTerm: word
        });
        const saved = await newclue.save();
        console.log(index + ' dataSaved');
        return saved;
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}