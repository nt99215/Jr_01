import AssetKey from "../../data/AssetKey";
import GameConfig from "../../data/GameConfig";

const _xPos = [410, 480, 550, 620];
const _yPos = [610, 690];
const _bottomMax = _xPos.length;
let _objectArr, _count;
const _maxCount = 4;
export default class FilledObjectBack {
    constructor(game, group) {
        this._game = game;
        this._gameGroup = group;
        this._key = AssetKey.SLIDE_BAR_PPIYO;
        this._takeDown = false;
        _objectArr = [];
        _count = 0;
        this._init();
    }

    _init() {


    }

    filledObject() {


        if(_count >= _maxCount)
        {
            this._objectTakeDown();
            _count = 0;
        }
        let asset = 'filled_' + GameConfig.CURRENT_FILL_OBJECT;
        let xPos = _xPos[_count];
        let img = new Phaser.Image(this._game, xPos, this._game.world.height, this._key, asset);
        img.y = _yPos[0];
        img.scale.setTo(1.3, 1.3);
        this._gameGroup.addChild(img);
        _objectArr.push(img);

        // console.log('count : ', _count);
        // img.inputEnabled = true;
        // img.input.enableDrag();
        // img.events.onDragUpdate.add(this._startDrag, this);

        _count++;

    }

    _objectTakeDown() {
        for(let i = 0; i<_objectArr.length; i++)
        {
            let obj = _objectArr[i];
            this._game.add.tween(obj).to({y: _yPos[1]}, 300, Phaser.Easing.Quartic.Out, true);
        }
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
        if(_count > _bottomMax) yPos = _yPos[0] + term;
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