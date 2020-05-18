import SoundAssetKey from "../../data/SoundAssetKey";
import AssetKey from "../../data/AssetKey";
import GameConfig from "../../data/GameConfig";
import BackGroundTouchEffect from "../../ui/effect/BackGroundTouchEffect";
import RollingBoard from "./RollingBoard";
import SoundManager from "../../manager/SoundManager";

let boardArr, btnArr, dragObjArr, startX, startY, baseWidth, centerPos;
const minimumYpos = 550;
const speed = 3;


export default class Corner {
    constructor(game, bgGroup, gameGroup, category, parent, popEnable) {
        this._game = game;
        this._bgGroup = bgGroup;
        this._gameGroup = gameGroup;
        this._category = category;
        this._key = this._category.assetKey;
        this._parent = parent;
        this._game.input.maxPointers = 1;
        this._headRemove = false;
        this._totalWidth = 0;
        this._pickUp = false;
        this._popEnable = popEnable;

        boardArr = [];
        btnArr = [];
        dragObjArr = [];
        startX = 0;
        startY = 0;
        baseWidth = 0;
        centerPos = 0;
        this._init();
        this._sndPlay();

    }

    _sndPlay() {
        if(! this._popEnable)
        {
            SoundManager.instance.effectSoundStop(GameConfig.CURRENT_GUIDE_SOUND, 0, false, true);
            SoundManager.instance.effectSoundStop(GameConfig.CURRENT_BUTTON_SOUND, 0, false, true);
            SoundManager.instance.effectSound(SoundAssetKey.guideNarr_3);
            GameConfig.CURRENT_GUIDE_SOUND = SoundAssetKey.guideNarr_3;
        }
    }

    _init() {

        //BACKGROUND
        this._backGround = this._game.add.graphics(0, 0);
        this._backGround.beginFill(this._category.backGroundColor, 1);
        this._backGround.drawRect(0, 0, 1280, 720);
        this._backGround.endFill();
        this._bgGroup.addChild(this._backGround);

        let headArr = this._category.rollingButtonList[0];
        let headEffectArr = this._category.effectQuantity[0];
        let head = new RollingBoard(this._game, this._bgGroup, this._gameGroup, this._category.assetKey, this._category.category, 0, headArr, headEffectArr, '_head');
        boardArr.push(head);
        head._board.x = 294;
        head._board.y = 720 - head._board.height;

       for(let i = 1; i <= this._category.totalDisplayBoard; i++)
       {
           let arr = this._category.rollingButtonList[i];
           let effectArr = this._category.effectQuantity[i];
           let board = new RollingBoard(this._game, this._bgGroup, this._gameGroup, this._category.assetKey, this._category.category, i, arr, effectArr);
           boardArr.push(board);
           boardArr[i]._board.y = 720 - boardArr[i]._board.height;
           boardArr[1]._board.x = head._board.x + head._board.width;
           this._totalWidth += boardArr[i]._board.width;

           if(i >= 2) boardArr[i]._board.x = boardArr[i - 1]._board.x + boardArr[i - 1]._board.width;

           boardArr[i].btnPosReset();
       }

        this._categoryButtonGenerate();
        this._moving();

    }

    _moving() {

        // console.log(this._key);
        for(let i = 0 ; i < boardArr.length; i++)
        {
            boardArr[i]._board.x -= speed;


            if(boardArr[i]._board.x < - (boardArr[i]._board.width))
            {
                if(i === 0 && ! this._headRemove)
                {
                    // boardArr[0]._destroy();
                    // boardArr.splice(0, 1);
                    this._headRemove = true;
                }
                else boardArr[i]._board.x += this._totalWidth;

                boardArr[i]._board.visible = false;
            }

            if(boardArr[i]._board.x < this._game.world.width)
            {
                if(i !== 0) boardArr[i]._board.visible = true;
            }

            boardArr[i].btnPosReset();
        }

    }

    _categoryButtonGenerate() {

        let list = this._category.itemList;
        for(let obj in list)
        {
            let asset = list[obj].item;
            let dragObj = new Phaser.Image(this._game, 0, 0, this._key, asset);
            dragObj.item = asset;

            let quantity = list[obj].effectQuantity;
            dragObj.effectQuantity = quantity;

            this._gameGroup.addChild(dragObj);
            dragObj.visible = false;
            dragObjArr.push(dragObj);
        }

       // console.log(boardArr)
        for(let i = 0; i < boardArr.length; i++)
        {
            for(let j = 0; j < boardArr[i]._categoryButton.length; j++)
            {
                let btn = boardArr[i]._categoryButton[j];
                btn.inputEnabled = true;
                btn.input.enableDrag();
                btn.events.onDragUpdate.add(this._startDrag, this);
                btn.events.onDragStop.add(this._stopDrag, this);
                btn.events.onInputDown.add(this._itemSelect, this);
                btn.input.pixelPerfectOver = true;
                btn.input.pixelPerfectClick = true;

            }
        }

    }

