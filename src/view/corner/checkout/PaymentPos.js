import AssetKey from "../../../data/AssetKey";
import GameConfig from "../../../data/GameConfig";
import CalculatePosItem from "./CalculatePosItem";
import PriceCount from "./PriceCount";

let _cashArr, _startX, _startY, _maximumX, _minimumY, _currentPrice;

export default class PaymentPos {
    constructor(game) {
        this._game = game;
        this._gameGroup = this._game.add.group();
        this._itemGroup = this._game.add.group();
        this._scannerGroup = this._game.add.group();
        this._key = AssetKey.PAYMENT_POS;
        this._checkOutQuantity = 0;
        _cashArr = [];
        _startX = 0;
        _startY = 0;
        _minimumY = 150;
        _currentPrice = 0;
        this._init();
        this._cashGenerate();
        this._posGenerate();
    }

    _init() {

        this.bgRect = this._game.add.graphics(0, 0);
        this.bgRect.beginFill(0x8bd2e8, 1);
        this.bgRect.drawRect(0, 0, 1280, 336);
        this.bgRect.endFill();
        this._gameGroup.addChild(this.bgRect);

        this.bgRectBottom = this._game.add.graphics(0, 0);
        this.bgRectBottom.beginFill(0x2e3c56, 1);
        this.bgRectBottom.drawRect(0, 336 + 33, 1280, 351);
        this.bgRectBottom.endFill();
        this._gameGroup.addChild(this.bgRectBottom);

        this.bgBar = new Phaser.Image(this._game, 0, 336, this._key, 'paymentBgBar');
        this.bgBar.width = 1280;
        this._gameGroup.addChild(this.bgBar);

        this.paymentDisplay = new Phaser.Image(this._game, 196, 23, this._key, 'paymentDisplay');
        this._gameGroup.addChild(this.paymentDisplay);

        this.paymentDisplayResult = new Phaser.Image(this._game, 196, 177, this._key, 'paymentDisplayResult');
        this._gameGroup.addChild(this.paymentDisplayResult);

        this.bowl = new Phaser.Image(this._game, 620, 19, this._key, 'payment_bowl');
        this._gameGroup.addChild(this.bowl);

    }

    _cashGenerate() {
        //100
        for(let i = 0; i<5; i++)
        {
            let term = 178;
            let xPos = term + (i * 49);
            let coin = new Phaser.Image(this._game, xPos, 382, this._key, 'cash_100');
            coin.x = term + (i * (49 + coin.width));
            coin.amount = 100;
            this._gameGroup.addChild(coin);
            _cashArr.push(coin);
            coin.z = i;
        }

        //500
        let coin_500 = new Phaser.Image(this._game, 976, 374, this._key, 'cash_500');
        coin_500.amount = 500;
        this._gameGroup.addChild(coin_500);
        _cashArr.push(coin_500);
        coin_500.z = _cashArr.length;

        //1000~10000
        let _amount = [1000, 5000, 10000];
        for(let i = 0; i<3; i++)
        {
            let term = 118;
            let xPos = term + (i * 75);
            let asset = 'cash_' + _amount[i];
            let coin = new Phaser.Image(this._game, xPos, 524, this._key, asset);
            coin.x = term + (i * (75 + coin.width));
            coin.amount = _amount[i];
            this._gameGroup.addChild(coin);
            _cashArr.push(coin);
            coin.z = _cashArr.length;
        }


        for(let i = 0; i < _cashArr.length; i++)
        {
            let obj = _cashArr[i];
            obj.inputEnabled =  true;
            obj.pixelPerfectOver = true;
            obj.pixelPerfectClick = true;
            obj.input.enableDrag(true);
            obj.events.onInputDown.add(this._onDown, this);
            obj.events.onDragUpdate.add(this._onDrag, this);
            obj.events.onDragStop.add(this._stopDrag, this);
        }


        this._itemGroup.sort('z', Phaser.Group.SORT_ASCENDING);

    }


    _posGenerate() {
        this._priceCount = new PriceCount(this._game, this._gameGroup, this._key);
    }

    _onDown(obj) {
        _startX = obj.x;
        _startY = obj.y;
    }

    _onDrag(obj) {

        obj.bringToTop();
        console.log(parseInt(obj.x), parseInt(obj.y));
        // if(obj.x >= 450) this._payment(obj);
    }

    _stopDrag(obj) {


        if(obj.y >= _minimumY)
        {
            // obj.x = _startX;
            // obj.y = _startY;
            this._game.add.tween(obj).to({x:_startX, y: _startY}, 200, Phaser.Easing.Quartic.Out, true, 0);
        }
        else
        {
            // this._payment(obj);
            _currentPrice += obj.amount;
            this._priceCount._count(_currentPrice);
            console.log('pass');
        }
        // this._itemGroup.sort('y', Phaser.Group.SORT_ASCENDING);

        console.log('z : ', obj.z);
        this._itemGroup.sort('z', Phaser.Group.SORT_DESCENDING);
    }

    _payment(obj) {


    }

    _destroy() {
        this._gameGroup.removeChildren(0, this._gameGroup.length);
        this._itemGroup.removeChildren(0, this._itemGroup.length);
        this._scannerGroup.removeChildren(0, this._scannerGroup.length);
        for(let i  =0; i<this._gameGroup.length; i++) this._gameGroup[i].destroy();
        for(let i  =0; i<this._itemGroup.length; i++) this._itemGroup[i].destroy();
        for(let i  =0; i<this._scannerGroup.length; i++) this._scannerGroup[i].destroy();
    }


}