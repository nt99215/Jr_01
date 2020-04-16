import AssetKey from "../../data/AssetKey";

let xTerm = 45;
let yTerm = 72;
export default class FeedBackCloud {
    constructor(game) {
        this._game = game;
        this._gameGroup = this._game.add.group();
    }

    _init(asset, xPos, yPos) {
        // console.log(asset);
        let assetName = AssetKey.RESULT_TEXT_PREFIX + asset
        this.talkCloud = new Phaser.Image(this._game, xPos,  yPos, AssetKey.DEFAULT_GAME_ATLAS, AssetKey.TALK_CLOUD);
        this.talkCloudText = new Phaser.Image(this._game, this.talkCloud.x + xTerm,  this.talkCloud.y + yTerm, AssetKey.DEFAULT_GAME_ATLAS, assetName);
        this._gameGroup.addChild( this.talkCloud);
        this._gameGroup.addChild(this.talkCloudText);
    }

    _destroy() {
        this._gameGroup.removeChildren(0, this._gameGroup.length);
    }

}