import AssetKey from "../../data/AssetKey";
import GameConfig from "../../data/GameConfig";

const _yPos = [580, 670, 760];
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
        let xPos = this._game.rnd.between(400, 580);
        let yPos = this._yPosition(_count);
        let img = new Phaser.Image(this._game, xPos, yPos, this._key, asset);
        this._gameGroup.addChild(img);
        _objectArr.push(img);

        console.log('count : ', _count);
        img.inputEnabled = true;
        img.input.enableDrag();
        img.events.onDragUpdate.add(this._startDrag, this);
    }

    _yPosition(){

        let rN = this._game.rnd.between(-5, 5);
        let yPos = _yPos[1];
        if(_count > 8 && _count <= 16) yPos = _yPos[0];
        else if(_count > 16) yPos = _yPos[0];

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