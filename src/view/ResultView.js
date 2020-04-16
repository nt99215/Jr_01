import AssetKey from "../data/AssetKey";
import GameConfig from "../data/GameConfig";
import SoundManager from "../manager/SoundManager";
import SoundAssetKey from "../data/SoundAssetKey";
import BackgroundEffect from "../ui/effect/BackgroundEffect.js";
import ConfigManager from "../manager/ConfigManager";
import SeparateAnimation from "./object/SeparateAnimation";
import BackGroundTouchEffect from "../ui/effect/BackGroundTouchEffect";
import WebEnabledCheck from "../util/WebEnabledCheck";

let _objectArray = [{category:'cart', xPos:45, yPos:337, key:AssetKey.RESULT_ASSET, fps:2},
    {category:'ppiyo', xPos:842, yPos:350, key:AssetKey.RESULT_ASSET, fps:3},
];

let _starArray = [{xPos:451, yPos:97, key:AssetKey.RESULT_ASSET},
    {xPos:583, yPos:75, key:AssetKey.RESULT_ASSET},
    {xPos:713, yPos:97, key:AssetKey.RESULT_ASSET},
];


export default class ResultView extends Phaser.Group{
    constructor(game, parent) {
        super(game);

        this._game = game;
        this._gameGroup = this._game.add.group();
        // this._dispatcher = dispatcher;
        this._parent = parent;

        GameConfig.POP_ENABLED = true;
        GameConfig.SCENE_STATE = "result";
        this.effect = null;
        this._init();
        this._webCheck();

    }

    _webCheck() {
        WebEnabledCheck.instance.backBtnEnabled(this.closeBtn);
    }

    _init() {

        // console.log("result");
        this.bg = new Phaser.Image(this._game, 0, 0, AssetKey.RESULT_ASSET, AssetKey.RESULT_BG);
       /* this.bg.inputEnabled = true;
        this.bg.events.onInputDown.add( () => {
            BackGroundTouchEffect.instance.effect(this._game, this._game.input.x, this._game.input.y, 50, 1);
        });*/
        this._gameGroup.addChild(this.bg);



        /**
         * BUTTON
         */
        this.closeBtn = this._gameGroup.add(this._game.make.button(0, 0,  AssetKey.BTN_ASSET, this._onClose.bind(this), this, AssetKey.BTN_CLOSE_DEFAULT, AssetKey.BTN_CLOSE_DEFAULT, AssetKey.BTN_CLOSE_OVER));
        this.closeBtn.x = this._game.width - this.closeBtn.width- 217;
        this.closeBtn.y = 178;
        this.closeBtnSound = null;
        this._buttonSndEnabled(SoundAssetKey.SND_CLOSE, this.closeBtnSound, this.closeBtn);

        this.restartBtn = this._gameGroup.add(this._game.make.button(0, 0,  AssetKey.BTN_ASSET, this._onRestart.bind(this), this, AssetKey.RETRY_BUTTON, AssetKey.RETRY_BUTTON, AssetKey.RETRY_BUTTON_OVER));
        this.restartBtn.x = 500;
        this.restartBtn.y = 495;
        this.restartBtnSound = null;
        this._buttonSndEnabled(SoundAssetKey.RESTART_SOUND, this.restartBtnSound, this.restartBtn);


       /* //STAR SET
        for(let obj in _starArray)
        {
            let asset = 'result_staron_' + Number(Number(obj) + 1);
            let star = new Phaser.Image(this._game, _starArray[obj].xPos, _starArray[obj].yPos, _starArray[obj].key, asset);
            this._gameGroup.addChild(star);
        }*/

        //TEXT
        // let text = new Phaser.Image(this._game, 406, 336, AssetKey.RESULT_ASSET, 'result_text');
        // this._gameGroup.addChild(text);

        //EFFECT
        this._effectInit();

        //ANIMATION
        this._characterAnimation();

    }

    _characterAnimation() {

        //JUNI & MONKEY
        for(let obj in _objectArray)
        {
            let asset = 'result_' + _objectArray[obj].category + '_';
            // console.log(asset)
            let animal = new SeparateAnimation(this._game, _objectArray[obj].key, asset, _objectArray[obj].xPos, _objectArray[obj].yPos, 1, 2, '', 0, _objectArray[obj].fps);
            this._gameGroup.addChild(animal);
            animal._play();
        }

    }


    _effectInit() {

        if(GameConfig.SCENE_STATE === "result")
        {

            /**
             *
             * CELEBARTION EFFECT
             * @type {BackgroundEffect}
             */
            this.effect = new BackgroundEffect(this._game);
            this.backGroup = new BackgroundEffect(this._game);
            this._gameGroup.addChild(this.backGroup);

            SoundManager.instance.allSoundPauseEnding();
            SoundManager.instance.effectSound(SoundAssetKey.RESULT_GOOD);


        }


    }

    _buttonSndEnabled(sndKey, snd, btn) {
        if(!GameConfig.SOUND_ENABLED) return;
        snd = this._game.add.audio(sndKey);
        btn.setDownSound(snd);

    }

    _onClose(){
        this._disabledBtn();
        this._game.time.events.add(400, close, this);
        // let str =location.href;
        // let idx = str.indexOf(GameConfig.CHECK_APP_STRING);
        function close() {
            // if(idx !== -1) top.location.href = GameConfig.APP_URL;
            // else window.history.back();
            top.location.href = GameConfig.APP_URL;
        }

    }


    _onRestart() {
        this._disabledBtn();
        this._game.time.events.add(1000, enabled, this);

        function enabled() {
            if(this.effect) this.effect._remove();
            SoundManager.instance.allSoundPauseEnding();
            this._gameGroup.removeChildren(0, this._gameGroup.length);
            ConfigManager.prototype.GAME_CONFIG_RESET();
            this._parent._create();
        }

    }

    _disabledBtn() {
        this.closeBtn.input.enabled = false;
        this.restartBtn.input.enabled = false;
    }

}