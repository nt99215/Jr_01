import GameConfig from "../data/GameConfig";
import AssetKey from "../data/AssetKey";
import SoundManager from "../manager/SoundManager";
import SoundAssetKey from "../data/SoundAssetKey";
import SeparateAnimation from "./object/SeparateAnimation";
import BackGroundTouchEffect from "../ui/effect/BackGroundTouchEffect";
import ScreenManager from "../loader/manager/ScreenManager";
import IntroEffect from "../ui/effect/IntroEffect";

let _objectArray = [{category:'ppiyo', xPos:857, yPos:343, key:AssetKey.INTRO_ASSET, total:2, fps:4},
    {category:'cart', xPos:74, yPos:355, key:AssetKey.INTRO_ASSET, total:2, fps:2},
];

let _imgArray = [
    {category:'cloudA', xPos:56, yPos:105, key:AssetKey.INTRO_ASSET},
    {category:'cloudB', xPos:1037, yPos:190, key:AssetKey.INTRO_ASSET},
];

export default class Intro {
    constructor(game, parent = null) {

        this._game = game;
        // this._dispatcher = dispatcher;
        this._parent = parent;
        this._gameGroup = this._game.add.group();
        this.starEffect = null;

        if(GameConfig.SCENE_STATE === 'intro') this._init();
    }

    _init() {

        //BG
        this.bg = new Phaser.Image(this._game, 0, 0, AssetKey.INTRO_ASSET, AssetKey.INTRO_BG);
        // this.bg.inputEnabled = true;
        this.bg.events.onInputDown.add( () => {
            BackGroundTouchEffect.instance.effect(this._game, this._game.input.x, this._game.input.y, 50, 1);
        });
        this._gameGroup.addChild(this.bg);
        this.bg.inputEnabled = true;

        //BUTTON
        this.startBtn = this._gameGroup.addChild(this._game.make.button(486, 543, AssetKey.BTN_ASSET, this._gameStart.bind(this), this, AssetKey.START_BUTTON, AssetKey.START_BUTTON, AssetKey.START_BUTTON));


        //OBJECT
        for(let obj in _imgArray)
        {
            let asset = 'intro_' + _imgArray[obj].category;
            let img = new Phaser.Image(this._game, _imgArray[obj].xPos, _imgArray[obj].yPos,_imgArray[obj].key, asset);
            this._gameGroup.addChild(img);
            img.anchor.setTo(0.5, 0.5);
            img.x += img.width/2;
            img.y += img.height/2;
            let rN = this._game.rnd.between(100, 300);
            this._game.add.tween(img.scale).to({x:0.9, y:0.9}, rN * 50, Phaser.Easing.Linear.None, true,  0, 1000, true);
            this._game.add.tween(img).to({x:img.x + rN}, rN * 100, Phaser.Easing.Linear.None, true,  0, 1000, true);
        }

        //TITLE

        let title = new Phaser.Image(this._game, 260, 11, AssetKey.INTRO_ASSET, 'intro_title');
        this._gameGroup.addChild(title);
        title.anchor.setTo(0.5, 0.5);
        title.x +=title.width/2;
        title.y +=title.height/2;
        this._game.add.tween(title.scale).to({x:1.02, y:1.02}, 1000, Phaser.Easing.Quartic.Out, true, 0, 10000, true);


        //ANIMATION
        for(let obj in _objectArray)
        {
            let asset = 'intro_' + _objectArray[obj].category + '_';
            // console.log(asset)
            let total = _objectArray[obj].total;
            let animal = new SeparateAnimation(this._game, _objectArray[obj].key, asset, _objectArray[obj].xPos, _objectArray[obj].yPos, 1, total, '', 0, _objectArray[obj].fps);
            this._gameGroup.addChild(animal);
            animal._play();
        }


    }


    /**
     * GAME START
     */
    _gameStart() {

        SoundManager.instance.allSoundPauseEnding();
        SoundManager.instance.effectSound(SoundAssetKey.START_SOUND);
        SoundManager.instance.effectSoundRemove(SoundAssetKey.GAME_INTRO);
        GameConfig.TUTORIAL_DISABLED = true;
        this.startBtn.input.enabled = false;
        this._game.time.events.add(1200, enabled, this);

        if(!this._game.device.desktop && this._game.device.fullscreen){
            ScreenManager.instance.fullScreen();
        }

        function enabled() {
            this._game.time.events.removeAll();
            // if(GameConfig.SCENE_STATE === 'intro') this._dispatcher.dispatch();
            GameConfig.TUTORIAL_DISABLED = false;
            this._parent._create();
        }

    }

    _destroy() {
        this._gameGroup.removeChildren(0, this._gameGroup.length);
        this._game.time.events.removeAll();
    }

}