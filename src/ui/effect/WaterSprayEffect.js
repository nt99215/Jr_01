import AssetKey from "../../data/AssetKey";

let _assetKey, _effectAsset, _quantity, _angle;
export default class WaterSprayEffect{
    constructor(game, xPos, yPos, radius = 40, assetKey, effectAsset, quantity = 3) {
        this.game = game;
        this.xPos = xPos;
        this.yPos = yPos;
        this.radius = radius;
        _assetKey = assetKey;
        _effectAsset = effectAsset;
        _quantity = quantity;

        this._create();
    }

    _create() {

        for(let i = 0; i<_quantity; i++) {
            let img = this.game.add.image(0, 0, _assetKey, _effectAsset);
            let sN = this.game.rnd.integerInRange(4, 10)/10;
            img.scale.setTo(sN, sN);
            img.angle = _angle;
            let rN = this.game.rnd.integerInRange(-15, 15);
            this.showEffect(img, this.xPos +rN, this.yPos + rN, i);
            // console.log(img.angle)
        }
    }

    showEffect(sprite, x, y, i) {
        let ix = x;
        let iy = y;
        // let rndPositionAngle = Math.random()*240 - 30;   // 위치 각도
        // let rndPositionAngle = (Math.random() * 4/3 * Math.PI) + (5/6 * Math.PI) ;   // 위치 각도 0~240 - 150
        // let rndPositionAngle = (Math.random() * 1/4 * Math.PI) + (1/4 * Math.PI * i);   // 위치 각도
        let rndPositionAngle = Math.random()*240 - 30;   // 위치 각도
        let rndAlphabetAngle = Math.random()*15;   // 알파벳 각도
        // let rndRadius = Math.random() * 30 + this.radius;
        let rndRadius = 120;

        // console.log(rndPositionAngle);

        sprite.x = ix + rndRadius * Math.cos(rndPositionAngle);
        sprite.y = iy + rndRadius * Math.sin(rndPositionAngle);

        if(rndRadius * Math.cos(rndPositionAngle) < 0) {
            sprite.angle = rndAlphabetAngle * (-1);
        }
        else {
            sprite.angle = rndAlphabetAngle;
        }

        let tween0 = this.game.add.tween(sprite).from({alpha: 0.4, x: x, y: y}, 300, Phaser.Easing.Linear.Out, true, 0);
        let tween1 = this.game.add.tween(sprite).to({alpha: 0}, 300, Phaser.Easing.Linear.Out, true, 200);
        tween1.onComplete.add( () => {
            //sprite.kill();
            sprite.destroy();
        }, this);
        let tween2 = this.game.add.tween(sprite.scale).to({x: 0.5, y: 0.5, alpha:0}, 300, Phaser.Easing.Linear.Out, true, 200);

    }

}