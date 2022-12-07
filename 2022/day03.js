const fs = require('fs');
let data = fs.readFile("inputs/day03.txt", 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }

    let result1 = data.trim().split('\n').map(ele => {
        let front = ele.slice(0,ele.length/2), back = ele.slice(ele.length/2)
        let frontSet = new Set(front.split('')), backSet = new Set(back.split(''))
        for (const item of intersection(frontSet, backSet)) {
            if(item === item.toLowerCase()){
                return item.charCodeAt(0) - 96
            }
            else{
                return item.charCodeAt(0) - 38
            }
        }
        
    })
    let result2 = 0, temp = data.trim().split('\n'), set1, set2, set3, tempSet
    for(let i = 0; i < temp.length; i += 3){
        set1 = new Set(temp[i].split(''))
        set2 = new Set(temp[i+1].split(''))
        set3 = new Set(temp[i+2].split(''))
        tempSet = intersection(set1, set2)

        for (const item of intersection(tempSet, set3)) {
            if(item === item.toLowerCase()){
                result2 += item.charCodeAt(0) - 96
            }
            else{
                result2 += item.charCodeAt(0) - 38
            }
        }
    }
    console.log(result1.reduce((sum, ele) => sum + ele, 0), result2)
  });

  function intersection(setA, setB) {
    const _intersection = new Set();
    for (const elem of setB) {
      if (setA.has(elem)) {
        _intersection.add(elem);
      }
    }
    return _intersection;
  }