
export default class ToolBox extends Phaser.Sprite{
    constructor(game, xPos, yPos, key, asset) {
        super(game, xPos, yPos, key, asset);
        this._game = game;
        new Phaser.Sprite(this._game, xPos, yPos, key, asset);
    }

    _init() {

    }

}