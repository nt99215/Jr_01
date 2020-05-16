import GameConfig from "../../../data/GameConfig";
import SoundManager from "../../../manager/SoundManager";
import SoundAssetKey from "../../../data/SoundAssetKey";
import PauseDimmed from "../../object/PauseDimmed";

let _totalPriceArr = [];
let _currentPriceArr = [];
let _xPosArr = [482, 442, 402, 351, 310];
let _yPos = [62, 216];
let _dotPos = [101, 255];
const maxPrice = 100000;
export default class PriceCount {
    constructor(game, group, posGroup, key) {
        this._game = game;
        this._gameGroup = group;
        this._posGroup = posGroup;
        this._key = key;
        this._init();
        this._count(0);

        PauseDimmed.instance._destroy();
        PauseDimmed.instance._init(this._game.add.group());
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

        if(num >= maxPrice) return;
        let totalAmount = num.toString();

        this._posGroup.removeChildren(0, this._posGroup.length);
        for(let i = 0; i < _currentPriceArr.length; i++)  _currentPriceArr.splice(i, 1);
        for(let i  =0; i<this._posGroup.length; i++) this._posGroup[i].destroy();

        for (let i = 0; i < totalAmount.length; i++)
        {
            let num = String(totalAmount).substr((totalAmount.length - 1) - i, 1)
            _currentPriceArr.push(num);
            let asset = 'payNumber_' + num;
            let img = new Phaser.Image(this._game, _xPosArr[i], _yPos[1], this._key, asset);
            this._posGroup.addChild(img);
            img.anchor.setTo(0, 1);
            img.y += img.height;
            img.scale.setTo(1, 0.2 + i/10);
            let duration = i * 100 + 200;
            this._game.add.tween(img.scale).to({y:1}, duration, Phaser.Easing.Quartic.Out, true, 0);
        }

        if(num >= 1000)
        {
            let dot = new Phaser.Image(this._game, 386, _dotPos[1], this._key, 'payment_dot');
            this._posGroup.addChild(dot);
        }


    }

}