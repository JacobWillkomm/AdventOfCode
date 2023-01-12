const { dir } = require('console');
const fs = require('fs');



class Grid{
    constructor(){
        this.headPosition = {x:0, y:0}
        this.tailPosition = {x:0, y:0}
        this.tailVisits = ['0,0']
    }
    updatePosition(direction, num){
        if(num === 0){
            console.log("Head: ", this.headPosition, "\t Tail: ", this.tailPosition)
            return true
        }

        if(direction === "R"){
            this.headPosition.x++
        }else if(direction === "L"){
            this.headPosition.x--
        }else if(direction === "D"){
            this.headPosition.y--
        }else if(direction === "U"){
            this.headPosition.y++
        }

        console.log("Head At: ", this.headPosition)

        if(Math.abs(this.headPosition.x - this.tailPosition.x) > 1 || Math.abs(this.headPosition.y - this.tailPosition.y) > 1){
            //same x or y position: NOT diagonal
            if(this.headPosition.x === this.tailPosition.x || this.headPosition.y === this.tailPosition.y){
                if(direction === "R"){
                    this.tailPosition.x++
                }else if(direction === "L"){
                    this.tailPosition.x--
                }else if(direction === "D"){
                    this.tailPosition.y--
                }else if(direction === "U"){
                    this.tailPosition.y++
                }
            }else{ //diagonal cases
                if(direction === "R"){
                    this.tailPosition.x++
                    this.tailPosition.y = this.headPosition.y
                }else if(direction === "L"){
                    this.tailPosition.x--
                    this.tailPosition.y = this.headPosition.y
                }else if(direction === "D"){
                    this.tailPosition.y--
                    this.tailPosition.x = this.headPosition.x
                }else if(direction === "U"){
                    this.tailPosition.y++
                    this.tailPosition.x = this.headPosition.x
                }
            }
            this.tailVisits.push(this.tailPosition.x+","+this.tailPosition.y)
        }
        console.log(direction, num)
        num = num - 1
        return this.updatePosition(direction, num)
    }

}

let data = fs.readFile("inputs/day09.txt", 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }

    let grid = new Grid()
    data.trim().split('\n').forEach(ele => {
        grid.updatePosition(ele.split(' ')[0], +ele.split(' ')[1])
        let part1 = new Set(grid.tailVisits)
        console.log(part1.size)
    })



  });