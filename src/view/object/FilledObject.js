import AssetKey from "../../data/AssetKey";
import GameConfig from "../../data/GameConfig";

const _yPos = [600, 670, 760];
const _minimumX = 390;
const _maximumX = 580;
let _objectArr, _count;
export default class FilledObject {
    constructor(game, group) {
        this._game = game;
        this._gameGroup = group;
        this._key = AssetKey.SLIDE_BAR_PPIYO;
        _objectArr = [];
        _count = 0;
        this._init();
    }

    _init() {


    }

    filledObject() {

        _count++;
        let asset = 'filled_' + GameConfig.CURRENT_FILL_OBJECT;
        let xPos = this._xPosition();
        let img = new Phaser.Image(this._game, xPos, this._game.world.height, this._key, asset);
        img.y = this._yPosition(img);
        this._gameGroup.addChild(img);
        _objectArr.push(img);

        // console.log('count : ', _count);
        // img.inputEnabled = true;
        // img.input.enableDrag();
        // img.events.onDragUpdate.add(this._startDrag, this);
    }

    _xPosition() {
        let xPos = this._game.rnd.between(400, 580);
        if(_count <= 8) xPos = this._game.rnd.between(430, 550);
        return xPos;
    }

    _yPosition(obj){

        let rN = this._game.rnd.between(-5, 5);
        let term = 100 - obj.height;
        let yPos = _yPos[1];
        if(_count > 8) yPos = _yPos[0] + term;
        return yPos + rN;
    }

    objectVisible(visible) {

        for(let i = 0; i<_objectArr.length; i++) _objectArr[i].visible = visible;
    }

    _startDrag(obj) {
        console.log(parseInt(obj.x), parseInt(obj.y));
    }

    _destroy() {
        this._gameGroup.removeChildren(0, this._gameGroup.length);
    }



}