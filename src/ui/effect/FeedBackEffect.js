import AssetKey from "../../data/AssetKey";

let effectArr = [
    {asset: 'Blue', startX: 470, startY : 320, resultX: 379, resultY : 240},
    {asset: 'Red', startX: 420, startY : 322, resultX: 451, resultY : 222},
    {asset: 'Yellow', startX: 476, startY : 337, resultX: 440, resultY : 285}
    ];

export default class FeedBackEffect{
    constructor(game) {
        this._game = game;
        this._gameGroup = this._game.add.group();
        this._create();
    }

    _create(xTerm, yTerm) {

        for(let i = 0; i<effectArr.length; i++)
        {
            let eff = effectArr[i];
            let rT = this._game.rnd.integerInRange(700, 1200);
            let rS = this._game.rnd.integerInRange(0.1, 0.4);
            let img = new Phaser.Image(this._game, eff.startX + xTerm, eff.startY + yTerm, AssetKey.DEFAULT_GAME_ATLAS, AssetKey.FEEDBACK_EFFECT_PREFIX + eff.asset);
            img.anchor.setTo(0.5, 0.5);
            // console.log(rS)
            img.scale.setTo(rS, rS);
            img.alpha = 0;
            this._gameGroup.addChild(img);
            this._game.add.tween(img.scale).to({x:1, y:1}, rT, Phaser.Easing.Linear.Out, true, 0, 100, false);
            this._game.add.tween(img).to({x:eff.resultX + xTerm, y:eff.resultY + yTerm, alpha:1}, rT, Phaser.Easing.Linear.Out, true, 0, 100, false);
        }
    }

    _destroy() {
        this._gameGroup.removeChildren(0, this._gameGroup.length);
    }


}