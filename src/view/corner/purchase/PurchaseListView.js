import SeparateAnimation from "../../object/SeparateAnimation";
import AssetKey from "../../../data/AssetKey";
import GameConfig from "../../../data/GameConfig";
import PurchaseItemForListView from "./PurchaseItemForListView";
import SoundAssetKey from "../../../data/SoundAssetKey";
import SoundManager from "../../../manager/SoundManager";

let _dragStartPos, _dist, _interval, _count;
const _minimumPurchase = 5;
const _maxCount = 100;
export default class PurchaseListView {
    constructor(game, group, parent) {
        this._game = game;
        // this._gameGroup = this._game.add.group();
        this._gameGroup = group;
        this._sliderGroup = this._game.add.group();
        this._topGroup = this._game.add.group();
        this._key = AssetKey.PURCHASE_LIST_VIEW;
        this._prevBtn = null;
        this._nextBtn = null;
        this._totalPurchase = 0;
        this._slidingEnable = true;
        this._countStart = false;
        this.purchaseItem = [];
        this._parent = parent;
        this._ppiyoFaceChange = false;
        _interval = 0;
        _count = 0;
        this._init();
        this._listButton();

    }

    _init() {

        this.bgRect = this._game.add.graphics(0, 0);
        this.bgRect.beginFill(0xfdeeb9, 1);
        this.bgRect.drawRect(0, 0, 1280, 720);
        this.bgRect.endFill();
        this._gameGroup.addChild(this.bgRect);

        this.bgRectWhite = this._game.add.graphics(0, 0);
        this.bgRectWhite.beginFill(0xffffff, 1);
        this.bgRectWhite.drawRect(377, 100, 526, 693);
        this.bgRectWhite.endFill();
        this._gameGroup.addChild(this.bgRectWhite);

        this.boardTop = new Phaser.Image(this._game, 377, 0, this._key, 'purchaseListBoardTop');
        this._topGroup.addChild(this.boardTop);

        this.boardBottom = new Phaser.Image(this._game, 377, 680, this._key, 'purchaseListBoardBottom');
        this._topGroup.addChild(this.boardBottom);

        this.ppiyo = new SeparateAnimation(this._game, this._key, 'purchase_ppiyo_', 848, 332, 1, 2, '', 0, 4, true);
        this._topGroup.addChild(this.ppiyo);
        this.ppiyo._play();

        this.cart = new SeparateAnimation(this._game, this._key, 'purchase_cart_', 19, 334, 1, 2, '', 0, 2, true);
        this._topGroup.addChild(this.cart);
        this.cart._play();

        this.maskRect = this._game.add.graphics(0, 0);
        this.maskRect.beginFill(0xffcc00, 0.3);
        this.maskRect.drawRect(0, 0, 1280, 720);
        this.maskRect.endFill();
        this._topGroup.addChild(this.maskRect);

        this._listSetting();

    }

    _listSetting() {
        // let _interval = 0;
        let pArr = GameConfig.PURCHASE_LIST;
        this._totalPurchase = pArr.length;

        //LIST
        for (let i = 0; i < pArr.length; i++)
        {
            let asset = pArr[i].item;
            let quantity = pArr[i].quantity;
            let term =  127;
            let dotTerm =  169;
            let xPos =  494;
            let yPos =  (107 + 5) * i  + term;
            let dotXpos =  425;
            let dotYpos = (85 + 27) * i  + dotTerm;
            let purchaseItem = new PurchaseItemForListView(this._game, this._sliderGroup, asset, quantity, xPos, yPos, dotXpos, dotYpos);
            GameConfig.PURCHASE_ITEM_FOR_LIST_ARRAY = purchaseItem;
            _interval = (107 + 5) * ( i + 1);
            purchaseItem.startY = yPos;
            this._sliderGroup.mask = this.maskRect;
        }

        this.purchaseItem = GameConfig.PURCHASE_ITEM_FOR_LIST_ARRAY;
        // console.log(pArr);
        // console.log(this.purchaseItem);

        this._dragArea(_interval);

        this.dragRect = this._game.add.graphics(0, 0);
        this.dragRect.beginFill(0xff4400, 0);
        this.dragRect.drawRect(377, 120, 526, _interval);
        this.dragRect.endFill();
        this._gameGroup.addChild(this.dragRect);
        this.dragRect.inputEnabled = true;
        this.dragRect.input.enableDrag(false, false, false, 255, this.dragArea);
        this.dragRect.input.allowHorizontalDrag = false;
        // this.dragRect.events.onDragUpdate.add(this._drag, this);
        this.dragRect.mask = this.maskRect;
        _dragStartPos = this.dragRect.y;

    }

