const fs = require('fs');

class node{
    constructor(name){
        nodeName = name
        flowRate = 0
        neighboors = []
        visited = false
    }
    addNeighboor(node){
        this.neighboors.push(node)
    }
    setFlowRate(rate){
        this.flowRate = rate
    }
    printNode(){
        let neighboorStr = ''
        neighboors.forEach(ele => {
            neighboorStr + ele.nodeName + ', '
        })
        console.log('Node ' + this.nodeName +", Flow: " + this.flowRate + ", Neighboors: " + neighboorStr)
    }
}

let data = fs.readFile("inputs/day16.txt", 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    data.trim().split('\n').forEach((row) => {
        console.log(row.split(" "))
    })
})

