import AssetKey from "../data/AssetKey";
import SeparateAnimation from "./object/SeparateAnimation";
import BackGroundTouchEffect from "../ui/effect/BackGroundTouchEffect";
import PhaseCompleteEffect from "../ui/effect/PhaseCompleteEffect";
import TutorialEndingEffect from "../ui/effect/TutorialEndingEffect";

export default class TutorialView extends Phaser.Group{
    constructor(game, assetNum, bgGroup, objectArray, imgArray, key) {
        super(game);
        this._game = game;
        this._gameGroup = game.add.group();
        this._effectGroup = game.add.group();
        this._aniGroup = game.add.group();
        this._num = assetNum;
        this._bgGroup = bgGroup;
        this._objectArray = objectArray;
        this._imgArray = imgArray;
        this.graphics = null;
        this.assetKey = null;
    }

    _init() {

        //BACK
        this.back = this._game.add.graphics(0, 0);
        this.back.beginFill(0x71838b, 1);
        this.back.drawRect(0, 0, 1280, 720);
        this.back.endFill();
        this.back.inputEnabled = true;
        this.back.events.onInputDown.add(this._effectAnimation, this);
        this._bgGroup.addChild(this.back);

        //BG
        this.assetKey = this._objectArray[0].key;
        let assetName = 'tutor_' + this._num + '_bg';
        let tutorialBg = new Phaser.Image(this._game, 0, 0, this.assetKey, assetName);
        this._bgGroup.addChild(tutorialBg);

        //EFFECT
        this._effectAnimation();

        //OBJECT
        for(let obj in this._objectArray)
        {
            let asset = 'tutor_' + this._num + '_' + this._objectArray[obj].category + '_';
            let object = new SeparateAnimation(this._game, this._objectArray[obj].key, asset, this._objectArray[obj].xPos, this._objectArray[obj].yPos, 1, this._objectArray[obj].totalFps, '', 0, this._objectArray[obj].fps);
            this._bgGroup.addChild(object);
            object._play();
            console.log(object.width)

            if(this._num === 5)
            {
                this._game.add.tween(object).to({x:object.x + 630}, 6000, Phaser.Easing.Linear.None, true);
            }
        }

        //IMAGE
        for(let obj in this._imgArray)
        {
            let asset = 'tutor_' + this._num + '_' + this._imgArray[obj].category;
            let object = new Phaser.Image(this._game, this._imgArray[obj].xPos, this._imgArray[obj].yPos, this._imgArray[obj].key, asset);
            this._bgGroup.addChild(object);

            if(this._num === 1)
            {
                object.anchor.setTo(0.5, 0.5);
                object.x += object.width/2;
                object.y += object.height/2;
                let rN = this._game.rnd.between(100, 300);
                this._game.add.tween(object.scale).to({x:0.9, y:0.9}, rN * 50, Phaser.Easing.Linear.None, true,  0, 1000, true);
                this._game.add.tween(object).to({x:object.x + rN}, rN * 100, Phaser.Easing.Linear.None, true,  0, 1000, true);
            }
        }

        //GUIDE TEXT
        let guideTextBg = new Phaser.Image(this._game, 265 , 29, this.assetKey, 'tutor_textbox_' + this._num);
        this._bgGroup.addChild(guideTextBg);

        let guideText = new Phaser.Image(this._game, 265 , 29, this.assetKey, 'tutor_text_' + this._num);
        this._bgGroup.addChild(guideText);


    }

    _effectAnimation() {

        // if(this._num !==4) return;
        // new TutorialEndingEffect(this._game, this.assetKey, 390, 360, this._bgGroup);

    }


    _destroy() {
        this._gameGroup.removeChildren(0, this._gameGroup.length);
        this._bgGroup.removeChildren(0, this._bgGroup.length);
        this._effectGroup.removeChildren(0, this._effectGroup.length);
        this._aniGroup.removeChildren(0, this._aniGroup.length);

    }

}