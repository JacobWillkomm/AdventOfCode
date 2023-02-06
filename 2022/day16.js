//Basic ideas:
//We can solve part1 by simplifing the Graph
//by only considering Nodes with flowRate > 0
//and calculating the distance to each other Node
//Once we've simplified the graph:
//We can use DFS to search all possible paths
//and return the best one



const fs = require('fs');

class Node{
    constructor(name){
        this.nodeName = name
        this.flowRate = 0
        this.neighboors = []
        this.significantNeighboors = []
        this.visited = false
        this.opened = false
    }
    addNeighboor(node){
        this.neighboors.push(node)
    }
    setFlowRate(rate){
        this.flowRate = rate
    }
    printNode(){
        let neighboorStr = ''
        this.neighboors.forEach(ele => {
            neighboorStr += ele.nodeName + ', '
        })
        console.log('Node ' + this.nodeName +", Flow: " + this.flowRate + ", Neighboors: " + neighboorStr)
    }
    //set significant Neighboors
    //calculate the distance to each other node with a flowRate > 0
    //using BFS
}

class Graph{
    constructor(initialNode){
        
    }
}

let nodes = {}

let data = fs.readFile("inputs/day16.txt", 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    let graph = []
    let name = ""
    let rate = ""
    let neighboors = []
    data.trim().split('\n').forEach((row) => {
        name = row.split(";")[0].split(' ')[1]
        rate = row.split(";")[0].split('=')[1]
        neighboors = row.split(";")[1].split("valves ")[1]
        if(neighboors === undefined){
            neighboors = row.split(";")[1].split("valve ")[1]
        }
        console.log(name, rate, neighboors)

        if(nodes.hasOwnProperty(name)){
            nodes[name].setFlowRate(rate)
            //add Neighboors
            neighboors.split(', ').forEach(ele => {
                if(nodes.hasOwnProperty(ele)){
                    nodes[name].addNeighboor(nodes[ele])
                }
                else{
                    nodes[ele] = new Node(ele)
                    nodes[name].addNeighboor(nodes[ele])
                }
            })
        }else{
            nodes[name] = new Node(name)
            nodes[name].setFlowRate(rate)
            //add Neighboors
            neighboors.split(', ').forEach(ele => {
                if(nodes.hasOwnProperty(ele)){
                    nodes[name].addNeighboor(nodes[ele])
                }
                else{
                    nodes[ele] = new Node(ele)
                    nodes[name].addNeighboor(nodes[ele])
                }
            })
        }

        let node = new Node(name)
        node.setFlowRate(+rate)
        graph.push(node)
    })

    Object.keys(nodes).forEach(ele => {
        nodes[ele].printNode()
    })
})

