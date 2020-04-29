import SoundManager from "./manager/SoundManager";
import SceneManager from "./manager/SceneManager";
import SoundAssetKey from "./data/SoundAssetKey";
import GameConfig from "./data/GameConfig";
import Controller from "./ui/Controller";
import Intro from "./view/Intro";
import CornerManager from "./manager/CornerManager";
import ResultView from "./view/ResultView";
import BackGroundTouchEffect from "./ui/effect/BackGroundTouchEffect";
import WebEnabledCheck from "./util/WebEnabledCheck";
import ConfigManager from "./manager/ConfigManager";
import ScreenManager from "./loader/manager/ScreenManager";
import PauseDimmed from "./view/object/PauseDimmed";


export default class JuniverMart extends Phaser.Sprite{
    constructor(game, x, y) {
        super(game, x, y);
        this._game =  game;
        this._game.input.maxPointers = 1;

        /**
         * Manager add
         *
         */
        // new SoundManager(this._game);
        new SceneManager(this._game);
        new BackGroundTouchEffect(this._game);
        new WebEnabledCheck(this._game);
        new PauseDimmed(this._game);

        if(! this.game.device.desktop && this.game.device.fullScreen)
        this.game.input.onTap.add(ScreenManager.instance.fullScreen, this);

    }

    update() {

        if(! GameConfig.IN_GAME || GameConfig.POP_ENABLED) return;

        if(this._objectManager)
        {
            let elapsed = this._game.time.elapsedMS / (500 / this._game.time.desiredFps);
            //if(elapsed > 2) return;
            this._objectManager._update(elapsed);
        }

        if(GameConfig.GAME_FINISH)
        {
            ConfigManager.prototype.GAME_OVER();
            this._gameOver();
        }
        // console.log("update");
    }

    _startViewInit() {

        if(GameConfig.GAME_RESET) this._gameOver();

        GameConfig.SCENE_STATE = 'intro';
        this._introBg = new Intro(this._game, this);
        // this._introBg = new ResultView(this._game, this);
        // this._introBg = new ChapterCompleteAnimation(this._game, 4);
        GameConfig.CURRENT_SCENE = this._introBg;
        this._mainController = new Controller(this._game, this);
        GameConfig.MAIN_CONTROLLER = this._mainController;
        SoundManager.instance.intro(SoundAssetKey.GAME_INTRO, false);

    }

    _create() {

        GameConfig.SCENE_STATE = 'mainScene';
        SoundManager.instance.allSoundPause();

        this._mainController._destroy();
        this._createBG();
        this._createBgm();

    }


    _createBG() {

        if(this._introBg)
        {
            this._introBg._destroy();
            this._introBg = null;
        }

        this._objectManager = new CornerManager(this._game, this);
        GameConfig.CURRENT_SCENE = this._objectManager;

    }

    _createController(backButtonEnable) {
        if(this._controller) this._controller._destroy();
        this._controller = new Controller(this._game, this, backButtonEnable);
        GameConfig.MAIN_CONTROLLER = this._controller;
    }

    _createBgm() {
        // SoundManager.instance.allSoundPause();
        if(! GameConfig.POP_ENABLED && GameConfig.SOUND_ENABLED)
        {
            SoundManager.instance.effectSoundStop(SoundAssetKey.MAIN_BGM, GameConfig.BGM_VOLUME,  true, false);
        }

    }

    _update() {

      /*  if(this._objectManager)
        {
            let elapsed = this._game.time.elapsedMS / (500 / this._game.time.desiredFps);
            //if(elapsed > 2) return;
            this._objectManager._update(elapsed);
        }*/
    }

    _gameOver() {

        GameConfig.SCENE_STATE = 'result';

        if(this._controller)
        {
            this._controller._btnDisabled();
            this._controller.removeAll(true);
            this._controller.destroy(true);
            this._controller = null;
        }
        new ResultView(this._game, this);

    }


}