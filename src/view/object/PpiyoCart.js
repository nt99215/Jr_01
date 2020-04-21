import AssetKey from "../../data/AssetKey";
import SeparateAnimation from "./SeparateAnimation";

export default class PpiyoCart{
    constructor(game) {
        this._game = game;
        this._gameGroup = this._game.add.group();

        this._init();
    }

    _init() {

        this._ppiyoCart();
    }


    _ppiyoCart() {

        this.ppiyoHead = new SeparateAnimation(this._game, AssetKey.SLIDE_BAR_PPIYO, 'slide_ppiyo_', 86, 398, 1, 4, '', 0, 6, true);
        this._gameGroup.addChild(this.ppiyoHead);
        this.ppiyoHead._play();

        this.ppiyoBody = new Phaser.Image(this._game, 393, 619, AssetKey.SLIDE_BAR_PPIYO, 'slide_ppiyo_body_cut');
        this._gameGroup.addChild(this.ppiyoBody);
    }

    _visible(bool) {

        this._gameGroup.visible = bool;
    }

    _startDrag(obj) {

        console.log(parseInt(obj.x), parseInt(obj.y));

    }

    _destroy() {
        this._gameGroup.removeChildren(0, this._gameGroup.length);
        this.ppiyoHead._destroy();
        this.ppiyoBody.destroy();
    }

}