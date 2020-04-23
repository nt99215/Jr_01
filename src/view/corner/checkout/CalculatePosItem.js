
let _xPos, _yPos;
export default class CalculatePosItem {
    constructor(game, group, key, asset, xPos, yPos) {
        this._game = game;
        this._gameGroup = group;
        this._key = key;
        this._asset = asset;
        this.item = null;
        this.checkOut = false;
        _xPos = xPos;
        _yPos = yPos;
        this._init();
    }

    _init() {
        this.item = new Phaser.Image(this._game, _xPos, _yPos, this._key, this._asset);
        this._gameGroup.addChild(this.item);
    }


    _destroy() {
        this._gameGroup.removeChildren(0, this._gameGroup.length);
        for(let i  =0; i<this._gameGroup.length; i++) this._gameGroup[i].destroy();
    }

}