const fs = require('fs');
let data = fs.readFile("inputs/day13.txt", 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    data.trim().split('\n\n').forEach((ele,i) => {
        let leftInput = eval(ele.split('\n')[0])
        let rightInput = eval(ele.split('\n')[1])
        
        




        console.log(i+":",leftInput)
    })


  });