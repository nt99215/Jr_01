import GameConfig from "../../../data/GameConfig";

let _totalPriceArr = [];
let _currentPriceArr = [];
let _xPosArr = [482, 442, 402, 351, 310];
let _yPos = [62, 216];
let _dotPos = [101, 255];
export default class PriceCount {
    constructor(game, group, key) {
        this._game = game;
        this._gameGroup = group;
        this._paymentGroup = this._game.add.group();
        this._key = key;
        this._init();
    }

    _init() {

        // let totalAmount = Number(GameConfig.TOTAL_AMOUNT - 10000).toString();
        let totalAmount = GameConfig.TOTAL_AMOUNT.toString();

        for (let i = 0; i < totalAmount.length; i++)
        {
            let num = String(totalAmount).substr((totalAmount.length - 1) - i, 1)
            _totalPriceArr.push(num);
            let asset = 'posNumber_' + num;
            let img = new Phaser.Image(this._game, _xPosArr[i], _yPos[0], this._key, asset);
            this._gameGroup.addChild(img);
        }

        let dot = new Phaser.Image(this._game, 386, _dotPos[0], this._key, 'posNumber_dot');
        this._gameGroup.addChild(dot);
    }

    _count(num) {

        console.log(num);
        let totalAmount = num.toString();

        this._paymentGroup.removeChildren(0, this._paymentGroup.length);
        for(let i = 0; i < _currentPriceArr.length; i++)  _currentPriceArr.splice(i, 1);
        for(let i  =0; i<this._paymentGroup.length; i++) this._paymentGroup[i].destroy();

        for (let i = 0; i < totalAmount.length; i++)
        {
            let num = String(totalAmount).substr((totalAmount.length - 1) - i, 1)
            _currentPriceArr.push(num);
            let asset = 'payNumber_' + num;
            let img = new Phaser.Image(this._game, _xPosArr[i], _yPos[1], this._key, asset);
            this._paymentGroup.addChild(img);
        }


        if(num >= 1000)
        {
            let dot = new Phaser.Image(this._game, 386, _dotPos[1], this._key, 'payment_dot');
            this._paymentGroup.addChild(dot);
        }


    }

}