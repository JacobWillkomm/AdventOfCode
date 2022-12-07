const fs = require('fs');
let data = fs.readFile("inputs/day04.txt", 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    console.log(data.split('\n').filter(ele => {
        let range1Low = ele.split('-')[0]
        let range1High = ele.split('-')[1].split(',')[0]
        let range2High = ele.split('-')[2]
        let range2Low = ele.split('-')[1].split(',')[1]
        return((+range1Low >= +range2Low) && (+range1High <= +range2High) || (+range1Low <= +range2Low) && (+range1High >= +range2High))
        
    }).length,
    data.split('\n').filter(ele => {
        let range1Low = ele.split('-')[0]
        let range1High = ele.split('-')[1].split(',')[0]
        let range2High = ele.split('-')[2]
        let range2Low = ele.split('-')[1].split(',')[1]
        return((+range2Low <= +range1High) && (+range1Low <= +range2Low) || (+range1Low <= +range2High) && (+range2Low <= +range1Low))
        
    }).length)


  });