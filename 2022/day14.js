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
        line.split(' -> ').forEach((coord => {
            console.log(coord)
        })
    })


  });