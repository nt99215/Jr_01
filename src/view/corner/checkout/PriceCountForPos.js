
let _currentPriceArr = [];
let _xPosArr = [742, 702, 662, 598, 558];
let _yPos = 60;
export default class PriceCountForPos {
    constructor(game, group, key) {
        this._game = game;
        this._gameGroup = group;
        this._paymentGroup = this._game.add.group();
        this._key = key;
        this._count(0);
    }

    _count(num) {

        let totalAmount = num.toString();
        this._paymentGroup.removeChildren(0, this._paymentGroup.length);
        for(let i = 0; i < _currentPriceArr.length; i++)  _currentPriceArr.splice(i, 1);
        for(let i  =0; i<this._paymentGroup.length; i++) this._paymentGroup[i].destroy();

        for (let i = 0; i < totalAmount.length; i++)
        {
            let num = String(totalAmount).substr((totalAmount.length - 1) - i, 1);
            _currentPriceArr.push(num);
            let asset = 'posNumber_' + num;
            let img = new Phaser.Image(this._game, _xPosArr[i], _yPos, this._key, asset);
            // console.log(_xPosArr[i])
            this._paymentGroup.addChild(img);
        }

        if(num >= 1000)
        {
            let dot = new Phaser.Image(this._game, 640, 99, this._key, 'posNumber_dot');
            this._paymentGroup.addChild(dot);
        }

    }

}