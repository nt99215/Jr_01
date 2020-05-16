export default class RollingBoard {
    constructor(game, bgGroup, group, key, asset, num, arr = null, effectArr = null, suffix = '') {
        this._game = game;
        this._bgGroup = bgGroup;
        this._gameGroup = group;
        // this._categoryGroup = this._game.add.group();
        this._key = key;
        this._category = asset;
        this._num = num;
        this._suffix = suffix;
        this._board = null;
        this._categoryButton = [];
        this._categoryImage = [];
        this._arr = arr;
        this._sndEffectQuantity = effectArr;
        this._init();
    }

    _init() {

        let assetName = 'corner_' + this._category + '_' + this._num;
        this._board = new Phaser.Image(this._game, 0, 0, this._key, assetName);
        this._bgGroup.addChild(this._board);

        if(this._arr === null) return;

        for(let i = 0; i < this._arr.length; i++)
        {
            let asset = 'area_' + this._arr[i] + this._suffix;
            let btn = new Phaser.Image(this._game, 0, 0, this._key, asset);
            btn.categoryName = this._arr[i];
            btn.alpha = 0;


            let categoryImage = new Phaser.Image(this._game, 0, 0, this._key, btn.categoryName);
            categoryImage.visible = false;

            let sndPrefix = 'objSnd_' + this._category + '_' + btn.categoryName + '_';
            btn.sndPrefix = sndPrefix;
            btn.img = categoryImage;
            btn.sndEffectQuantity = this._sndEffectQuantity[i];

            this._categoryButton.push(btn);
            this._gameGroup.addChild(btn);
            this._categoryImage.push(categoryImage);
            this._gameGroup.addChild(categoryImage);
        }

    }

    btnPosReset() {
        for(let i = 0; i < this._categoryButton.length; i++)
        {
            this._categoryButton[i].x = this._board.x;
            this._categoryButton[i].y = this._board.y;
            this._categoryButton[i].visible = this._board.visible;
            // this._categoryImage[i].visible = this._board.visible;
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

        for(let i = 0; i < this._categoryImage.length; i++)
        {
            this._gameGroup.removeChild(this._categoryImage[i]);
            this._categoryImage[i].destroy();
        }
        this._categoryImage = [];
    }

}