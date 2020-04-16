import GameConfig from "../../data/GameConfig";
import AssetKey from "../../data/AssetKey";

let _currentPhase, _hand, _handDummy, _circle, _circleDummy, _stX, _stY, _endX, _endY, _circleX, _circleY, _loop, _delay;
let posArr = ['',
    {situation: 'downtown', circleX:189, circleY:223, stX:398, stY:231, endX:398, endY:354, loop:true, delay:0},
    {situation: 'mountain', circleX:774, circleY:345, stX:913, stY:486, endX:244, endY:617, loop:true, delay:0},
    {situation: 'drive', circleX:204, circleY:140, stX:336, stY:268, endX:336, endY:268, loop:true, delay:0},
    {situation: 'supply', circleX:332, circleY:171, stX:458, stY:302, endX:125, endY:241, loop:true, delay:300},
    {situation: 'mountain_sub', circleX:509, circleY:268, stX:636, stY:332, endX:636, endY:547, loop:true, delay:0},
    {situation: 'drive_sub', circleX:581, circleY:231, stX:705, stY:343, endX:705, endY:600, loop:true, delay:700},

];


export default class UserGuideCircle {
    // constructor(game, group, circleX, circleY, stX = 0, stY = 0, endX = 0, endY = 0) {
    constructor(game, currentPhase, obj = null) {
        this._game = game;
        this._gameGroup = this._game.add.group();
        this.key = AssetKey.DEFAULT_GAME_ATLAS;
        this.posObj = obj;
        _currentPhase = currentPhase;
        if(obj === null)
        {
            _circleX = posArr[_currentPhase].circleX;
            _circleY = posArr[_currentPhase].circleY;
            _stX = posArr[_currentPhase].stX;
            _stY = posArr[_currentPhase].stY;
            _endX = posArr[_currentPhase].endX;
            _endY = posArr[_currentPhase].endY;
            _loop = posArr[_currentPhase].loop;
            _delay = posArr[_currentPhase].delay;
        }
        else if(this.posObj)
        {
            _circleX = this.posObj.circleX;
            _circleY = this.posObj.circleY;
            _stX = this.posObj.stX;
            _stY = this.posObj.stY;
            _endX = this.posObj.endX;
            _endY = this.posObj.endY;
            _loop = this.posObj.loop;
            _delay = this.posObj.delay;
        }


        // this.inputEnable = true;

        this.circleTween = null;
        this.handTween = null;
        this.handPopup = false;
        this._init();
        // this._dummy();


    }

    _dummy() {

        _handDummy = new Phaser.Image(this._game, 500, 200, this.key, 'guide_hand');
        this._gameGroup.addChild(_handDummy);
        _handDummy.inputEnabled = true;
        _handDummy.input.enableDrag();
        _handDummy.events.onDragUpdate.add(this._dragUpdate, this);

        _circleDummy = new Phaser.Image(this._game, 500, 400, this.key, 'guide_circle');
        this._gameGroup.addChild(_circleDummy);
        _circleDummy.inputEnabled = true;
        _circleDummy.input.enableDrag();
        _circleDummy.events.onDragUpdate.add(this._dragUpdate, this);
    }


    _init() {
        if(! GameConfig.GUIDE_ENABLED) return;
        _circle = new Phaser.Sprite(this._game, _circleX, _circleY, this.key, 'guide_circle');
        this._gameGroup.addChild(_circle);
        _hand = new Phaser.Image(this._game, _stX, _stY, this.key, 'guide_hand');
        this._gameGroup.addChild(_hand);

        this.circleTween = this._game.add.tween(_circle).to({ alpha:0.3}, 500, Phaser.Easing.Quartic.Out, true, 0, 1000, true);
        this.handTween = this._game.add.tween(_hand).to({ x:_endX, y:_endY}, 1000, Phaser.Easing.Quartic.Out, true, _delay, 1000, _loop);

        // this._inputEnable();

    }

    _guideSubPhase_3() {
        _circleX = posArr[_currentPhase].circleX;
        _circleY = posArr[_currentPhase].circleY;
        _stX = posArr[_currentPhase].stX;
        _stY = posArr[_currentPhase].stY;
        _endX = posArr[_currentPhase].endX;
        _endY = posArr[_currentPhase].endY;
        _loop = posArr[_currentPhase].loop;
        this._init();
    }


    _inputEnable() {

        if(! this.inputEnable) return;
        _circle.inputEnabled = true;
        _circle.input.enableDrag();
        _circle.events.onDragUpdate.add(this._dragUpdate, this);

        _hand.inputEnabled = true;
        _hand.input.enableDrag();
        _hand.events.onDragUpdate.add(this._dragUpdate, this);
    }

    _handAnimation(stX, stY, endX, endY) {

        if(! GameConfig.GUIDE_ENABLED) return;
        this._game.tweens.removeFrom(_hand);
        if(_circle) this._gameGroup.removeChild(_circle);
        _hand.alpha = 1;
        _hand.visible = true;
        _hand.x = stX;
        _hand.y = stY;
        _endX = endX;
        _endY = endY;
       this.handTween = this._game.add.tween(_hand).to({ x:_endX, y:_endY}, 1500, Phaser.Easing.Quartic.Out, true, 0, GameConfig.GUIDE_REPEAT_TIME, false);
        this.handTween.onComplete.add(()=> {
            this._objectDisabled();
        },100);

    }

    _objectDisabled() {
        if(! GameConfig.GUIDE_ENABLED) return;
        _circle.alpha = 0;
        _circle.visible = false;

        // if(! this.handPopup) return;
        _hand.alpha = 0;
        _hand.visible = false;


    }

    _objectEnabled() {
        if(! GameConfig.GUIDE_ENABLED) return;
        _circle.alpha = 1;
        _circle.visible = true;

        if(_hand.alpha === 1) _hand.visible = true;
    }



    _dragUpdate(obj) {
        console.log(parseInt(obj.x), ' : ', parseInt(obj.y));
    }

    _destroy() {
        if(_circle) this._game.tweens.removeFrom(_circle);
        if(_hand) this._game.tweens.removeFrom(_hand);
        this._gameGroup.removeChildren(0, this._gameGroup.length);
    }
}