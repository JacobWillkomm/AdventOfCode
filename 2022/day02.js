let mapping = {
    'A' : 'rock',
    'B' : 'paper',
    'C' : 'scissors',
}

let winReq = {
    'X' : 'lose',
    'Y' : 'draw',
    'Z' : 'win'
}

let points = {
    'rock' : 1,
    'paper' : 2,
    'scissors' : 3
}

const fs = require('fs');
let data = fs.readFile("inputs/day02.txt", 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    let result = data.trim().split('\n').map(ele =>{
        console.log(ele)
        return calculateScorePart2(ele.split(' ')[0], ele.split(' ')[1])
    })
    console.log(result)
    console.log(result.reduce((sum, ele) => sum + ele, 0))

});

function calculateScorePart1(opp, self){
    let gamescore = 0
    if(mapping[opp] === mapping[self]){
        gamescore = 3
    }else if((mapping[opp] === "rock" && mapping[self] === "scissors") 
            ||(mapping[opp] === "scissors" && mapping[self] === "paper")
            ||(mapping[opp] === "paper" && mapping[self] === "rock")){
        gamescore = 0
    }else{
        gamescore = 6
    }
    return gamescore + points[mapping[self]]
}

function calculateScorePart2(opp, req){
    let self, gamescore
    console.log("req: ", req, winReq[req], " opp: ", opp, mapping[opp])
    if(winReq[req] === "draw"){
        self = mapping[opp]
        gamescore = 3
    }else if(winReq[req] === "win"){
        if(mapping[opp] === "rock"){
            self = "paper"
        }else if(mapping[opp] === "paper"){
            self = "scissors"
        }else{
            self = "rock"
        }
        gamescore = 6
    }else {
        if(mapping[opp] === "rock"){
            self = "scissors"
        }else if(mapping[opp] === "paper"){
            self = "rock"
        }else{
            self = "paper"
        }
        gamescore = 0
    }
    console.log(" self: ", self, " score: ", gamescore, points[self])
    return gamescore + points[self]
}