import AssetKey from "../data/AssetKey";
import GameConfig from "../data/GameConfig";
import SoundAssetKey from "../data/SoundAssetKey";
import SoundManager from "./SoundManager";
import TutorialView from "../view/TutorialView";
import SceneManager from "./SceneManager";
import BackGroundTouchEffect from "../ui/effect/BackGroundTouchEffect";

let num;
const total = 5;
let currentAudio;
let _objectArray = [
    [
        {category:'ppiyo', xPos:459, yPos:206, key:AssetKey.TUTORIAL_ANIMATION_ASSET_1, totalFps:2, fps:4},
    ],
    [
        {category:'ppiyo', xPos:252, yPos:205, key:AssetKey.TUTORIAL_ANIMATION_ASSET_1, totalFps:2, fps:4},
    ],
    [
        {category:'ppiyo', xPos:182, yPos:218, key:AssetKey.TUTORIAL_ANIMATION_ASSET_1, totalFps:2, fps:4},
    ],
    [
        {category:'ppiyo', xPos:260, yPos:227, key:AssetKey.TUTORIAL_ANIMATION_ASSET_2, totalFps:2, fps:4},
    ],
    [
        {category:'ppiyo', xPos:103, yPos:245, key:AssetKey.TUTORIAL_ANIMATION_ASSET_2, totalFps:2, fps:4},
    ],

];

let _imgArray = [
    [
        {category:'cloudA', xPos:56, yPos:88, key:AssetKey.TUTORIAL_ANIMATION_ASSET_1},
        {category:'cloudB', xPos:1037, yPos:173, key:AssetKey.TUTORIAL_ANIMATION_ASSET_1},
    ],
    [
        {category:'cart', xPos:530, yPos:326, key:AssetKey.TUTORIAL_ANIMATION_ASSET_1},
    ],
    [
        {category:'cart', xPos:530, yPos:326, key:AssetKey.TUTORIAL_ANIMATION_ASSET_1},
        {category:'Xmark', xPos:54, yPos:182, key:AssetKey.TUTORIAL_ANIMATION_ASSET_1},
    ],
    [
        {category:'cart', xPos:530, yPos:466, key:AssetKey.TUTORIAL_ANIMATION_ASSET_2},
    ],
    [

    ]

];

export default class TutorialManager extends Phaser.Group{
    constructor(game, parent) {
        super(game);

        this.assetKey = AssetKey.BTN_ASSET;
        this._game = game;
        this._bgGroup = this._game.add.group();
        this._gameGroup = this._game.add.group();
        // this._container = container;
        this._parent = parent;
        this._chapter = null;
        num = 1;

        for(let i = 1; i<=total; i++)
        {
            this['_audio_' + i] = null;
            this['_audio_' + i] = game.add.audio(SoundAssetKey['tutorNarr_' + i], 0.7, false);
        }

        this._createTutorial(num);
        this._createBtn();
        this._btnAlign(num);
        this._sndPlay(num);

    }

    _createBtn() {

        /**
         * PrevBtn
         * @type {Phaser.Image}
         */
        this.prevBtn = this._gameGroup.add(this._game.make.button(0, 0,  this.assetKey, this.onPrev.bind(this), this, AssetKey.BTN_TUTORIAL_PREV_DEFAULT, AssetKey.BTN_TUTORIAL_PREV_DEFAULT, AssetKey.BTN_TUTORIAL_PREV_OVER));
        this.prevBtn.x = 24;
        this.prevBtn.y = this._game.height -this.prevBtn.height - 9;
        this.prevBtnSound = null;
        this._buttonSndPlay(SoundAssetKey.SND_PREV, this.prevBtnSound, this.prevBtn)

        /**
         * NextBtn
         * @type {Phaser.Image}
         */
        this.nextBtn = this._gameGroup.add(this._game.make.button(0, 0,  this.assetKey, this.onNext.bind(this), this, AssetKey.BTN_TUTORIAL_NEXT_DEFAULT, AssetKey.BTN_TUTORIAL_NEXT_DEFAULT, AssetKey.BTN_TUTORIAL_NEXT_OVER));
        this.nextBtn.x = this._game.width - this.nextBtn.width - 24;
        this.nextBtn.y = this._game.height -this.nextBtn.height - 9;
        this.nextBtnSound = null;
        this._buttonSndPlay(SoundAssetKey.SND_NEXT, this.nextBtnSound, this.nextBtn)

        /**
         * SkipBtn
         * @type {Phaser.Image}
         */
        this.skipBtn = this._gameGroup.add(this._game.make.button(0, 0,  this.assetKey, this.onSkip.bind(this), this, AssetKey.BTN_TUTORIAL_SKIP_DEFAULT, AssetKey.BTN_TUTORIAL_SKIP_DEFAULT, AssetKey.BTN_TUTORIAL_SKIP_OVER));
        this.skipBtn.x = this.nextBtn.x - this.skipBtn.width - 9;
        this.skipBtn.y = this._game.height -this.skipBtn.height - 9;
        this.skipBtnSound = null;
        this._buttonSndPlay(SoundAssetKey.SND_SKIP, this.skipBtnSound, this.skipBtn)

        /**
         * StartBtn
         * @type {Phaser.Image}
         */
        this.startBtn = this._gameGroup.add(this._game.make.button(0, 0,  this.assetKey, this.onStart.bind(this), this, AssetKey.BTN_TUTORIAL_START_DEFAULT, AssetKey.BTN_TUTORIAL_START_DEFAULT, AssetKey.BTN_TUTORIAL_START_OVER));
        this.startBtn.x = this._game.width - this.startBtn.width - 24;
        this.startBtn.y = this._game.height -this.startBtn.height - 9;
        this.startBtnSound = null;
        this._buttonSndPlay(SoundAssetKey.START_SOUND, this.startBtnSound, this.startBtn)

    }

