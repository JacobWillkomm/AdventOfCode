class WallGrid{
  constructor(){
    this.sandOrigin_x = 500
    this.sandOrigin_y = 0
    this.totalSandCount = 0
    this.grid = []
    this.minX = Infinity
    this.maxX = 0
    this.maxY = 0
  }

  //Resize must be called before starting to add walls and sand
  //Resize gets the min value for x and y and the max value for x
  //and creates an array of arrays of strings and places the sandOrgin
  //one additional row, and one additional column is added to each side
  //Part2: A floor is added below the buffer row
  //        the floor extends into inf on each side, so the number of vertical rows was added to each side of individual row
  //        so that there should be enough room for the origin to be covered.
  resize(){
    this.minX = this.minX - this.maxY
    this.maxX = this.maxX + this.maxY
    this.maxY = this.maxY + 1
    for(let row = 0; row <= this.maxY; row++){
      this.grid.push(Array(this.maxX - this.minX + 1).fill('.'))
    }
    this.grid.push(Array(this.maxX - this.minX + 1).fill('#'))
    this.grid[this.sandOrigin_y][this.sandOrigin_x - this.minX] = '+'
  }
  
  //checkSize takes a point and sets the min and max X and Y coords
  //Must call resize after the last time checkSize is called
  checkSize(point){
    if(+point[0] > this.maxX){
      this.maxX = +point[0]
    }
    if(+point[0] < this.minX){
      this.minX = +point[0]
    }
    if(+point[1] > this.maxY){
      this.maxY = +point[1]
    }

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
    while(sandFalling){
      //Check if sand will fall out of bounds
      //  adjusted to account for the horizontal transformation:
      //  (maxX - minX) right side
      //  (minX - minX) which simplifies to 0
      if(sandPosX >= (this.maxX - this.minX) || sandPosX < 0){//Part1 check || sandPosY >= this.maxY){
        console.log("Sand OOB")
        sandFalling = false
        return false
      }
      //if space below is empty, move down 1
      else if(this.grid[sandPosY + 1][sandPosX] === "."){
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
        if(sandPosX === this.sandOrigin_x - this.minX && sandPosY === this.sandOrigin_y){//part2 check
          return false
        }
      }
    }
    return true
  }

  //print grid used for troubleshooting
  printGrid(){
    console.log(this.grid.reduce((str, currentRow, rowIndex) => str + rowIndex +  '\t' + currentRow.join('')+ '\n', ''+this.minX+" -> "+this.maxX+'\n'))
  }

}

let part1Grid = new WallGrid();


const fs = require('fs');
let data = fs.readFile("inputs/day14.txt", 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    let coordArr = []
    data.trim().split('\n').forEach(line => {
        let lineArr = line.split(" -> ")
        for(let i = 1; i < lineArr.length; i++){
            let ini = lineArr[i-1].split(',')
            let fin = lineArr[i].split(',')
            part1Grid.checkSize(ini)
            part1Grid.checkSize(fin)
            coordArr.push([ini,fin])
        }
    })
    part1Grid.resize()
    coordArr.forEach(ele => {
      part1Grid.addWall(ele[0][0], ele[0][1], ele[1][0], ele[1][1])
    })
    while(part1Grid.addSand()){}
    console.log("Part2 Total Sand:", part1Grid.totalSandCount)


  });