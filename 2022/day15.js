const fs = require('fs');
let data = fs.readFile("inputs/day15.txt", 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }

    data.trim().split('\n').forEach(ele => {
        let sensorInput = ele.split(':')[0]
        let closestBeaconInput = ele.split(':')[1]
        console.log(sensorInput)
    })
  });