import AssetKey from "../../../data/AssetKey";
import SoundAssetKey from "../../../data/SoundAssetKey";
import PurchaseItem from "./PurchaseItem";
import GameConfig from "../../../data/GameConfig";
import SoundManager from "../../../manager/SoundManager";

let _dragStartPos, _interval, _dist;
const _minimumPurchase = 6;
export default class PurchaseSlider {
    constructor(game, categoryArray) {
        this._game = game;
        this._gameGroup = this._game.add.group();
        this._sliderGroup = this._game.add.group();
        this._key = AssetKey.SLIDE_BAR_PPIYO;
        this._prevBtn = null;
        this._nextBtn = null;
        this._totalPurchase = 0;
        this._slidingEnable = true;
        this.purchaseItem = [];
        _dragStartPos = 0;
        _interval = 0;

        this._init();
        this._listButton();

    }


    _init() {
        this.purchaseSlideBg = new Phaser.Image(this._game, 148, 12, AssetKey.SLIDE_BAR_PPIYO, 'ui_bg');
        this._gameGroup.addChild(this.purchaseSlideBg);

        this.maskRect = this._game.add.graphics(0, 0);
        this.maskRect.beginFill(0x000, 0.3);
        this.maskRect.drawRect(246, 12, 779, 131);
        this.maskRect.endFill();
        this._gameGroup.addChild(this.maskRect);

        this._listSetting();

    }

    _listSetting() {

        // let _interval = 0;
        let pArr = GameConfig.PURCHASE_LIST;
        this._totalPurchase = pArr.length;

        //LIST
        for (let i = 0; i < pArr.length; i++) {
            let asset = pArr[i].item;
            let quantity = pArr[i].quantity;
            let term =  265;
            let xPos =  (91 + 37) * i + term;
            let yPos =  31;
            let purchaseItem = new PurchaseItem(this._game, this._sliderGroup, asset, quantity, xPos, yPos);
            // this.purchaseItem.push(purchaseItem);
            GameConfig.PURCHASE_ITEM_ARRAY = purchaseItem;
            _interval = (91 + 37) * (i + 1);
            purchaseItem.startX = xPos;
            this._sliderGroup.mask = this.maskRect;
        }

        this.purchaseItem = GameConfig.PURCHASE_ITEM_ARRAY;
        // console.log(pArr);
        // console.log(this.purchaseItem);

        this._dragArea(_interval);

        this.dragRect = this._game.add.graphics(0, 0);
        this.dragRect.beginFill(0xff4400, 0);
        this.dragRect.drawRect(246, 12, _interval, 131);
        this.dragRect.endFill();
        this._gameGroup.addChild(this.dragRect);
        this.dragRect.inputEnabled = true;
        this.dragRect.input.enableDrag(false, false, false, 255, this.dragArea);
        this.dragRect.input.allowVerticalDrag = false;
        // this.dragRect.events.onDragUpdate.add(this._drag, this);
        this.dragRect.mask = this.maskRect;
        _dragStartPos = this.dragRect.x;
        _dist = this.dragRect.x - _dragStartPos;
        // console.log('_interval ', _interval);

    }

    _dragArea(interval) {
        this.dragArea = this._game.add.graphics( - interval * 0.5, 0);
        this.dragArea.beginFill(0x000, 0);
        this.dragArea.drawRect(246, 12, interval * 1.5,131);
        this.dragArea.endFill();
        this._gameGroup.addChild(this.dragArea);
    }

