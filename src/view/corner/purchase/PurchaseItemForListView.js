import AssetKey from "../../../data/AssetKey";
import GameConfig from "../../../data/GameConfig";

let _xPos, _yPos, _dotXpos, _dotYpos;

export default class PurchaseItemForListView {
    constructor(game, group, asset, quantity, xPos, yPos,  dotXpos, dotYpos) {
        this._game = game;
        this._gameGroup = group;
        this._key = AssetKey.PURCHASE_LIST_VIEW;
        this._asset = asset;
        this.quantity = quantity;
        this.startY = 0;
        this.complete = false;
        this.itemArr = [];
        _xPos = xPos;
        _yPos = yPos;
        _dotXpos = dotXpos;
        _dotYpos = dotYpos;
        this._init();
    }

    _init() {

        this.blit = new Phaser.Image(this._game, _dotXpos, _dotYpos, this._key, 'purchaseListDot');
        this._gameGroup.addChild(this.blit);

        for(let i = 0; i<this.quantity; i++)
        {
            let asset = 'purchase_' + this._asset;
            let x = _xPos + (127 + 4) * i;
            let item = new Phaser.Image(this._game, x, _yPos, this._key, asset);
            this._gameGroup.addChild(item);
            this.itemArr.push(item);

          /*  let dragRect = this._game.add.graphics(0, 0);
            dragRect.beginFill(0xff4400, 0.4);
            dragRect.drawRect(x, _yPos, item.width, item.height);
            dragRect.endFill();
            this._gameGroup.addChild(dragRect);
            this.itemArr.push(dragRect);*/
        }

    }

}