import AssetKey from "../../../data/AssetKey";
import GameConfig from "../../../data/GameConfig";

let _xPos, _yPos;

export default class PurchaseItem {
    constructor(game, group, asset, quantity, xPos, yPos, parent, index) {
        this._game = game;
        this._gameGroup = group;
        this._key = AssetKey.SLIDE_BAR_PPIYO;
        this._asset = asset;
        this.quantity = quantity;
        this.startX = 0;
        this.numberImg = [];
        this.complete = false;
        this._parent = parent;
        this.index = index;
        _xPos = xPos;
        _yPos = yPos;
        this._init();
    }

    _init() {
       this.bg = new Phaser.Image(this._game, _xPos, _yPos, this._key, 'ui_square');
       this._gameGroup.addChild(this.bg);

       this.bgComp = new Phaser.Image(this._game, _xPos, _yPos, this._key, 'ui_squareCheck');
       this._gameGroup.addChild(this.bgComp);
       this.bgComp.visible = false;

       let asset = 'slideBar_' + this._asset;
       this.item = new Phaser.Image(this._game, _xPos, _yPos, this._key, asset);
       this._gameGroup.addChild(this.item);

       let assetComp = 'slideBarSelected_' + this._asset;
       this.itemComp = new Phaser.Image(this._game, _xPos, _yPos, this._key, assetComp);
       this._gameGroup.addChild(this.itemComp);
       this.itemComp.visible = false;

       this.checkMark = new Phaser.Image(this._game, _xPos, _yPos, this._key, 'ui_check');
       this._gameGroup.addChild(this.checkMark);
       this.checkMark.visible = false;

       for(let i = 0; i < 3; i++)
       {
           let numAsset = 'ui_number_' + (i + 1);
           let number = new Phaser.Image(this._game, _xPos + 58, _yPos + 58, this._key, numAsset);
           this._gameGroup.addChild(number);
           if(this.quantity !== (i+1)) number.visible = false;
           this.numberImg.push(number);

       }
    }

    quantityChange(idx) {

        if(this.complete) return;

        this.quantity--;
        for(let i = 0; i < 3; i++)
        {
            if(this.quantity !== (i+1)) this.numberImg[i].visible = false;
            else this.numberImg[i].visible = true;
        }

        if(this.quantity <= 0)
        {
            if(this.item)
            {
                this._gameGroup.removeChild(this.bg);
                this.bg.destroy();
                this.bgComp.visible = true;

                this._gameGroup.removeChild(this.item);
                this.item.destroy();

                this.bgComp.visible = true;
                this.itemComp.visible = true;
                this.checkMark.visible = true;

                //COMPLETE
                this.complete = true;
                GameConfig.TOTAL_CATEGORIES --;

                //POSTION CHANGE
                this._parent.positionChange(this.item);
                // this._positionChange();
                // console.log(GameConfig.TOTAL_CATEGORIES);
            }
        }

    }

    _positionChange() {

     /*   let arr = GameConfig.PURCHASE_ITEM_ARRAY;
        let idx = arr.indexOf(this);
        console.log('idx : ', idx);
        let pos = [];

        for(let i = 0; i<arr.length; i++)
        {
            pos.push(parseInt(arr[i].item.x));
        }

        console.log('pos : ', pos)

        for(let i = 0; i<arr.length; i++)
        {
            if(i > idx)
            {
                // arr[i].item.x =  arr[i - 1].item.x
                arr[i].item.x = parseInt(arr[i - 1].item.x);
                console.log(arr[i].item.x)
            }

        }*/

        // this.bgComp.x = 500;
        // this.itemComp.x = pos[pos.length - 1];
        // this.checkMark.x = pos[pos.length - 1];

        // GameConfig.PURCHASE_ITEM_ARRAY.splice(idx, 1);
        // GameConfig.PURCHASE_ITEM_ARRAY.push(this);

    }

}