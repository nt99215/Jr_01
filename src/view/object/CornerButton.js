import SoundAssetKey from "../../data/SoundAssetKey";
import AssetKey from "../../data/AssetKey";
import GameConfig from "../../data/GameConfig";
import SoundManager from "../../manager/SoundManager";


const _delay = [
    [],
    [100, 143, 'VEGETABLE'],
    [100, 150, 'SEAFOOD'],
    [90, 135, 'MEAT'],
    [140, 180, 'NECESSARY'],
    [110, 150, 'DAIRY'],
    [110, 170, 'SNACK'],
    [360, 270, 'NOTYET'],
    [75, 117, 'COUNTER'],
];
export default class CornerButton{
    constructor(game, group, asset, x, y, parent, num, counterDummy = false) {
        this._game = game;
        this._gameGroup = group;
        this._key = AssetKey.MAIN_DISPLAY_ASSET;
        this._asset = asset;
        this._btn = null;
        this._xPos = x;
        this._yPos = y;
        this._parent = parent;
        this._num = num;
        this._count = 0;
        this._selected = false;
        this._delayTime = null;
        this._counterDummy = counterDummy;
        this._init();

    }

    _init() {
        let bgAsset = 'display_' + this._asset;
        this._bg = new Phaser.Image(this._game, this._xPos, this._yPos, this._key, bgAsset);
        this._gameGroup.addChild(this._bg);

        let base = 'btn_' + this._asset  + '_title_default';
        let over = 'btn_' + this._asset  + '_title_over';
        this._btn = this._gameGroup.add(this._game.make.button(this._xPos,this._yPos,  this._key, this._onSelect.bind(this), this, over, base, over, base));
        // this.soundOffBtnSound = null;
        // this._buttonSndPlay(SoundAssetKey.BUTTON_SOUND, this.soundOffBtnSound, this._btn);

    }

    _sndPlay() {
        SoundManager.instance.effectSoundStop(GameConfig.CURRENT_GUIDE_SOUND, 0.8, false, true);
        SoundManager.instance.effectSoundStop(GameConfig.CURRENT_BUTTON_SOUND, 0.8, false, true);
        let sndAsset = 'btnSnd_corner_' + this._asset + '_';
        let rN = this._game.rnd.between(1, 2);
        let snd = sndAsset + rN;
        SoundManager.instance.effectSound(snd);
        GameConfig.CURRENT_BUTTON_SOUND = snd;
        this._delayTime = parseInt(_delay[this._num][rN - 1] * 0.6);
    }

    _onSelect() {
        // SoundManager.instance.effectSoundContinuance(SoundAssetKey.BUTTON_SOUND);
        this._sndPlay();
        if(this._counterDummy) return;
        this._btn.inputEnabled = false;
        this._selected = true;
        this._parent._cornerButtonEnable(true, this._num, true);

    }

    _buttonSndPlay(sndKey, snd, btn) {
        if(!GameConfig.SOUND_ENABLED) return;
        snd = this._game.add.audio(sndKey);
        btn.setDownSound(snd);
    }

    _visible(bool) {
        this._bg.visible = bool;
        this._btn.visible = bool;
    }

    _btnDisable() {
        this._btn.inputEnabled = false;
        if(this._counterDummy) return;
        this._bg.tint = 0x525252;
        this._btn.tint = 0x525252;
    }

    _btnEnable() {
        this._btn.inputEnabled = true;
        if(this._counterDummy) return;
        this._bg.tint = 0xffffff;
        this._btn.tint = 0xffffff;
    }

    _update() {

        if(this._counterDummy) return;

        if(this._selected) this._count++;
        else return;

        if(GameConfig.SOUND_ENABLED)
        {
            if(this._count > this._delayTime)
            {
                this._selected = false;
                this._parent._cornerGenerate(this._num);
                this._count = 0;
            }
        }
        else
        {
            this._selected = false;
            this._parent._cornerGenerate(this._num);
            this._count = 0;
        }

        // console.log(this._asset)
    }

    _destroy() {
        this._bg.destroy();
        this._btn.destroy();
        this._gameGroup.removeChildren(0, this._gameGroup.length);
    }

}