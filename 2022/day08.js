const fs = require('fs');
let data = fs.readFile("inputs/day08.txt", 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    let grid = []
    data.trim().split('\n').forEach(row => {
      grid.push(row.split(''))
    })
    let rows = grid.length
    let columns = grid[0].length

    console.log("rows: ", rows, "cols: ", columns)

  });