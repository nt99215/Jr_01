import GameConfig from "../../data/GameConfig";
import SoundManager from "../../manager/SoundManager";
import SoundAssetKey from "../../data/SoundAssetKey";
import StarEffect from "./StarEffect";
import AssetKey from "../../data/AssetKey";

export default class BackGroundTouchEffect {
    constructor(game) {
        BackGroundTouchEffect.instance = this;
    }

    effect(game, xPos, yPos, radius, type = null, soundAsset = SoundAssetKey.BASIC_TOUCH_SOUND) {
        if(! GameConfig.IN_GAME) return;
        SoundManager.instance.effectSound(soundAsset, 0.4);
        new StarEffect(game, xPos, yPos, AssetKey.DEFAULT_GAME_ATLAS, 'intro_twinkle', radius);
    }

}