    _buttonSndPlay(sndKey, snd, btn) {
        if(!GameConfig.SOUND_ENABLED) return;
        snd = this._game.add.audio(sndKey);
        btn.setDownSound(snd);

    }


    _sndPlay(num) {
        if(! GameConfig.SOUND_ENABLED || num>total) return;
        let str ='_audio_' + num;
        currentAudio = this[str];
        currentAudio.play();
        currentAudio.onStop.add(this.onNext, this);

    }


    onPrev() {
        // this._game.time.events.removeAll();
        num -=1;
        this._btnAlign(num);
        if(currentAudio)
        {

            currentAudio.onStop.removeAll();
            currentAudio.stop();
        }


        this._sndPlay(num);
        this._createTutorial(num);

    }


    onNext() {
        if(num<total)
        {

            num +=1;
            this._btnAlign(num);
            if(currentAudio)
            {

                currentAudio.onStop.removeAll();
                currentAudio.stop();
            }


            this._sndPlay(num);
            this._createTutorial(num);

        }


    }

    onStart() {

        /**
         *
         * GAME START FROM TUTORIAL
         */


        this._disabledBtn();
        this._game.time.events.add(1300, enabled, this);

        function enabled() {

            SoundManager.instance.allSoundPause();
            if(GameConfig.SCENE_STATE === 'intro')
            {
                // this._container.dispatch();
                this._parent._create();
            }
            // this._game.time.events.removeAll();
            this._destroy();
        }

    }

    onSkip() {

        this._disabledBtn();
        this._game.time.events.add(1000, enabled, this);

        function enabled() {
            SoundManager.instance.allSoundPause();
            // this._game.time.events.removeAll();
            this._destroy();
        }

    }


    _btnAlign(num) {

        switch (num) {
            case 1:
            {

                this.prevBtn.visible = false;
                this.startBtn.visible = false;
                break;
            }
            case 2:
            {

                this.prevBtn.visible = true;
                break;
            }
            case 3:
            {
                this.nextBtn.visible = true;
                this.startBtn.visible = false;
                break;
            }
            case 4:
            {
                this.nextBtn.visible = true;
                this.startBtn.visible = false;
                break;
            }

            case 5:
            {
                this.nextBtn.visible = false;
                this.startBtn.visible = true;
                break;
            }

        }
    }

    _createTutorial(currentNum) {


        if(this._chapter) this._chapter._destroy();
        let key = AssetKey.TUTORIAL_ANIMATION_ASSET_1;
        if(currentNum>=4) key = AssetKey.TUTORIAL_ANIMATION_ASSET_2;

        this._chapter = new TutorialView(this._game, currentNum, this._bgGroup, _objectArray[currentNum - 1], _imgArray[currentNum - 1], key);
        // this._gameGroup.addChild(this._chapter);
        this._chapter._init();

    }


    _disabledBtn() {

        this.prevBtn.input.enabled = false;
        this.nextBtn.input.enabled = false;
        this.skipBtn.input.enabled = false;
        this.startBtn.input.enabled = false;

        if(currentAudio)
        {
            currentAudio.onStop.removeAll();
            currentAudio.stop();
        }

        this._game.time.events.removeAll();
    }

    _destroy() {

        // this._game.remove([this.skipBtn, this.prevBtn, this.nextBtn, this.startBtn, this.skipBtn], true);

        if(this._chapter) this._chapter._destroy();
        SceneManager.instance._restore();
        this._gameGroup.removeChildren(0, this._gameGroup.length);
        this._gameGroup.destroy();

    }


}