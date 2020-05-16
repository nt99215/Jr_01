import ShuffleRandom from "../../../util/ShuffleRandom";
import Categories from "../../../data/Categories";
import GameConfig from "../../../data/GameConfig";

const _categoryArr= [
    Categories.VEGETABLE,
    Categories.SEAFOOD,
    Categories.MEAT,
    Categories.NECESSARY,
    Categories.DAIRY,
    Categories.SNACK,
];

export default class PurchaseList {
    constructor(game) {
        this._game = game;

    }

    _randomNumber(a, b) {
        let quantity = this._game.rnd.between(a, b);
        return quantity;
    }

    purchaseList() {
        let arr = [];
        //item shuffle method - 요청으로 제거됨
        // let _shuffleArray = ShuffleRandom.prototype.arrayShuffle(_categoryArr);
        let _shuffleArray = _categoryArr;
        let rN = this._randomNumber(0, _shuffleArray.length - 1);
        for(let i = 0; i<_shuffleArray.length; i++)
        // for(let i = 0; i<1; i++)
        {
            //카테고리 랜덤 제거
            if(rN !== i)
            {
                let array = _shuffleArray[i].itemList;
                let category = _shuffleArray[i].category;
                array = ShuffleRandom.prototype.arrayShuffle(array);
                let pickNum = this._randomNumber(1, 2);
                let item = ShuffleRandom.prototype.pickNow(array, pickNum);
                let quantity = this._randomNumber(1, 3);

                for(let j = 0; j<item.length; j++)
                {
                    if(array[j] !== undefined && array[j] != null)
                    {
                        array[j].quantity = quantity;
                        array[j].category = category;
                        GameConfig.TOTAL_AMOUNT += Number(array[j].price) * Number(array[j].quantity);
                        GameConfig.TOTAL_QUANTITY += array[j].quantity;
                        arr.push(array[j]);
                    }
                }
            }

        }

        //TOTAL CATEGORIES
        GameConfig.TOTAL_CATEGORIES = arr.length;
        // console.log(GameConfig.TOTAL_AMOUNT);
        // console.log('TOTAL_CATEGORIES : ', GameConfig.TOTAL_CATEGORIES);
        // console.log('TOTAL_QUANTITY : ', GameConfig.TOTAL_QUANTITY);
        // console.log(arr);
        return arr;
    }

}