const fs = require('fs');

const compare = (left, right) => {
    //base case comparison
    if(Number.isFinite(left) && Number.isFinite(right)){
        if(left > right){
            return -1
        }else if(left < right){
            return 1
        }
    }else if(Number.isFinite(left)){
        //if left is a number & right is an array, put left into an array and try again
        return compare([left], right)
    }else if(Number.isFinite(right)){
        //if right is a number & left is an array, put right into an array and try again
        return compare(left, [right])
    }else{
        //check for undefinded (and empty arrays)
        if(left === undefined){
            return 1
        }
        if(right === undefined){
            return -1
        }

        for(let i = 0; i < Math.max(left.length, right.length); i++){
            //for each index in the arrays, compare them
            let comp = compare(left[i], right[i])
            if(comp !== 0) {
                //our recursive call returns -1 or 1, return it. 0 means continue
                return comp
            }
        }
        if(left.length < right.length){
            return 1
        }
        if(left.length > right.length){
            return -1
        }
    }
    //return 0 so we continue
    return 0
}


let data = fs.readFile("inputs/day13.txt", 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }

    let part1Sum = 0
    let part2Arr = [[[2]],[[6]]]
    data.trim().split('\n\n').forEach((ele,i) => {
        //for each pair of inputs, compare and count
        let leftInput = JSON.parse(ele.split('\n')[0])
        let rightInput = JSON.parse(ele.split('\n')[1])
        let comp = compare(leftInput, rightInput)
        if(comp === 1){
            part1Sum += (i + 1)
        }
        
        //create array for part2
        //we could improve by inserting into the correct spot of a sorted array
        part2Arr.push(leftInput,rightInput)
    })

    part2Arr.sort((b,a)=>compare(a,b))

    let div1, div2
    for(let i = 0; i< part2Arr.length; i++){
        console.log(compare([[2]], part2Arr[i]), compare([[6]], part2Arr[i]))
        if(compare([[2]], part2Arr[i]) === 0){ 
            div1 = i + 1
        }
        if(compare([[6]], part2Arr[i]) === 0){
            div2 = i + 1
        }
    }
    console.log(part2Arr)
    console.log(div1 * div2)
    console.log(part1Sum)
  });

