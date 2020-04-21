import SeparateAnimation from "../../object/SeparateAnimation";
import AssetKey from "../../../data/AssetKey";
import GameConfig from "../../../data/GameConfig";
import PurchaseItemForListView from "./PurchaseItemForListView";

let dragStartPos;

export default class PurchaseListView {
    constructor(game, group) {
        this._game = game;
        // this._gameGroup = this._game.add.group();
        this._gameGroup = group;
        this._sliderGroup = this._game.add.group();
        this._topGroup = this._game.add.group();
        this._key = AssetKey.PURCHASE_LIST_VIEW;
        this.purchaseItem = [];
        this._init();
        this._listSetting();
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

    }

    _listSetting() {
        let interval = 0;
        let pArr = GameConfig.PURCHASE_LIST;

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
            interval = (107 + 5) * ( i + 1);
            purchaseItem.startY = yPos;
            this._sliderGroup.mask = this.maskRect;
        }

        this.purchaseItem = GameConfig.PURCHASE_ITEM_FOR_LIST_ARRAY;
        // console.log(pArr);
        // console.log(this.purchaseItem);

        this._dragArea(interval);

        this.dragRect = this._game.add.graphics(0, 0);
        this.dragRect.beginFill(0xff4400, 0);
        this.dragRect.drawRect(377, 120, 526, interval);
        this.dragRect.endFill();
        this._gameGroup.addChild(this.dragRect);
        this.dragRect.inputEnabled = true;
        this.dragRect.input.enableDrag(false, false, false, 255, this.dragArea);
        this.dragRect.input.allowHorizontalDrag = false;
        this.dragRect.events.onDragUpdate.add(this._drag, this);
        this.dragRect.mask = this.maskRect;
        dragStartPos = this.dragRect.y;

    }

    _dragArea(interval) {
        this.dragArea = this._game.add.graphics(0, - interval * 0.5);
        this.dragArea.beginFill(0x000, 0);
        this.dragArea.drawRect(377, 0, 526, interval * 1.5);
        this.dragArea.endFill();
        this._topGroup.addChild(this.dragArea);
    }

    _drag(obj) {

        // console.log('x : ', parseInt(obj.x), 'y :', parseInt(obj.y));
        // if(obj.y>0) return;

        let dist = obj.y - dragStartPos;
        if(this.purchaseItem.length > 0)
            for (let i = 0; i < this.purchaseItem.length; i++)
            {
                this.purchaseItem[i].blit.y = this.purchaseItem[i].startY + dist + 42;

                for(let j = 0; j<this.purchaseItem[i].itemArr.length; j++)
                {
                    this.purchaseItem[i].itemArr[j].y = this.purchaseItem[i].startY + dist;
                }
            }

        // let lastItem = this.purchaseItem[this.purchaseItem.length - 1].numberImg[0];
        // let minimum = parseInt(this._prevBtn.x - this.purchaseItem[0].bg.x + this._prevBtn.width);
        // let maximum = parseInt(this._nextBtn.x - lastItem.x - lastItem.width);
        // console.log('minimum : ', minimum, 'maximum : ', maximum);
    }

    _destroy() {
        this._gameGroup.removeChildren(0, this._gameGroup.length);
        for(let i = 0; i< this._gameGroup.length; i++) this._gameGroup[i].destroy();
    }
}