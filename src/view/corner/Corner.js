import SoundAssetKey from "../../data/SoundAssetKey";
import AssetKey from "../../data/AssetKey";
import GameConfig from "../../data/GameConfig";
import BackGroundTouchEffect from "../../ui/effect/BackGroundTouchEffect";
import RollingBoard from "./RollingBoard";

let boardArr, btnArr, dragObjArr, startX, startY, baseWidth, centerPos, activePoint;
const minimumYpos = 550;
const speed = 3;


export default class Corner {
    constructor(game, bgGroup, gameGroup, category, parent) {
        this._game = game;
        this._bgGroup = bgGroup;
        this._gameGroup = gameGroup;
        this._category = category;
        this._key = this._category.assetKey;
        this._parent = parent;
        this._game.input.maxPointers = 1;
        this._currentObj = null;
        this._headRemove = false;
        this._totalWidth = 0;
        this._pickUp = false;

        boardArr = [];
        btnArr = [];
        dragObjArr = [];
        startX = 0;
        startY = 0;
        baseWidth = 0;
        centerPos = 0;
        this._init();

    }

    _init() {

        //BACKGROUND
        this._backGround = this._game.add.graphics(0, 0);
        this._backGround.beginFill(this._category.backGroundColor, 1);
        this._backGround.drawRect(0, 0, 1280, 720);
        this._backGround.endFill();
        this._bgGroup.addChild(this._backGround);

        let headArr = this._category.rollingButtonList[0];
        console.log(headArr);
        let head = new RollingBoard(this._game, this._gameGroup, this._category.assetKey, this._category.category, 0, headArr);
        boardArr.push(head);
        head._board.x = 294;
        head._board.y = 720 - head._board.height;

       for(let i = 1; i <= this._category.totalDisplayBoard; i++)
       {
           let arr = this._category.rollingButtonList[i];
           console.log(arr);
           let board = new RollingBoard(this._game, this._gameGroup, this._category.assetKey, this._category.category, i, arr);
           boardArr.push(board);
           boardArr[i]._board.y = 720 - boardArr[i]._board.height;
           boardArr[1]._board.x = head._board.x + head._board.width;
           this._totalWidth += boardArr[i]._board.width;

           if(i >= 2) boardArr[i]._board.x = boardArr[i - 1]._board.x + boardArr[i - 1]._board.width;

           boardArr[i].btnPosReset();
       }

        // this._totalWidth -= speed;

        this._categoryButtonGenerate();
        this._moving();

    }

    _moving() {

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
            let asset = 'area_' + list[obj].item;
            let xPos = list[obj].xPos;
            let yPos = list[obj].yPos;
            let btn = new Phaser.Image(this._game, 0, 0, this._key, asset);
            this._gameGroup.addChild(btn);
            btn.x = xPos;
            btn.y = yPos;
            btn.tint = 0xffcc00;
            btn.alpha = 0;
            btn.inputEnabled = true;
            // btn.input.enableDrag();
            // btn.events.onDragStart.add(this._startDrag, this);
            btn.events.onInputDown.add(this._itemSelect, this);
            // btn.events.onInputDown.add(this._onDown, this);
            // btn.events.onInputUp.add(this._onUp, this);
            btn.input.pixelPerfectOver = true;
            btn.input.pixelPerfectClick = true;
            btnArr.push(btn);
        }

        for(let obj in list)
        {
            let asset = list[obj].item;
            let dragObj = new Phaser.Image(this._game, 0, 0, this._key, asset);
            this._gameGroup.addChild(dragObj);
            // dragObj.visible = false;
            dragObjArr.push(dragObj);
        }

    }

    _itemSelect(obj) {

        let num = btnArr.indexOf(obj);
        let currentObj = dragObjArr[num];
        startX = this._game.input.x - this._gameGroup.x;
        // startX = this._game.input.x;
        startY = this._game.input.y;
        for(let i = 0; i<dragObjArr.length; i++)
        {
            if(i !== num)
            {
                // dragObjArr[i].alpha = 0;
                dragObjArr[i].visible = false;
                // dragObjArr[i].inputEnabled = false;
            }

        }

        // currentObj.alpha = 1;
        currentObj.visible = true;
        currentObj.x = this._game.input.x - this._gameGroup.x;
        currentObj.y = this._game.input.y;
        currentObj.x -= currentObj.width/2;
        currentObj.y -= currentObj.height/2;
        currentObj.inputEnabled = true;
        currentObj.input.enableDrag();
        currentObj.input.startDrag(this._game.input.activePointer);
        this._currentObj = currentObj;
        this._pickUp = true;

        BackGroundTouchEffect.instance.effect(this._game, this._game.input.x, this._game.input.y, 50, 1);

    }


    _stopDrag(obj) {

        this._pickUp = false;
        this._currentObj = null;

        // console.log(parseInt(obj.x), parseInt(obj.y));

        let correct;
        if (this._overLapCheck(obj))
        {
            // console.log('hit~~~')
            if(this._pushEnable(obj)) correct = true;
            else correct = false;

            this._parent._ppiyoFeedBackPopUp(correct);
        }

        this._objRestore(obj, correct);
    }

    _objRestore(obj, correct = false) {

        if(correct) this._game.add.tween(obj).to({x: centerPos, y: minimumYpos + 200}, 300, Phaser.Easing.Quartic.Out, true);
        else
        {
            let tw = this._game.add.tween(obj).to({x: startX - obj.width/2, y: startY - obj.height/2}, 300, Phaser.Easing.Quartic.Out, true);
            tw.onComplete.addOnce(()=> {
                obj.visible = false;
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
        if (GameConfig.PURCHASE_LIST[i].item === name) idx = i;

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

    _update() {

        if(! this._pickUp) this._moving();
        // console.log(this._currentObj.input.activePointer);
        if(!this._currentObj || this._currentObj === null || this._currentObj === undefined) return;
        if(this._currentObj)
        {
            activePoint = this._currentObj.input.update(this._game.input.activePointer);

            if(! activePoint)
            {
                this._stopDrag(this._currentObj);
            }
            // console.log(activePoint);
        }

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