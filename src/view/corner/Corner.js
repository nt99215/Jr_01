import SoundAssetKey from "../../data/SoundAssetKey";
import AssetKey from "../../data/AssetKey";
import GameConfig from "../../data/GameConfig";

let btnArr, dragObjArr, startX, startY, displayTween, baseWidth;
const minimumYpos = 550;


export default class Corner {
    constructor(game, bgGroup, gameGroup, category) {
        this._game = game;
        this._bgGroup = bgGroup;
        this._gameGroup = gameGroup;
        this._category = category;
        this._key = this._category.assetKey;
        btnArr = [];
        dragObjArr = [];
        startX = 0;
        startY = 0;
        baseWidth = 0;
        this._init();
    }

    _init() {

        this._backGround = this._game.add.graphics(0, 0);
        this._backGround.beginFill(this._category.backGroundColor, 1);
        this._backGround.drawRect(0, 0, 1280, 720);
        this._backGround.endFill();
        this._bgGroup.addChild(this._backGround);

        for(let i = 0; i<this._category.backGroundAsset.length; i++)
        {
            let asset = 'corner_' + this._category.backGroundAsset[i];
            let yPos = this._category.displayPosition.displayBarY;
            let base = new Phaser.Image(this._game, 0 + baseWidth, yPos, this._key, asset);
            baseWidth +=base.width;
            this._gameGroup.addChild(base);
        }


        this._categoryButtonGenerate();
        this._moving();

    }

    _moving() {
        this._gameGroup.x = this._category.displayPosition.groupStartX;
        let endX = this._category.displayPosition.groupEndX;
        let duration = Math.abs(endX) * 10;

        // this._gameGroup.x = -420;
        displayTween = this._game.add.tween(this._gameGroup).to({x:endX}, duration, Phaser.Easing.Quartic.None, true, 1000, 1000, true);

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
            btn.input.pixelPerfectOver = true;
            btn.input.pixelPerfectClick = true;
            btnArr.push(btn);
        }

        for(let obj in list)
        {
            let asset = list[obj].item;
            // let xPos = list[obj].xPos;
            // let yPos = list[obj].yPos;
            let dragObj = new Phaser.Image(this._game, 0, 0, this._key, asset);
            this._gameGroup.addChild(dragObj);
            // dragObj.x = xPos;
            // dragObj.y = yPos;
            // dragObj.tint = 0xffcc00;
            // dragObj.alpha = 0;
            dragObj.visible = false;
            // dragObj.inputEnabled = true;
            // dragObj.input.enableDrag();
            // dragObj.events.onDragStart.add(this._startDrag, this);
            // dragObj.input.pixelPerfectOver = true;
            // dragObj.input.pixelPerfectClick = true;
            dragObjArr.push(dragObj);

        }

    }

    _itemSelect(obj) {

        if(displayTween) displayTween.pause();

        let num = btnArr.indexOf(obj);
        let currentObj = dragObjArr[num];
        startX = this._game.input.x - this._gameGroup.x;
        startY = this._game.input.y;
        for(let i = 0; i<dragObjArr.length; i++)
        {
            if(i !== num)
            {
                // dragObjArr[i].alpha = 0;
                dragObjArr[i].visible = false;
                dragObjArr[i].inputEnabled = false;
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
        // currentObj.events.onDragStart.add(this._startDrag, this);
        currentObj.events.onDragStop.add(this._stopDrag, this);

    }

    _stopDrag(obj) {

        console.log(parseInt(obj.x), parseInt(obj.y));

        if(displayTween) displayTween.resume();

        if(obj.y <= minimumYpos)
        {
            let tw = this._game.add.tween(obj).to({x: startX - obj.width/2, y: startY - obj.height/2}, 300, Phaser.Easing.Quartic.Out, true);
            tw.onComplete.addOnce(()=> {
                obj.visible = false;
            });


        }
        else this._game.add.tween(obj).to({y:minimumYpos + 200}, 300, Phaser.Easing.Quartic.Out, true);
    }

    _startDrag(obj) {

        console.log(parseInt(obj.x), parseInt(obj.y));

    }

    _destroy() {

        this._bgGroup.removeChild(this._backGround);
        this._gameGroup.removeChildren(0, this._gameGroup.length);
        for(let i = 0; i<btnArr.length; i++) btnArr[i].destroy();
        for(let i = 0; i<dragObjArr.length; i++) dragObjArr[i].destroy();
        if(displayTween) displayTween.stop();
        this._gameGroup.x = 0;
        btnArr = [];
        dragObjArr = [];

    }

}