const fs = require('fs');
let data = fs.readFile("inputs/day10.txt", 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    data.trim().split('\n').forEach(ele => {
        console.log(ele)
    })
  });