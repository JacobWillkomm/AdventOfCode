const fs = require('fs');

class BeaconGrid{
    constructor(){
    }


}

class SensorArray{
    constructor(sensors){
        this.sensors = sensors
    }
    checkPoint(point){
        let pointCovered = false
        for(let i = 0; i < this.sensors.length; i++){
            console.log(i)
            if(this.sensors[i].checkPoint(point)){
                return true
            }
        }
        return false
    }
    getCondensedRange(row){
        let result = []
        for(let i = 0; i < this.sensors.length; i++){
            let tempRange = this.sensors.getCoveredRange(row)
            if(tempRange !== false){
                result.push(tempRange)
            }

        }
    }
}

class Sensor{
    //Constructor takes Origin point as [x,y], and beacon as [x,y]
    constructor(origin, beacon){
        this.x = +origin[0]
        this.y = +origin[1]
        this.beaconX = +beacon[0]
        this.beaconY = +beacon[1]
        console.log(Math.abs(this.x - this.beaconX), this.x, this.beaconX)
        this.radius = Math.abs(this.x - this.beaconX) + Math.abs(this.y - this.beaconY)
    }
    checkPoint(point){
        if(Math.abs(this.x - point[0]) + Math.abs(this.y - point[1]) > this.radius){
            return false
        }else{
            return true
        }
    }

    //takes a row number
    //returns false or an array, result, result[0] = min range, result[1] = max range
    getCoveredRange(row){
        let result = [this.x, this.x]
        if(this.checkPoint([this.x, row])){
            let diff = Math.abs(row - this.y)
            result[0] -= diff
            result[1] += diff
            return result
        }else{
            return false
        }
    }
}

let data = fs.readFile("inputs/day15.txt", 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }

    let sensorArr = []
    let dim = {
        xMax: -Infinity,
        xMin: Infinity,
        yMax: -Infinity,
        yMin: Infinity
    }
    let maxRadius = 0


    data.trim().split('\n').forEach(ele => {
        let sensorInput = ele.split(':')[0]
        let closestBeaconInput = ele.split(':')[1]
        let sensorX = +sensorInput.split("=")[1].split(',')[0]
        let sensorY = +sensorInput.split("=")[2]
        let beaconX = +closestBeaconInput.split("=")[1].split(',')[0]
        let beaconY = +closestBeaconInput.split("=")[2]

        //get min and max x & y coords
        if(dim.xMax < sensorX || dim.xMax < beaconX){
            dim.xMax = Math.max(sensorX, beaconX)
        }
        if(dim.xMin > sensorX || dim.xMin > beaconX){
            dim.xMin = Math.min(sensorX, beaconX)
        }
        if(dim.yMax < sensorY || dim.yMax < sensorY){
            dim.yMax = Math.max(sensorY, beaconY)
        }
        if(dim.yMin > sensorY || dim.yMin > sensorY){
            dim.yMin = Math.min(sensorY, beaconY)
        }
        console.log(dim)

        let sen = new Sensor([sensorX, sensorY], [beaconX, beaconY])
        maxRadius = Math.max(maxRadius, sen.radius)
        sensorArr.push(sen)
        console.log(sen.x, sen.y, sen.radius)



        console.log("x= "+sensorX,"y= "+sensorY, "x= "+beaconX,"y= "+beaconY)
    })
    let sensors = new SensorArray(sensorArr)

    console.log(dim)

    let part1Count = 0
    console.log(rangeArray)
    for(let i = dim.xMin - (maxRadius * 2); i <= dim.xMax + (maxRadius * 2); i++){
        let covered = false
        for(let j = 0; j < sensorArr.length; j++){
            if(i === sensorArr[j].beaconX && 10 === sensorArr[j].beaconY){

            }else if(sensorArr[j].checkPoint([i, 10])){
                covered = true
            }
        }
        if(covered){
            part1Count++
        }    
    }
    // for(let i = 0; i <= 4000000; i++){
    //     if(i % 10000 === 0){
    //         console.log(i)
    //     }
    //     for(j = 0; j <= 4000000; j++){
    //         if(j % 1000000 === 0){
    //             console.log(j)
    //         }
    //         if(!sensors.checkPoint([i,j])){
    //             console.log(i+", "+j)
    //         }
    //     }
    // }
    console.log(part1Count)
    console.log("done")

  });