    _indexCheck(obj) {

        let name = obj.categoryName;
        let num = 0;
        for(let i = 0; i < dragObjArr.length; i++)
            if(dragObjArr[i].item === name) num = i;
        return num;
    }

    _itemSelect(obj) {

        this._pickUp = true;
        if(! obj.img.visible) obj.img.visible = true;
        if(obj.img.alpha < 1) obj.img.alpha = 1;
        obj.bringToTop();

        startX = this._game.input.x - this._gameGroup.x;
        startY = this._game.input.y;

        BackGroundTouchEffect.instance.effect(this._game, this._game.input.x, this._game.input.y, 50, 1);

    }


    _objRestore(obj, correct = false) {

        if(correct) this._game.add.tween(obj.img).to({x: centerPos, y: minimumYpos + 200, alpha: 0}, 300, Phaser.Easing.Quartic.Out, true);
        else
        {
            let tw = this._game.add.tween(obj.img).to({x: startX - obj.img.width, y: startY - obj.img.height/2}, 300, Phaser.Easing.Quartic.Out, true);
            tw.onComplete.add(()=> {
                obj.img.visible = false;
            });
        }

    }

    _overLapCheck(obj) {

        let target;
        if(this._parent._ppiyoCart.hitArea)
        {
            target = this._parent._ppiyoCart.hitArea;
            centerPos = obj.x;
            return overLap(obj, target);
        }

        function overLap(a, b) {
            {
                let boundA = a.getBounds();
                let boundB = b.getBounds();
                return Phaser.Rectangle.intersects(boundA, boundB);
            }

        }
    }

    _pushEnable(obj) {

        let name = obj._frame.name;
        let idx = -1;
        GameConfig.CURRENT_FILL_OBJECT = name;
        for(let i = 0; i<GameConfig.PURCHASE_LIST.length; i++)
        if (GameConfig.PURCHASE_LIST[i].item === name
        && GameConfig.PURCHASE_LIST[i].empty ) idx = i;

        if(idx !== -1 )
        {
            if(GameConfig.PURCHASE_ITEM_ARRAY[idx].complete) return false;
            else
            {
                GameConfig.PURCHASE_ITEM_ARRAY[idx].quantityChange(idx);
                return true;
            }

        }
        else return false;
    }


    _startDrag(obj) {

        // console.log(parseInt(obj.x), parseInt(obj.y));
        obj.img.x = this._game.input.x;
        obj.img.y = this._game.input.y;
        obj.img.x -= obj.img.width/2;
        obj.img.y -= obj.img.height/2;

    }

    _stopDrag(obj) {

        // console.log(parseInt(obj.x), parseInt(obj.y));
        this._pickUp = false;
        let correct;
        if (this._overLapCheck(obj.img))
        {
            // console.log('hit~~~')
            if(this._pushEnable(obj.img)) correct = true;
            else correct = false;

            this._parent._ppiyoFeedBackPopUp(correct);

            let soundAsset;
            if(correct) soundAsset = obj.sndPrefix + this._game.rnd.between(1, obj.sndEffectQuantity);
            else soundAsset = 'objSnd_wrong_' + this._game.rnd.between(1, 2);
            this._effectSndPlay(soundAsset)
        }

        this._objRestore(obj, correct);
    }


    _dragUpdate(obj) {
        // console.log(parseInt(obj.x), parseInt(obj.y));
        let target;
        if(this._parent._ppiyoCart.hitArea)
        {
            target = this._parent._ppiyoCart.hitArea;
            centerPos = target.x - target.width/2 + obj.x - obj.width/2;
            // return overLap(obj, target);
            // console.log(parseInt(target.x), parseInt(obj.x));
        }
    }

    _effectSndPlay(soundAsset) {
        SoundManager.instance.effectSoundStop(GameConfig.CURRENT_GUIDE_SOUND, 0, false, true);
        SoundManager.instance.effectSoundStop(GameConfig.CURRENT_BUTTON_SOUND, 0, false, true);
        SoundManager.instance.effectSound(soundAsset);
        GameConfig.CURRENT_GUIDE_SOUND = soundAsset;
    }

    _update() {

        if(! this._pickUp) this._moving();
    }


    _destroy() {

        this._bgGroup.removeChild(this._backGround);
        this._gameGroup.removeChildren(0, this._gameGroup.length);
        for(let i = 0; i<btnArr.length; i++) btnArr[i].destroy();
        for(let i = 0; i<dragObjArr.length; i++) dragObjArr[i].destroy();
        for(let i = 0; i<boardArr.length; i++) boardArr[i]._destroy();
        this._gameGroup.x = 0;
        btnArr = [];
        dragObjArr = [];
        boardArr = [];

    }

}