import WaterSprayEffect from "../../ui/effect/WaterSprayEffect";
import AssetKey from "../../data/AssetKey";

let thisAssetKey, thisAssetName, thisRate, thisLoop, thisAni, thisSubAni;

export default class SeparateAnimation extends Phaser.Sprite{
    constructor(game, assetKey, assetName, xPos, yPos, start, stop, suffix, zeroPad, desireRate = 10, loop = true) {
        super(game, 0, 0, assetKey);

        // this.anchor.setTo(0.5, 0.5);
        this._game = game;
        thisAssetKey = assetKey;
        thisAssetName = assetName;
        thisRate = desireRate;
        thisLoop = loop;
        thisAni = this.animations.add(assetName, Phaser.Animation.generateFrameNames(assetName, start, stop, suffix, zeroPad),  desireRate, loop);
        // this.animations.play(assetName, desireRate);
        this._stop();
        this.x = xPos;
        this.y = yPos;
    }

    _stop() {
        thisAni.stop(true);
    }

    _play() {
        thisAni.play();
    }

    _frameChange(assetName, start, stop, suffix, zeroPad, desireRate, loop) {
        thisAni = this.animations.add(assetName, Phaser.Animation.generateFrameNames(assetName, start, stop, suffix, zeroPad),  desireRate, loop);
        thisAni.play();
    }

    _frameAdd(assetName, start, stop, suffix, zeroPad, desireRate, loop) {
        thisSubAni = this.animations.add(assetName, Phaser.Animation.generateFrameNames(assetName, start, stop, suffix, zeroPad), desireRate, loop);
        thisSubAni.play();
    }

    _destroy() {
        this.animations.destroy();
    }


}