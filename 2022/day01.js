const fs = require('fs');
let data = fs.readFile("inputs/day01.txt", 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }

    let result = data.split('\n\n').map(ele => ele.split('\n').reduce((sum,ele) => sum+ +ele, 0))
    result.sort((a,b) => b-a)
    console.log(result[0], result.slice(0,3).reduce((sum,ele) => sum+ele,0))
  });