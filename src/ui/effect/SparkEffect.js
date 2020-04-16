import SoundManager from "../../manager/SoundManager";
import SoundAssetKey from "../../data/SoundAssetKey";
import AssetKey from "../../data/AssetKey";

let effectKey, effectAsset, effectScale, effectQuantity, spriteInterval;
export default class SparkEffect{
    constructor(game, group, xPos, yPos, key, asset, scale = 1, quantity = 3,  interval = 3000, alpha = 1) {
        this._game = game;
        // this._gameGroup = this._game.add.group();
        this._gameGroup = group;
        this.xPos = xPos;
        this.yPos = yPos;
        this._scale = scale;
        this._alpha = alpha;
        this.obj = null;
        effectQuantity = quantity;
        effectKey = key;
        effectAsset = asset;
        effectScale = this._game.rnd.integerInRange(2, 10)/10 * this._scale;
        spriteInterval = parseInt(interval / quantity);


        this._create();
    }

    _create() {

        for(let i = 0; i<effectQuantity; i++) {
            let rot = this._game.rnd.integerInRange(0, (100 * this._scale));
            let img = new Phaser.Image(this._game, this.xPos + rot, this.yPos, effectKey, effectAsset);
            img.alpha = this._alpha;
            this.obj = img;
            this._gameGroup.addChild(img);
            img.visible = false;
            img.scale.setTo(effectScale, effectScale);
            let rT = i * spriteInterval;
            setTimeout(()=> {
                img.visible = true;
                this.showEffect(img, this.xPos + rot, this.yPos);
            }, rT);

        }
    }

    showEffect(sprite, x, y) {

        let rT = this._game.rnd.integerInRange(500, 1000);
        let tw = this._game.add.tween(sprite).to({alpha:0, x: x, y: y - rT/10}, rT, Phaser.Easing.Quartic.Out, true, 0, 0, false);
        sprite.angle = this._game.rnd.integerInRange(0, 180);
        tw.onComplete.add(()=> {
            sprite.destroy();
        })


    }

}