    _listButton() {
        this._prevBtn = this._gameGroup.add(this._game.make.button(187, 40, this._key, this._onPrev.bind(this), this, 'ui_prev', 'ui_prev', 'ui_prev','ui_prev'));
        // this._clickSound = null;
        // this._buttonSndPlay(SoundAssetKey.BUTTON_SOUND, this._clickSound, this._prevBtn);

        this._nextBtn = this._gameGroup.add(this._game.make.button(1028, 40, this._key, this._onNext.bind(this), this, 'ui_next', 'ui_next', 'ui_next','ui_next'));
        // this._clickSound = null;
        // this._buttonSndPlay(SoundAssetKey.BUTTON_SOUND, this._clickSound, this._nextBtn);

        if(this._totalPurchase <= _minimumPurchase)
        {
            this._prevBtn.inputEnabled = false;
            this._prevBtn.alpha = 0.3;
            this._nextBtn.inputEnabled = false;
            this._nextBtn.alpha = 0.3;

            //SLIDING DISABLE
            this._slidingEnable = false;
            this.dragRect.visible = false;
        }

    }

    _onPrev() {
        SoundManager.instance.effectSoundContinuance(SoundAssetKey.BUTTON_SOUND);
        this._game.add.tween(this.dragRect).to({x:0}, 300, Phaser.Easing.Quartic.Out, true);
    }
    
    _onNext() {
        SoundManager.instance.effectSoundContinuance(SoundAssetKey.BUTTON_SOUND);
        this._game.add.tween(this.dragRect).to({x:-_interval/2}, 300, Phaser.Easing.Quartic.Out, true);
    }

    _buttonSndPlay(sndKey, snd, btn) {
        if(!GameConfig.SOUND_ENABLED) return;
        snd = this._game.add.audio(sndKey);
        btn.setDownSound(snd);
    }

    _drag(obj) {
        // console.log(parseInt(obj.x));
        // _dist = obj.x - _dragStartPos;
    }

    _sliderMoving() {

        if(this.purchaseItem.length > 0)
            for (let i = 0; i < this.purchaseItem.length; i++)
            {
                this.purchaseItem[i].bg.x = this.purchaseItem[i].startX + _dist;
                this.purchaseItem[i].bgComp.x = this.purchaseItem[i].startX + _dist;
                this.purchaseItem[i].item.x = this.purchaseItem[i].startX + _dist;
                this.purchaseItem[i].itemComp.x = this.purchaseItem[i].startX + _dist;
                this.purchaseItem[i].checkMark.x = this.purchaseItem[i].startX + _dist;

                for(let j = 0; j<this.purchaseItem[i].numberImg.length; j++)
                    this.purchaseItem[i].numberImg[j].x = this.purchaseItem[i].startX + 58 + _dist;
            }

        // let lastItem = this.purchaseItem[this.purchaseItem.length - 1].number;
        // let lastItem = this.purchaseItem[this.purchaseItem.length - 1].numberImg[0];
        // let minimum = parseInt(this._prevBtn.x - this.purchaseItem[0].bg.x + this._prevBtn.width);
        // let maximum = parseInt(this._nextBtn.x - lastItem.x - lastItem.width);
        // console.log('minimum : ', minimum, 'maximum : ', maximum);

        this._btnEnable();

    }

    _btnEnable() {

        if(this.dragRect.x <= -_interval/2)
        {
            this._nextBtn.inputEnabled = false;
            this._nextBtn.alpha = 0.3;
        }
        else
        {
            this._nextBtn.inputEnabled = true;
            this._nextBtn.alpha = 1;
        }


        if(this.dragRect.x >= 0)
        {
            this._prevBtn.inputEnabled = false;
            this._prevBtn.alpha = 0.3;

        }
        else
        {
            this._prevBtn.inputEnabled = true;
            this._prevBtn.alpha = 1;

        }
    }

    _update() {
        // console.log('slide update');
        _dist = this.dragRect.x - _dragStartPos;
        if(this._slidingEnable) this._sliderMoving()

    }

    _destroy() {
        this._sliderGroup.removeChildren(0, this._sliderGroup.length);
        this._gameGroup.removeChildren(0, this._gameGroup.length);
        for(let i = 0; i<this._sliderGroup.length; i++) this._sliderGroup[i].destroy();
        for(let i = 0; i<this._gameGroup.length; i++) this._gameGroup[i].destroy();
    }

}