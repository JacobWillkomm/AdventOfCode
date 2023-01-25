class WallGrid{
  constructor(){
    this.sandOrigin_x = 500
    this.sandOrigin_y = 0
    this.totalSandCount = 0
    this.grid = []
  }

  //Resize takes the min value for x and y and the max value for x
  //and creates an array of arrays of strings and places the sandOrgin
  //one additional row, and one additional column is added to each side
  resize(minX, maxX, maxY){
    this.minX = minX - 1
    this.maxX = maxX + 1
    this.maxY = maxY + 1
    for(let row = 0; row <= this.maxY; row++){
      this.grid.push(Array(this.maxX - this.minX + 1).fill('.'))
    }
    this.grid[this.sandOrigin_y][this.sandOrigin_x - this.minX] = '+'
  }

  //addWall takes an two points, broken into x and y components
  //and adds a wall between them
  addWall(x1, y1, x2, y2){
    let initalX = Math.min(x1, x2)
    let initalY = Math.min(y1, y2)
    let finalX = Math.max(x1,x2)
    let finalY = Math.max(y1, y2)

    //vertical Wall
    if(initalX === finalX){
      for(let row = initalY; row <= finalY; row++){
        this.grid[row][initalX - this.minX] = '#'
      }
    }
    //horizontal wall
    if(initalY === finalY){
      for(let col = (initalX - this.minX); col <= (finalX - this.minX); col++){
        this.grid[initalY][col] = '#'
      }
    }
  }
  //TODO: addSandParticle
  addSand(){
    let sandFalling = true
    let sandPosX = this.sandOrigin_x - this.minX
    let sandPosY = this.sandOrigin_y
    console.log("sand falling Start")
    while(sandFalling){
      //console.log("sand falling", "x:", sandPosX, "y:",sandPosY, this.grid[sandPosY+1][sandPosX-1], this.grid[sandPosY+1][sandPosX], this.grid[sandPosY+1][sandPosX+1])
      //if space below is empty, move down 1
      if(this.grid[sandPosY + 1][sandPosX] === "."){
        sandPosY++
      }
      else if(this.grid[sandPosY + 1][sandPosX - 1] === "."){
        sandPosY++
        sandPosX--
      }else if(this.grid[sandPosY + 1][sandPosX + 1] === "."){
        sandPosY++
        sandPosX++
      }else{
        this.grid[sandPosY][sandPosX] = 'o'
        this.totalSandCount++
        sandFalling = false
      }
    }
  }

  //print grid used for troubleshooting
  printGrid(){
    console.log(this.grid.reduce((str, currentRow, rowIndex) => str + rowIndex +  '\t' + currentRow.join('')+ '\n', ''+this.minX+" -> "+this.maxX+'\n'))
  }

}

let temp = new WallGrid();
temp.resize(494, 503, 9)
temp.addWall(498, 4, 498, 6)
temp.addWall(498, 6, 496, 6)
temp.addWall(503, 4, 502, 4)
temp.addWall(502, 4, 502, 9)
temp.addWall(502, 9, 494, 9)
temp.printGrid()
for(let i = 0; i < 25; i++){
  temp.addSand()
}
temp.printGrid()

const fs = require('fs');
let data = fs.readFile("inputs/day14.txt", 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    let coordArr = []
    data.trim().split('\n').forEach(line => {
        let lineArr = line.split(" -> ")
        for(let i = 1; i < lineArr.length; i++){
            
        }
        line.split(' -> ').forEach(coord => {
            //console.log(coord)
        })
    })


  });