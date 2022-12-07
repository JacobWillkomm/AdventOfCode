const fs = require('fs');
let data = fs.readFile("inputs/day05.txt", 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    let crateData = data.split('\n\n')[0].split('\n').reverse().map(ele => ele.split('')), moveData = data.split('\n\n')[1].trim()
    let crateArray = []
    //Convert initial crate positions to Array of Stacks
    crateData.forEach(line => {
      for(let i = 1; i < line.length; i+=4){
        if(crateArray.length < (Math.floor((line.length+1) / 4))){
          crateArray.push([])
        }
        if(line[i].toUpperCase() != line[i].toLowerCase()){
            crateArray[Math.floor(i/4)].push(line[i])
        }
      }
    })
    moveData.split('\n').forEach(instruction => {
      
      console.log(crateArray)
      let quantity = instruction.split(' ')[1]
      let source = instruction.split(' ')[3]
      let target = instruction.split(' ')[5]
      let temp = crateArray[+source-1].splice(-(+quantity), quantity)
      //Part 1 solution:
      // if(temp.length > 1){
      //   temp = temp.reverse()
      // }
      console.log(instruction, temp)
      temp.forEach(crate => {
        crateArray[+target-1].push(crate)
      })
    })
    console.log(crateArray)
    console.log(crateArray.reduce((result1, stack) => result1 + stack.pop(), ''))
    
      
  });