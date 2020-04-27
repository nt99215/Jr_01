import SoundAssetKey from "../../data/SoundAssetKey";
import AssetKey from "../../data/AssetKey";

export default class CornerButton{
    constructor(game, group, asset, x, y, parent, num) {
        this._game = game;
        this._gameGroup = group;
        this._key = AssetKey.MAIN_DISPLAY_ASSET;
        this._asset = asset;
        this._btn = null;
        this._xPos = x;
        this._yPos = y;
        this._parent = parent;
        this._num = num;
        this._init();
    }

    _init() {
        let bgAsset = 'display_' + this._asset;
        this._bg = new Phaser.Image(this._game, this._xPos, this._yPos, this._key, bgAsset);
        this._gameGroup.addChild(this._bg);

        let base = 'btn_' + this._asset  + '_title_default';
        let over = 'btn_' + this._asset  + '_title_over';
        this._btn = this._gameGroup.add(this._game.make.button(this._xPos,this._yPos,  this._key, this._onSelect.bind(this), this, over, base, over, base));
        this.soundOffBtnSound = null;
        this._buttonSndPlay(SoundAssetKey.BASIC_TOUCH_SOUND, this.soundOffBtnSound, this._btn);

    }

    _onSelect() {
        this._parent._cornerGenerate(this._num);
    }

    _buttonSndPlay(sndKey, snd, btn) {
        snd = this._game.add.audio(sndKey);
        btn.setDownSound(snd);
    }

    _visible(bool) {
        this._bg.visible = bool;
        this._btn.visible = bool;
    }

    _btnDisable() {
        this._btn.inputEnabled = false;
        this._bg.tint = 0x525252;
        this._btn.tint = 0x525252;
    }

    _destroy() {
        this._bg.destroy();
        this._btn.destroy();
        this._gameGroup.removeChildren(0, this._gameGroup.length);
    }

}