path = require("path");
require('./db.js')
const mongoose = require("mongoose");
const clue = mongoose.model("wordClue");


const test1 = "Today's 1.4% gain in the S&amp;P, with 85% of the #stocks higher, reduced its weekly loss to just 1.3%--not bad for a week that saw a major financial dislocations in #oil, horrible economic numbers out of Europe and the US, and more evidence of the mounting risk of structural damage. https://t.co/mp3AcGMwLe"
const test2 = "A flotilla of some 24 #oil tankers waits to unload #CrudeOil, as oil companies have run out of storage facilities in the #US and across the globe. \nOn Monday, #OilPrices slumped to unprecedented levels, amid a collapse in demand caused by the #coronavirus #outbreak. https://t.co/IXopWyK4uk"
const test3 = "The global #oil industry is being decimated by the #COVID19 pandemic. There is no time to lose in building a new, post-carbon industrial revolution https://t.co/9dcjUTOYqL by me via @BostonGlobe"
const test4 = "I'm extremely super very very happy disappointed";
const test5 = "Crude #Oil is up almost 50% during in the last two trading days. Extreme #volatility makes it virtually untradable. Also, the supply-demand imbalance and storage capacity limitations are by no means solved. https://t.co/kQodB2AeHM";
const test6 = "#oil -- rally is holding but we're down 8 out of the last 9 weeks.  Storage swelling onshore, so exploring offshore options -- data and elements provided by @Samir_Madani with thanks! #OOTT https://t.co/IwdADrDMro"
const test7 = "fuck you Joe Versoza, this class is absolutely disgusting, it's ruining evething. And I'm extremely upset!"
const test8 = "Update on the news"
const test9 = "There was a time when the US federal government became a rancher ...  \nWill the US end up having its own national oil company? \n\nShould the US government take over all the oil companies that invoke \"national security\" as a reason to get what it wants?\n#oil #shale https://t.co/Y9pNdzLu3A"
// let arr = cleanText(test7);

async function calculate(tweet){
    const tokenized = cleanText(tweet);
    const result = await find(tokenized);
    return result;
}

async function find(arr){
    let total = 0;
    for(let i = 0; i < arr.length; i++){
        try{
            // let value = await clue.findOne({$and:[  {"SynsetTerm":arr[i]},
            //                                         {"PosScore":{$ne:0}},
            //                                         {"NegScore":{$ne:0}}
            //                                     ]
            //                                 });
            let value = await clue.findOne({"SynsetTerm":arr[i]});                                                            
            if (value !== null){
                total -= value.NegScore;
                total += value.PosScore;
            }
        }
        catch(e){
            console.log(e);
        }
    };
    if(total > 0.1){
        return {
            score: total,
            sentiment: 'POSITIVE'
        }
    }
    else if(total < -0.1){
        return {
            score: total,
            sentiment: 'NEGATIVE'
        }
    } else{
        return {
            score: total,
            sentiment: 'NEUTRAL'
        }
    }
    
}


function cleanText(text){
    text = text.toLowerCase()
               .replace(/(?:https?|ftp):\/\/[\n\S]+/g, '');
    const str = text.replace(/\W/g, ' ')
    const clean = str.replace(/(\b(\w{1,3})\b(\s|$))/g,'').split(" ");
    var filtered = clean.filter(function (el){
            return el != '';
    });
    // console.log(filtered);
    return filtered;
}


module.exports = {
    calculate: calculate,
}