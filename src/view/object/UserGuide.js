import GameConfig from "../../data/GameConfig";
import AssetKey from "../../data/AssetKey";

let _hand, _handDummy, _circle, _circleEnabled, _count, _total, _part;
let _stX, _stY, _endX, _endY, _angle, _category, _circleX, _circleY, _circleScale;

let _posArr = []

export default class UserGuide {
    constructor(game, category, group, body = false, stX = 0, stY = 0, endX = 0, endY = 0, angle = 0, circleX = 0, circleY = 0, circleScale = 1) {
        this._game = game;
        // this._gameGroup = this._game.add.group();
        this._gameGroup = group;
        this.key = AssetKey.DEFAULT_GAME_ATLAS;
        _category = category;
        _part = body;
        _stX = stX;
        _stY = stY;
        _endX = endX;
        _endY = endY;
        _angle = angle;
        _circleX = circleX;
        _circleY = circleY;
        _circleScale = circleScale;
        _count = 0;
        _total = 3;
        this._init();
        // this._dummy();
        // console.log(_category, _circleX, _circleY);

    }

    _dummy() {
        _handDummy = new Phaser.Image(this._game, 500, 400, this.key, 'guide_hand');
        _handDummy.inputEnabled = true;
        _handDummy.input.enableDrag();
        _handDummy.events.onDragUpdate.add(this._dragUpdate, this);
        this._gameGroup.addChild(_handDummy);
    }

    _init() {
        if(! GameConfig.GUIDE_ENABLED) return;

        if(_part) this._circleForStethscope();
        else this._circleForThermometer();


        _hand = new Phaser.Image(this._game, _stX, _stY, this.key, 'guide_hand');
        this._gameGroup.addChild(_hand);
        this._objectAnimation();

        if(! _circleEnabled) return;
        _circle = new Phaser.Sprite(this._game, _circleX, _circleY, this.key, 'guide_circle');
        this._gameGroup.addChild(_circle);



    }

    _circleForStethscope() {
        let asset =  'area_' +_category + '_body';
        let circle = new Phaser.Sprite(this._game, 0, 0, AssetKey.DEFAULT_GAME_ATLAS, asset);
        circle.x = _circleX;
        circle.y = _circleY;
        circle.scale.setTo(_circleScale, _circleScale);
        circle.alpha = 0;
        this._gameGroup.addChild(circle);
        this._game.add.tween(circle).to({alpha:1}, 500, Phaser.Easing.Quartic.Out, true, 300, 100, true);
        circle.inputEnabled = true;
        circle.input.enableDrag();
        circle.events.onDragUpdate.add(this._dragUpdate, this);
    }
    _circleForThermometer() {

        for(let i=1; i<_circleX.length+1; i++)
        {
            let asset =  'area_' +_category + '_0' + i;
            let circle = new Phaser.Sprite(this._game, 0, 0, AssetKey.DEFAULT_GAME_ATLAS, asset);
            circle.x = _circleX[i-1];
            circle.y = _circleY[i-1];
            circle.scale.setTo(_circleScale, _circleScale);
            circle.alpha = 0;
            this._gameGroup.addChild(circle);
            this._game.add.tween(circle).to({alpha:1}, 500, Phaser.Easing.Quartic.Out, true, 300, 100, true);
            circle.inputEnabled = true;
            circle.input.enableDrag();
            circle.events.onDragUpdate.add(this._dragUpdate, this);
        }

    }

    _objectAnimation() {
        let tw = this._game.add.tween(_hand).to({x:_endX, y:_endY}, 1500, Phaser.Easing.Quartic.Out, true, 0, 2, false);
        tw.onComplete.add(() => {
            // _hand.visible = false;
            // this._destroy();
        });
    }


    _dragUpdate(obj) {
        console.log(parseInt(obj.x), ' : ', parseInt(obj.y));
    }

    _destroy() {
        this._game.tweens.removeFrom(_hand);
        this._gameGroup.removeChildren(0, this._gameGroup.length);
    }
}