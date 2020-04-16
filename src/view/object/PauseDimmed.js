import GameConfig from "../../data/GameConfig";
import SoundManager from "../../manager/SoundManager";

export default class PauseDimmed{
    constructor(game, group, color = 0x000000, alpha = 0.6) {
        PauseDimmed.instance = this;

        this._game = game;
        this._gameGroup = this._game.add.group();
        // this._dimmedGroup = this._game.add.group();
        this._color = color;
        this._alpha = alpha;

    }

    _init(group) {

        this.graphics =  new Phaser.Graphics(this._game, 0, 0);
        this.graphics.beginFill(this._color, this._alpha);
        this.graphics.drawRect(0, 0, 1280, 720);
        this.graphics.endFill();
        this._gameGroup = group;
        this._gameGroup.addChild(this.graphics);

        this.graphics.inputEnabled = true;
        this.graphics.events.onInputDown.add(this._inputDummy, this);
        this.graphics.visible = false;
        GameConfig.UPDATE_OBJECT = this.graphics;

    }
    _inputDummy() {

    }

    _destroy() {
        this._gameGroup.removeChildren(0, this._gameGroup.length);
    }

}

PauseDimmed.instance = null;