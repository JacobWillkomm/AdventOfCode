const fs = require('fs');
let data = fs.readFile("inputs/day10.txt", 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    let cycle = 1
    let targetCycles = [20, 60, 100, 140, 180, 220]
    let targetCycleIndex = 0
    let signalStrength = 1
    let part1SumSignalStrength = 0
    data.trim().split('\n').forEach(ele => {
        let command, value = 0
        if(ele.split(' ').length > 1){
            command = ele.split(' ')[0]
            value = +ele.split(' ')[1]
        }else{
            command = ele
            value = NaN
        }
        if(isNaN(value)){
            cycle++
        }else{
            cycle += 2
            signalStrength += +value
        }

        //part1 logic
        if(cycle >= targetCycles[targetCycleIndex]){
            if(cycle === targetCycles[targetCycleIndex]){
                part1SumSignalStrength += cycle * signalStrength
            }else{
                part1SumSignalStrength += targetCycles[targetCycleIndex] * (signalStrength - value)
            }
            targetCycleIndex++
        }
        
    })
    console.log(part1SumSignalStrength)
  });