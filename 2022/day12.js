const fs = require('fs');

const convertHeight = (char) =>{
    if(char === "S"){
        return 0
    }else if(char === "E"){
        return 26
    }
    return "abcdefghijklmnopqrstuvwxyz".indexOf(char)
}

//Node class for Graph
//Neighboors are only added when the difference in height is <= 1
//(Stepping to a 'lower' node is possible)
class Node{
    constructor(height, x, y){
        this.height = convertHeight(height)
        this.letter = height
        this.neighboors = []
        this.visited = false
        this.x = x
        this.y = y
    }
    addNeighboor(node){
        this.neighboors.push(node)
    }
    printNode(){
        console.log("(",this.x,", ",this.y,") ", this.letter, this.visited)
        this.neighboors.forEach(ele => console.log("\t(",ele.x,", ",ele.y,") ", ele.letter, ele.visited))
    }
}

class Graph{
    constructor(root){
        this.root = root //Node
        this.resetQueue = []
    }
    //Solve the graph using Breadth-First Search:
    //Returns the Number of Steps required to find the target height
    //Returns Infinity if there is no path to target height
    solve(target){
        //console.log("Root at: (",this.root.x, this.root.y,")", this.root.neighboors)
        let found = false
        let queue = [...this.root.neighboors] //need to create shallow copy
        let nextLevel = []
        this.root.visited = true 
        queue.push(null)
        this.resetQueue.push(this.root)
        let depth = 1
        while(!found && queue[0] !== null){
            for(let i = 0; i < queue.length; i++){
                let node = queue[i]
                
                if(node === null){
                    depth++
                }else if(node.height === target){
                    this.resetVisited()
                    found = true
                    return depth
                }else{
                    node.neighboors.forEach(neighboor => {
                        if(!neighboor.visited){
                            nextLevel.push(neighboor)
                            neighboor.visited = true
                            this.resetQueue.push(neighboor)
                        }
                    })
                }
            }
            nextLevel.push(null)
            queue = nextLevel
            nextLevel = []
        }
        return Infinity //no path to 'E' 
    }
    //Each graph uses the same set of Nodes, so after solving the Nodes.visited must be set to false.
    resetVisited(){
        this.resetQueue.forEach(node => {
            node.visited = false
        })
        this.resetQueue = []
    }
}

let data = fs.readFile("inputs/day12.txt", 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    let grid = []
    data.trim().split('\n').forEach((row, y_pos) => {
        grid.push(row.trim().split('').map((ele, x_pos) => new Node(ele, x_pos, y_pos)))
    })

    let graph
    let graphArr = []

    //For each node in the grid, add neighboors if allowed
    //For each node in the grid, create a new Graph if height == 0
    for(let y = 0; y < grid.length; y++){
        for(let x = 0; x < grid[y].length; x++){
            //part1 Graph
            if(grid[y][x].letter === "S"){
                graph = new Graph(grid[y][x])
                console.log(graph.root.letter, graph.root.neighboors)
            }
            //Part2 all possible starting nodes
            if(grid[y][x].height === 0){
                graphArr.push(new Graph(grid[y][x]))
            }
            //Add Neighboors
            if(x > 0){ //left Neighboor
                if(grid[y][x].height >= grid[y][x - 1].height - 1){
                    grid[y][x].addNeighboor(grid[y][x-1])
                }
            }
            if(x < grid[y].length - 1){ //right Neighboor
                if(grid[y][x].height >= grid[y][x+1].height - 1){
                    grid[y][x].addNeighboor(grid[y][x+1])
                }
            }
            if(y > 0){ //top Neighboor
                if(grid[y][x].height >= grid[y - 1][x].height - 1){
                    grid[y][x].addNeighboor(grid[y - 1][x])
                }
            }
            if(y < grid.length - 1){ //Bottom Neighboor
                if(grid[y][x].height >= grid[y + 1][x].height - 1){
                    grid[y][x].addNeighboor(grid[y + 1][x])
                }
            }
        }
    }

    console.log(graph.solve(26))
    let stepArr = graphArr.map(ele => ele.solve(26))
    console.log(Math.min(...stepArr))
    
  });