    _listButton() {

        // this._prevBtn = this._topGroup.add(this._game.make.button(800, 135, this._key, this._onPrev.bind(this), this, 'guideArrowPrev', 'guideArrowPrev', 'guideArrowPrev','guideArrowPrev'));
        this._nextBtn = this._topGroup.add(this._game.make.button(800, 505, this._key, this._onNext.bind(this), this, 'guideArrowPrev', 'guideArrowPrev', 'guideArrowPrev','guideArrowPrev'));
        // this._clickSound = null;
        // this._buttonSndPlay(SoundAssetKey.BUTTON_SOUND, this._clickSound, this._nextBtn);

        if(this._totalPurchase <= _minimumPurchase)
        {
            // this._prevBtn.inputEnabled = false;
            // this._prevBtn.alpha = 0.3;
            this._nextBtn.inputEnabled = false;
            this._nextBtn.visible = false;

            //SLIDING DISABLE
            this._slidingEnable = false;
            this._countStart = true;
            this.dragRect.visible = false;
        }

        else
        {
            //GUIDE HAND
            this.hand = new Phaser.Image(this._game, 847, 549, this._key, 'guideHand');
            this._topGroup.addChild(this.hand);
            this.hand.anchor.setTo(0.5, 0.5);
            this.hand.x += this.hand.width/2;
            this.hand.y += this.hand.height/2;
            this._game.add.tween(this.hand.scale).to({x:0.8, y:0.8}, 300, Phaser.Easing.Quintic.Out, true, 0, 1000, true);
            // this._game.add.tween(this.hand).to({y:650}, 800, Phaser.Easing.Quintic.Out, true, 0, 1000, true);
        }


    }

    _dragArea(interval) {
        this.dragArea = this._game.add.graphics(0, - interval * 0.5);
        this.dragArea.beginFill(0x000, 0);
        this.dragArea.drawRect(377, 0, 526, interval * 1.5);
        this.dragArea.endFill();
        this._topGroup.addChild(this.dragArea);
    }

    _buttonSndPlay(sndKey, snd, btn) {
        if(!GameConfig.SOUND_ENABLED) return;
        snd = this._game.add.audio(sndKey);
        btn.setDownSound(snd);
    }

    _drag(obj) {

        // console.log('x : ', parseInt(obj.x), 'y :', parseInt(obj.y));
        // if(obj.y>0) return;

        // _dist = obj.y - _dragStartPos;
      /*  if(this.purchaseItem.length > 0)
            for (let i = 0; i < this.purchaseItem.length; i++)
            {
                this.purchaseItem[i].blit.y = this.purchaseItem[i].startY + _dist + 42;

                for(let j = 0; j<this.purchaseItem[i].itemArr.length; j++)
                {
                    this.purchaseItem[i].itemArr[j].y = this.purchaseItem[i].startY + _dist;
                }
            }*/
    }

    _sliderMoving() {

        // console.log(this.purchaseItem[this.purchaseItem.length - 1].blit.y);
        let objAllpopPos = 620;
        let lastObject = this.purchaseItem[this.purchaseItem.length - 1].blit.y;
        if(lastObject <= objAllpopPos)
        {
            this._countStart = true;
            if(this.hand) this.hand.destroy();
            if(this._nextBtn) this._nextBtn.destroy();
        }

        if(this.purchaseItem.length > 0)
            for (let i = 0; i < this.purchaseItem.length; i++)
            {
                this.purchaseItem[i].blit.y = this.purchaseItem[i].startY + _dist + 42;

                for(let j = 0; j<this.purchaseItem[i].itemArr.length; j++)
                {
                    this.purchaseItem[i].itemArr[j].y = this.purchaseItem[i].startY + _dist;
                }
            }

    }

    _onPrev() {
        this._game.add.tween(this.dragRect).to({y:0}, 300, Phaser.Easing.Quartic.Out, true);
    }

    _onNext() {

        SoundManager.instance.effectSoundContinuance(SoundAssetKey.BUTTON_SOUND);
        this._nextBtn.inputEnabled = false;
        this._nextBtn.visible = false;
        let tw = this._game.add.tween(this.dragRect).to({y:-_interval/2}, 300, Phaser.Easing.Quartic.Out, true);
        tw.onComplete.add(()=> {
            this._countStart = true;
        });

        if(this.hand) this.hand.destroy();


    }

    _update() {


        if(this._countStart)
        {
            this._ppiyoChange();
            _count++;
            if(_count>=_maxCount)
            {
                this._gameStart();
                this._destroy();
                this._countStart = false;
                return;
            }
        }

        _dist = this.dragRect.y - _dragStartPos;
        if(this._slidingEnable) this._sliderMoving();

    }

    _ppiyoChange() {
        if(this._ppiyoFaceChange) return;

        this._ppiyoFaceChange = true;
        if(this.ppiyo)
        {
            this._topGroup.removeChild(this.ppiyo);
            this.ppiyo._destroy();
        }
        this.ppiyo = new SeparateAnimation(this._game, this._key, 'purchase_ppiyo_complete_', 848, 332, 1, 2, '', 0, 4, true);
        this._topGroup.addChild(this.ppiyo);
        this.ppiyo._play();
        // this.ppiyo._frameChange('purchase_ppiyo_complete_', 1, 2, '', 0, 6, true);

    }

    _gameStart() {
        this._parent._createCorner();
    }

    _destroy() {
        // this._gameGroup.removeChildren(0, this._gameGroup.length);
        this._sliderGroup.removeChildren(0, this._sliderGroup.length);
        this._topGroup.removeChildren(0, this._topGroup.length);
        this._gameGroup.removeChild(this.bgRect);
        this._gameGroup.removeChild(this.bgRectWhite);
        this._gameGroup.removeChild(this.dragRect);
        this.bgRect.destroy();
        this.bgRectWhite.destroy();
        // for(let i = 0; i< this._gameGroup.length; i++) this._gameGroup[i].destroy();
        for(let i = 0; i< this._sliderGroup.length; i++) this._sliderGroup[i].destroy();
        for(let i = 0; i< this._topGroup.length; i++) this._topGroup[i].destroy();
    }
}