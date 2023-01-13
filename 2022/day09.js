const { dir } = require('console');
const fs = require('fs');



class Grid{
    constructor(){
        //Part1 vars
        this.headPosition = {x:0, y:0}
        this.tailPosition = {x:0, y:0}
        this.tailVisits = ['0,0']

        //Part2 Vars "Knots"
        this.knotPositions = [{x:0, y:0},{x:0, y:0},{x:0, y:0},{x:0, y:0},{x:0, y:0},{x:0, y:0},{x:0, y:0},{x:0, y:0},{x:0, y:0},{x:0, y:0}]
        this.knotTailVisits = ['0,0']
    }
    //Part2 Update Head
    updateHeadKnot(direction){
        if(direction === "R"){
            this.knotPositions[0].x++
        }else if(direction === "L"){
            this.knotPositions[0].x--
        }else if(direction === "D"){
            this.knotPositions[0].y--
        }else if(direction === "U"){
            this.knotPositions[0].y++
        }
        this.updateKnots()
    }
    //Part2 Update subsequent knots
    updateKnots(){
        for(let knot = 1; knot < this.knotPositions.length; knot++){
            let head = this.knotPositions[knot - 1]
            let tail = this.knotPositions[knot]
            if(Math.abs(head.x - tail.x) > 1 || Math.abs(head.y - tail.y) > 1){
                //Non-diagonal cases
                if(head.x === tail.x || head.y === tail.y){
                    if(head.x > tail.x){ //right
                        tail.x++
                    }else if(head.x < tail.x){ //Left
                        tail.x--
                    }else if(head.y < tail.y){ //Down
                        tail.y--
                    }else if(head.y > tail.y){ //Up
                        tail.y++
                    }
                //Diagonal Cases
                }else{
                    if(head.x - tail.x === 2){ //right
                        tail.x++
                        if(head.y > tail.y){ //Right-Up
                            tail.y++
                        }else{ //Right-down
                            tail.y--
                        }
                    }else if(head.x - tail.x === -2){ //Left
                        tail.x--
                        if(head.y > tail.y){ //Left-Up
                            tail.y++
                        }else{ //Left-Down
                            tail.y--
                        }
                    }else if(head.y - tail.y === -2){ //Down
                        tail.y--
                        if(head.x > tail.x){ //Right-Down
                            tail.x++
                        }else{ //Left-Down
                            tail.x--
                        }
                    }else if(head.y - tail.y === 2){ //Up
                        tail.y++
                        if(head.x > tail.x){ //Right-Up
                            tail.x++
                        }else{ //Left-Up
                            tail.x--
                        }
                    }
                }
            }
            this.knotPositions[knot] = tail
        }
        this.knotTailVisits.push(this.knotPositions[9].x+','+this.knotPositions[9].y)
    }

    //Part1 update Head & Tail
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
        //grid.updatePosition(ele.split(' ')[0], +ele.split(' ')[1])
        //let part1 = new Set(grid.tailVisits)
        //console.log(part1.size)
        for(let i = 0; i < +ele.split(' ')[1]; i++){
            grid.updateHeadKnot(ele.split(' ')[0])
        }
    })
    let part2 = new Set(grid.knotTailVisits)
    console.log(part2.size)



  });