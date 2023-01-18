const fs = require('fs');

const convertHeight = (char) =>{
    if(char === "S"){
        return 0
    }else if(char === "E"){
        return 26
    }
    return "abcdefghijklmnopqrstuvwxyz".indexOf(char)
}

class Node{
    constructor(height){
        this.height = convertHeight(height)
        this.letter = height
        this.neighboors = []
        this.visited = false
    }
    addNeighboor(node){
        this.neighboors.push(node)
    }
}

class Graph{
    constructor(root){
        this.root = root //Node
    }
    solve(target){
        let found = false
        let queue = this.root.neighboors
        let nextLevel = []
        this.root.visited = true 
        queue.push(null)
        let depth = 1
        while(!found && queue[0] !== null){
            console.log(queue.length)
            for(let i = 0; i < queue.length; i++){
                let node = queue[i]
                console.log(node)
                if(node === null){
                    depth++
                }else if(node.height === target){
                    found = true
                    return depth
                }else{
                    node.neighboors.forEach(neighboor => {
                        if(!neighboor.visited){
                            nextLevel.push(neighboor)
                            neighboor.visited = true
                        }
                    })
                }
            }
            nextLevel.push(null)
            queue = nextLevel
            nextLevel = []
        }
    }
}

let data = fs.readFile("inputs/day12.txt", 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    let grid = []
    data.trim().split('\n').forEach(row => {
        grid.push(row.trim().split('').map(ele => new Node(ele)))
    })

    let graph

    for(let y = 0; y < grid.length; y++){
        for(let x = 0; x < grid[y].length; x++){
            if(grid[y][x].letter === "S"){
                graph = new Graph(grid[y][x])
                console.log(graph.root.letter, graph.root.neighboors)
            }
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
    
  });