import GameConfig from "../../data/GameConfig";
import SoundManager from "../../manager/SoundManager";
import SoundAssetKey from "../../data/SoundAssetKey";
import Categories from "../../data/Categories";
import AssetKey from "../../data/AssetKey";
import CornerButton from "../object/CornerButton";
import Corner from "./Corner";
import PpiyoCart from "../object/PpiyoCart";
import PurchaseSlider from "./purchase/PurchaseSlider";
import PurchaseList from "./purchase/PurchaseList";

const _categoryArr= ['',
    Categories.VEGETABLE,
    Categories.SEAFOOD,
    Categories.MEAT,
    Categories.NECESSARY,
    Categories.DAIRY,
    Categories.SNACK,
    Categories.NOTYET,
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
        this._ppiyoCart = null;
        this._backButton = null;
        this._cornerPop = false;
        this._purchaseSlide = null;
        this._shoppingComplete = false;
        _btnArr = [null];
        this._sndPlay();

    }

    _sndPlay() {
        SoundManager.instance.effectSound(SoundAssetKey.guideNarr_2);
        GameConfig.CURRENT_GUIDE_SOUND = SoundAssetKey.guideNarr_2;
    }

    _setting(bgGroup, gameGroup, buttonGroup) {

        // SoundManager.instance.effectSoundStop(GameConfig.CURRENT_GUIDE_SOUND, 0, false, true);

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

            let dummy = asset === 'notYet';
            let btn = new CornerButton(this._game, this._buttonGroup, asset, xPos, yPos, this, i, dummy);
            _btnArr.push(btn);
        }

        //CREATE BACK BUTTON
        this._createBackButton();

        //CORNER  BUTTON INIT
        this._cornerButtonEnable(true);

        //PURCHASE SLIDE
        this._purchaseSlidePop();

        //CONTROLLER RESET
        this._parent._createController();

    }


    _cornerGenerate(num) {

        if(GameConfig.SOUND_ENABLED) SoundManager.instance.effectSoundStop(SoundAssetKey.MAIN_BGM, GameConfig.BGM_VOLUME,  true, false);


        this._cornerButtonEnable(false, num);
        this._removeCorner();

        //COUNTER ENABLED
        if(num >= _categoryArr.length - 1)
        {
            if(this._purchaseSlide) this._purchaseSlide._destroy();
            this._destroy();
            this._parent._createPos();
            return;
        }

        //CORNER GENERATE
        this._corner = new Corner(this._game, this._bgGroup, this._gameGroup, _categoryArr[num], this);
        this._backButton.visible = true;
        this._cornerPop = true;

        this._ppiyoCartGenerate();
        if(this._ppiyoCart) this._ppiyoCart._visible(true);

        if(GameConfig.BACK_BUTTON) GameConfig.BACK_BUTTON.visible = false;
    }

    _ppiyoCartGenerate() {

        if(! this._ppiyoCart) this._ppiyoCart = new PpiyoCart(this._game);
        this._ppiyoCart._visible(false);
    }

    _ppiyoFeedBackPopUp(correct) {

        if(this._ppiyoCart) this._ppiyoCart.feedBackPopUp(correct);
    }

    _createBackButton() {
        let base = 'btn_mainDisplay_default';
        let over = 'btn_mainDisplay_over';
        this._backButton = this._buttonGroup.add(this._game.make.button(890, 604,  this._key, this._removeCorner.bind(this), this, over, base, base));
        // this.soundOffBtnSound = null;
        // this._buttonSndPlay(SoundAssetKey.BUTTON_SOUND, this.soundOffBtnSound, this._backButton);
        // this._backButton.visible = false;
    }


    _cornerButtonEnable(bool, num = 0, selected = false) {

        for(let i = 1; i<_btnArr.length; i++) _btnArr[i]._visible(bool);
        for(let i = 1; i<_btnArr.length; i++)
        {
            if(selected)
            {
                if(i !== num) _btnArr[i]._btnDisable();
            }
            else
            {
                _btnArr[i]._btnEnable();
            }
        }

        //COUNTER BUTTON INVISIBLE
        _btnArr[_btnArr.length - 1]._btn.visible = this._shoppingComplete;

        this._cornerPop = false;
        this._backButton.visible = false;
    }

    _removeCorner(counterButtonVisible = false) {

        if(this._corner)
        {
            SoundManager.instance.effectSoundStop(GameConfig.CURRENT_GUIDE_SOUND, 0.8, false, true);
            let sndKeyArr = [SoundAssetKey.BTNSND_REMOVECORNER_1, SoundAssetKey.BTNSND_REMOVECORNER_2];
            let snd = sndKeyArr[this._game.rnd.between(0, 1)];
            SoundManager.instance.effectSound(snd);
            GameConfig.CURRENT_BUTTON_SOUND = snd;

            this._corner._destroy();
            this._corner = null;

        }
        if(this._cornerPop) this._cornerButtonEnable(counterButtonVisible);
        if(this._ppiyoCart) this._ppiyoCart._visible(false);
        if(GameConfig.BACK_BUTTON) GameConfig.BACK_BUTTON.visible = true;
    }

    _buttonSndPlay(sndKey, snd, btn) {

        console.log(GameConfig.SOUND_ENABLED)
        if(!GameConfig.SOUND_ENABLED) return;
        snd = this._game.add.audio(sndKey);
        btn.setDownSound(snd);
    }

    _purchaseSlidePop() {

        this._purchaseSlide = new PurchaseSlider(this._game, _categoryArr);

    }

    _guideHandPop() {

        this.hand = new Phaser.Image(this._game, 1146, 453, this._key, 'guideHand');
        this._buttonGroup.addChild(this.hand);
        this.hand.anchor.setTo(0.5, 0.5);
        this.hand.x += this.hand.width/2;
        this.hand.y += this.hand.height/2;
        this._game.add.tween(this.hand.scale).to({x:0.8, y:0.8}, 300, Phaser.Easing.Quintic.Out, true, 0, 1000, true);
        // this.hand.inputEnabled = true;
        // this.hand.input.enableDrag();
        // this.hand.events.onDragUpdate.add(this._stopDrag, this);

    }

    _stopDrag(obj) {

        console.log(parseInt(obj.x), parseInt(obj.y));
    }

    _update() {


        if(this._corner) this._corner._update();
        if(this._purchaseSlide) this._purchaseSlide._update();
        if(GameConfig.TOTAL_CATEGORIES === 0)
        {
            //COUNTER BUTTON INVISIBLE
            _btnArr[_btnArr.length - 1]._btn.visible = this._shoppingComplete;
            _btnArr[_btnArr.length - 1]._btn.inputEnabled = true;
            _btnArr[_btnArr.length - 1]._update();


            if(this._shoppingComplete) return;
            this._removeCorner(true);
            for(let i = 1; i<_btnArr.length - 1; i++) _btnArr[i]._btnDisable();

            //GUIDE  HAND POP UP
            this._guideHandPop();
            this._shoppingComplete = true;
        }

        if(this._cornerPop) return;
        for(let i =0; i<_btnArr.length; i++)
        {
            if(_btnArr[i]) _btnArr[i]._update();
        }

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

        this._bgGroup.removeChildren(0, this._bgGroup.length);
        this._gameGroup.removeChildren(0, this._gameGroup.length);
        this._buttonGroup.removeChildren(0, this._buttonGroup.length);
        for(let i = 0; i<this._bgGroup.length; i++) this._bgGroup[i].destroy();
        for(let i = 0; i<this._gameGroup.length; i++) this._gameGroup[i].destroy();
        for(let i = 0; i<this._buttonGroup.length; i++) this._buttonGroup[i]._destroy();
    }

}
