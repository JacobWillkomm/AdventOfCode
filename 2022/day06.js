const fs = require('fs');
let data = fs.readFile("inputs/day06.txt", 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    let result = data.split('')
    let substringPacket, substringMessage, packetIndex = 0, messageIndex = 0

    for(let i = 0; i < result.length; i++){
      if(i + 4 < result.length){
        substringPacket = result.slice(i, i+4)
        if(new Set(substringPacket).size === 4 && packetIndex === 0){
          packetIndex = i + 4
        }
      }
      if(i + 14 < result.length){
        substringMessage = result.slice(i, i+14)
        if(new Set(substringMessage).size === 14 && messageIndex === 0){
          messageIndex = i + 14
        }
      }

    }
    console.log(packetIndex, messageIndex)
  });