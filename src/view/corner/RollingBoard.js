export default class RollingBoard {
    constructor(game, group, key, asset, num, arr = null) {
        this._game = game;
        this._gameGroup = group;
        this._key = key;
        this._category = asset;
        this._num = num;
        this._board = null;
        this._categoryButton = [];
        this._arr = arr;
        this._init();

    }

    _init() {

        let assetName = 'corner_' + this._category + '_' + this._num;
        this._board = new Phaser.Image(this._game, 0, 0, this._key, assetName);
        this._gameGroup.addChild(this._board);

        if(this._arr === null) return;

       /* for(let i = 0; i < this._arr.length; i++)
        {
            let asset = 'area_' + this._arr[i];
            let btn = new Phaser.Image(this._game, 0, 0, this._key, asset);
            this._categoryButton.push(btn);
            this._gameGroup.addChild(btn);
        }*/

    }

    btnPosReset() {
        for(let i = 0; i < this._categoryButton.length; i++)
        {
            this._categoryButton[i].x = this._board.x;
            this._categoryButton[i].y = this._board.y;
            this._categoryButton[i].visible = this._board.visible;
        }
    }

    _destroy() {
        // this._gameGroup.removeChildren(0, this._gameGroup.length);
        if(this._board) this._board.destroy();
        for(let i = 0; i < this._categoryButton.length; i++)
        {
            this._gameGroup.removeChild(this._categoryButton[i]);
            this._categoryButton[i].destroy();
        }
        this._categoryButton = [];
    }

}