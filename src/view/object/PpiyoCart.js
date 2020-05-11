import AssetKey from "../../data/AssetKey";
import SeparateAnimation from "./SeparateAnimation";
import FilledObject from "./FilledObject";

let _effectAssetArr;
const _heartAsset = [
    {asset:'effect_heart_blue', xPos:91, yPos:408, resultXPos:28, resultYPos:352},
    {asset:'effect_heart_red', xPos:115, yPos:413, resultXPos:118, resultYPos:358},
    {asset:'effect_heart_yellow', xPos:118, yPos:440, resultXPos:96, resultYPos:416}
];
export default class PpiyoCart{
    constructor(game,group) {
        this._game = game;
        this._filledGroup = this._game.add.group();
        this._gameGroup = this._game.add.group();
        this._key = AssetKey.SLIDE_BAR_PPIYO;
        this._fillObject = null;

        _effectAssetArr = [];
        this._init();
    }

    _init() {

        this._ppiyoCart();
        this._fillObject =  new FilledObject(this._game, this._filledGroup);
    }


    _ppiyoCart() {

        this.ppiyoHead = new SeparateAnimation(this._game, this._key, 'slide_ppiyo_', 86, 398, 1, 4, '', 0, 6, true);
        this._gameGroup.addChild(this.ppiyoHead);
        this.ppiyoHead._play();

        this.ppiyoBody = new Phaser.Image(this._game, 393, 619, this._key, 'slide_ppiyo_body_cut');
        this._gameGroup.addChild(this.ppiyoBody);

        this.ppiyoCorrect = new Phaser.Image(this._game, 86, 398, this._key, 'slide_ppiyo_correct');
        this._gameGroup.addChild(this.ppiyoCorrect);
        this.ppiyoCorrect.visible = false;

        this.ppiyoIncorrect = new Phaser.Image(this._game, 86, 398, this._key, 'slide_ppiyo_incorrect');
        this._gameGroup.addChild(this.ppiyoIncorrect);
        this.ppiyoIncorrect.visible = false;

        this.xMark = new Phaser.Image(this._game, 142, 493, this._key, 'xMark');
        this._gameGroup.addChild(this.xMark);
        this.xMark.anchor.setTo(1, 1);
        this.xMark.scale.setTo(0.8,0.8);
        this.xMark.visible = false;

        for(let i =0; i<_heartAsset.length; i++)
        {
            let img = new Phaser.Image(this._game, _heartAsset[i].resultXPos, _heartAsset[i].resultYPos, this._key, _heartAsset[i].asset);
            this._gameGroup.addChild(img);
            _effectAssetArr.push(img);
            img.alpha = 0;
            img.visible = false;
        }


        this.hitArea = this._game.add.graphics(433, 620);
        this.hitArea.beginFill(0x000, 0);
        this.hitArea.drawRect(0, 0, 290, 100);
        this.hitArea.endFill();
        // this.hitArea.visible = false;
        this._gameGroup.addChild(this.hitArea);
        // this.hitArea.inputEnabled = true;
        // this.hitArea.input.enableDrag();
        // this.hitArea.events.onDragUpdate.add(this._startDrag, this);

    }

    _visible(bool) {

        this._gameGroup.visible = bool;
        this._filledGroup.visible = bool;
        // if(this._fillObject) this._fillObject.objectVisible(bool);
    }

    _startDrag(obj) {
        console.log(parseInt(obj.x), parseInt(obj.y));
    }

    feedBackPopUp(correct) {
        if(correct)
        {
            this.ppiyoHead.visible = false;
            this.ppiyoCorrect.visible = true;
            for(let i =0; i<_effectAssetArr.length; i++)
            {
                _effectAssetArr[i].scale.setTo(0.2, 0.2);
                _effectAssetArr[i].alpha = 0;
                _effectAssetArr[i].visible = true;
                _effectAssetArr[i].x = _heartAsset[i].xPos;
                _effectAssetArr[i].y = _heartAsset[i].yPos;
                let duration  = this._game.rnd.between(150, 400);
                this._game.add.tween(_effectAssetArr[i].scale).to({x:1, y:1}, duration, Phaser.Easing.Quartic.Out, true);
                let tw = this._game.add.tween(_effectAssetArr[i]).to({x:_heartAsset[i].resultXPos, y:_heartAsset[i].resultYPos, alpha:1}, duration, Phaser.Easing.Quartic.Out, true);
                tw.onComplete.add(()=> {
                    this._game.add.tween(_effectAssetArr[i]).to({alpha : 0}, 200, Phaser.Easing.Quartic.Out, true);
                    this.ppiyoHead.visible = true;
                    this.ppiyoCorrect.visible = false;

                })
            }

            //FILLED OBJECT
            this._objectFill();
        }
        else
        {
            this.ppiyoHead.visible = false;
            this.ppiyoIncorrect.visible = true;
            this.xMark.scale.setTo(0.2, 0.2);
            this.xMark.alpha = 1;
            this.xMark.visible = true;
            let tw = this._game.add.tween(this.xMark.scale).to({x:0.8, y:0.8}, 300, Phaser.Easing.Bounce.Out, true);
            tw.onComplete.add(()=> {
                this._game.add.tween(this.xMark).to({alpha : 0}, 200, Phaser.Easing.Quartic.Out, true);
                this.ppiyoHead.visible = true;
                this.ppiyoIncorrect.visible = false;
            })
        }

    }

    _objectFill() {

        if(this._fillObject) this._fillObject.filledObject();
    }

    _destroy() {
        this._gameGroup.removeChildren(0, this._gameGroup.length);
        this.ppiyoHead._destroy();
        this.ppiyoBody.destroy();
        this.hitArea.destroy();
    }

}