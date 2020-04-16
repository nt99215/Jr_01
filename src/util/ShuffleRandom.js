let posX, sX, sY;

let xDist = 350;
let yDist = 33;

let xTerm = 800;
let yTerm = 210;

let imageTerm = 150;

export default class ShuffleRandom{
    constructor(game) {
        this._game = game;

        posX = [];
        sX = [];
        sY = [];

    }

    _shuffle(num) {
        let arr = [];
        for(let i=0; i<num; i++){
            // let n = (i +1) * xDist + xTerm;
            let n = i * xTerm + this._game.rnd.integerInRange(imageTerm, xDist);
            posX.push(n);
            // posY.push(i * yDist + yTerm);
        }

        arr.push(posX);
        return arr;
    }



    _reShuffle(reArr, min) {

        let j, x, i;
        for (i = reArr.length - min; i > 0; i--)
        {
            j = Math.floor(Math.random() * (i + 1));
            x = reArr[i];
            reArr[i] = reArr[j];
            reArr[j] = x;
        }
        return reArr;
    }

    _compare ( a , b ) {
        a.toString();
        b.toString();
        return ( b < a ) ? 1 : ( b == a ) ? 0 : -1;
    }

    posInit(num) {

        let posArr = []
        let temp, rnum

        for(let i=1; i<=num; i++){
            posArr.push(i);
        }

        for(let i=0; i< posArr.length ; i++)
        {
            rnum = parseInt(Math.random() *num);
            temp = posArr[i];
            posArr[i] = posArr[rnum];
            posArr[rnum] = temp;
        }

        return posArr;

        this._game = null;
    }

    arrayShuffle(a) {
        let j, x, i;
        for (i = a.length; i; i -= 1) {
            j = Math.floor(Math.random() * i);
            x = a[i - 1];
            a[i - 1] = a[j];
            a[j] = x;
        }
    }

    pickNow(arr, pick = 3){
        let numbers = [];
        let pickNumbers = pick;
        for(let insertCur = 0; insertCur < pickNumbers ; insertCur++){
            numbers[insertCur] = Math.floor(Math.random() * arr.length);
            for(let searchCur = 0; searchCur < insertCur; searchCur ++){
                if(numbers[insertCur] === numbers[searchCur]){
                    insertCur--;
                    break;
                }
            }
        }

       /* let result = "";
        for(let i = 0; i < pickNumbers; i ++){
            if(i > 0){
                result += ", ";
            }
            result += numbers[i];
        }*/

        // console.log(numbers);
        return numbers;
    }


}

ShuffleRandom = null;


