export default class Dimmed{
    constructor(game, color = 0x000000, alpha = 0.6) {
        // super(game)

        this._game = game;
        this._color = color;
        this._alpha = alpha;
        // this._gameGroup = this._game.add.group();
        this.graphics =  new Phaser.Graphics(this._game, 0, 0);
        this.graphics.beginFill(this._color, this._alpha);
        this.graphics.drawRect(0, 0, 1280, 720);
        this.graphics.endFill();

        this.graphics.inputEnabled = true;
        this.graphics.events.onInputDown.add(this._inputDummy, this);

    }

    _inputDummy() {

    }

}