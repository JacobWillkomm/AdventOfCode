const fs = require('fs');

class Monkey{
    constructor(startingItems, operation, conditionValue, trueTarget, falseTarget){
        this.items = startingItems //Array of ints (Items described by worryLevel)
        this.operation = operation //Operation as String describing how worryLevel will update
        this.conditionValue = conditionValue //Int to check worryLevel divisability
        this.trueMonkey = trueTarget //Target monkey when condition is true
        this.falseMonkey = falseTarget //Target monkey when condition is false
        this.totalItemsInspected = 0
    }
    inspectItems(commonFactor){
        //update worryLevel
        this.items.forEach(item => {
            let old = item
    
            old = eval(this.operation) //worryLevel updated according to Monkey Operation
            //old = Math.floor(old / 3) //worryLevel reduced because Monkey didn't break item
            old = old % commonFactor
            if(old % this.conditionValue === BigInt(0)){
                this.trueMonkey.catchItem(old)
            }else{
                this.falseMonkey.catchItem(old)
            }
            this.totalItemsInspected++
        })
        //all items have been thrown
        this.items = []
    }
    catchItem(item){
        this.items.push(item)
    }
    setTargets(trueMonkey, falseMonkey){
        this.trueMonkey = trueMonkey
        this.falseMonkey = falseMonkey
    }
    printMonkey(){
        console.log(this.items, this.operation, this.conditionValue, this.totalItemsInspected)
    }
}


let data = fs.readFile("inputs/day11.txt", 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }

    let monkeyArray = []
    let targetMonkeys = []

    data.trim().split("Monkey ").forEach(ele => {
        if(ele !== ''){
            let input = ele.split('\n')
            let startingItems = input[1].split(':')[1].trim().split(", ").map(ele => BigInt(ele))
            let operationInput = input[2].split('=')[1].trim().split(' ')
            if(!isNaN(operationInput[2])){
                operationInput[2] = "BigInt("+ operationInput[2]+")"
            }

            let operation = operationInput.join('')
            let conditionValue = BigInt(input[3].split("by")[1].trim())
            monkeyArray.push(new Monkey (startingItems, operation, conditionValue))

            //add true and false Monkey targets to array so we can have the targets catchItems() once all monkeys have been instantiated
            let trueMonkeyTarget = Number(input[4].split("throw to monkey ")[1])
            let falseMonkeyTarget = Number(input[5].split("throw to monkey ")[1])
            targetMonkeys.push([trueMonkeyTarget, falseMonkeyTarget])
        }
    });

    let commonFactor = 1n
    monkeyArray.forEach((monkey, i, arr) => {
        monkey.setTargets(arr[targetMonkeys[i][0]], arr[targetMonkeys[i][1]])
        commonFactor *= monkey.conditionValue
    })
    console.log(commonFactor)

    for(let round = 0; round < 10000; round++){
        console.log("round: ",round)
        monkeyArray.forEach(monkey => {
            monkey.inspectItems(commonFactor)
        })
    }
    let totalItemsInspectedArr = monkeyArray.map(monkey => monkey.totalItemsInspected).sort((a,b) => b-a)
    console.log(totalItemsInspectedArr, totalItemsInspectedArr[0] * totalItemsInspectedArr[1])

  });