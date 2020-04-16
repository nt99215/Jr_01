import GameConfig from "../../data/GameConfig";
import SoundManager from "../../manager/SoundManager";
import SoundAssetKey from "../../data/SoundAssetKey";
import UserGuideCircle from "../object/UserGuideCircle";
import Categories from "../../data/Categories";
import AssetKey from "../../data/AssetKey";
import CornerButton from "../object/CornerButton";
import Corner from "./Corner";

const _categoryArr= ['',
    Categories.VEGETABLE,
    Categories.SEAFOOD,
    Categories.MEAT,
    Categories.NECESSARY,
    Categories.DAIRY,
    Categories.SNACK,
    Categories.COUNTER,
];
let _btnArr;

export default class CornerMain{
    constructor(game, parent) {
        this._game = game;
        this._bgGroup = null;
        this._gameGroup = null;
        this._buttonGroup = null;
        this._parent = parent;
        this._key = AssetKey.MAIN_DISPLAY_ASSET;
        this._corner = null;
        this._backButton = null;
        this._cornerPop = false;
        _btnArr = [null];

    }

    _setting(bgGroup, gameGroup, buttonGroup) {
        this._bgGroup = bgGroup;
        this._gameGroup = gameGroup;
        this._buttonGroup = buttonGroup;

        this.bgRect = this._game.add.graphics(0, 0);
        this.bgRect.beginFill(0xfcf183, 1);
        this.bgRect.drawRect(0, 0, 1280, 720);
        this.bgRect.endFill();
        this._bgGroup.addChild(this.bgRect);

        for(let i = 1; i<_categoryArr.length; i++)
        {
            let asset = _categoryArr[i].category;
            let xPos = _categoryArr[i].displayPosition.xPos;
            let yPos = _categoryArr[i].displayPosition.yPos;

            let btn = new CornerButton(this._game, this._buttonGroup, asset, xPos, yPos, this, i);
            _btnArr.push(btn);
        }

        //CONTROLLER RESET
        this._parent._createController();

        //CREATE BACK BUTTON
        this._createBackButton();

        //CORNER  BUTTON INIT
        this._cornerButtonEnable(true);

    }


    _cornerGenerate(num) {

        if(GameConfig.SOUND_ENABLED) SoundManager.instance.effectSoundStop(SoundAssetKey.MAIN_BGM, GameConfig.BGM_VOLUME,  true, false);


        this._cornerButtonEnable(false);
        this._removeCorner();
        this._corner = new Corner(this._game, this._bgGroup, this._gameGroup, _categoryArr[num]);
        this._backButton.visible = true;
        this._cornerPop = true;
    }

    _createBackButton() {
        let base = 'btn_mainDisplay_default';
        let over = 'btn_mainDisplay_over';
        this._backButton = this._buttonGroup.add(this._game.make.button(890, 604,  this._key, this._removeCorner.bind(this), this, over, base, base));
        this.soundOffBtnSound = null;
        this._buttonSndPlay(SoundAssetKey.BASIC_TOUCH_SOUND, this.soundOffBtnSound, this._backButton);
        this._backButton.visible = false;
    }


    _cornerButtonEnable(bool) {

        for(let i = 1; i<_btnArr.length; i++) _btnArr[i]._visible(bool);

        //COUNTER BUTTON INVISIBLE
        _btnArr[_btnArr.length - 1]._btn.visible = false;

        this._cornerPop = false;
        this._backButton.visible = false;
    }

    _removeCorner() {

        if(this._corner) this._corner._destroy();
        if(this._cornerPop) this._cornerButtonEnable(true);
    }

    _buttonSndPlay(sndKey, snd, btn) {
        snd = this._game.add.audio(sndKey);
        btn.setDownSound(snd);
    }


    _update() {

    }

    _objectPause() {
        for(let i=0; i<this._gameGroup.length; i++)
        {
            this._gameGroup.children[i].visible = false;
        }

       /* for(let i=0; i<animalObjArr.length; i++)
        {
            animalObjArr[i]._gameGroup.visible = false;
        }*/

        //GUIDE VIEW
        // if(this.userGuide) this.userGuide._objectPause();
    }

    _objectReplay() {
        for(let i=0; i<this._gameGroup.length; i++)
        {
            this._gameGroup.children[i].visible = true;
        }
/*
        for(let i=0; i<animalObjArr.length; i++)
        {
            animalObjArr[i]._gameGroup.visible = true;
        }*/

        SoundManager.instance.effectSoundStop(SoundAssetKey.MAIN_BGM, GameConfig.MUTE_SOUND_VOLUME, true);
        //GUIDE VIEW
        // if(this.userGuide) this.userGuide._objectReplay();
    }

    _destroy() {
        this._gameGroup.removeChildren(0, this._gameGroup.length);
     /*   for(let i=0; i<animalObjArr.length; i++)
        {
            animalObjArr[i]._destroy();
        }*/
    }

}
