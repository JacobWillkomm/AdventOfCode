//Shapes
/*
####

.#.
###
.#.

..#
..#
###

#
#
#
#

##
##
*/

let rockDefs = [
    [[0,0],[0,1],[0,2],[0,3]],
    [[1,0],[0,1],[1,1],[2,1],[1,2]],
    [[2,0],[2,1],[0,2],[1,2],[2,2]],
    [[0,0],[0,1],[0,2],[0,3],[0,4]],
    [[0,0],[1,0],[0,1],[1,1]]
]


class Rock{
    constructor(coords){
        this.coords = coords
    }
    pushRock(dir){
        this.coords.map(ele => {
            if(dir === '>'){
                //move right
            }else{
                //move left
            }
        })
    }
}