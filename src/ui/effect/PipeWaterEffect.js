
let _assetKey, _effectAsset, _quantity, _scale;


export default class PipeWaterEffect{
    constructor(game, group, direction = 'right', stXpos, stYpos, endXpos, endYpos, radius = 40, assetKey, effectAsset, quantity = 3, scale = 1) {
        this.game = game;
        this.gameGroup =  group;
        this.direction = direction;
        this.stXpos = stXpos;
        this.stYpos = stYpos;
        this.endXpos = endXpos;
        this.endYpos = endYpos;
        this.radius = radius;
        _assetKey = assetKey;
        _effectAsset = effectAsset;
        _quantity = quantity;
        _scale = scale;

        this._create();
    }

    _create() {
        for(let i = 0; i<_quantity; i++) {
            let img = new Phaser.Image(this.game, 0, 0, _assetKey, _effectAsset);
            this.gameGroup.addChild(img);
            img.anchor.setTo(0.5, 0.5);
            img.scale.setTo(_scale, _scale);
            this.showEffect(img, this.stXpos, this.stYpos, i);
        }
    }

    showEffect(sprite, x, y, i) {
        let ix = x + this.game.rnd.integerInRange(-15, 15);
        let iy = y;
        // let rndPositionAngle = Math.random()*240 - 30;   // 위치 각도
        // let rndPositionAngle = (Math.random() * 4/3 * Math.PI) + (5/6 * Math.PI) ;   // 위치 각도 0~240 - 150
        // let rndPositionAngle = (Math.random() * 1/4 * Math.PI) + (1/4 * Math.PI * i);   // 위치 각도
        let rndPositionAngle = Math.random() * 240;   // 위치 각도
        let rndAlphabetAngle = Math.random() * 15;   // 알파벳 각도
        let rndRadius = Math.random() * 30 + this.radius;

        sprite.alpha = 1;
        sprite.x = ix + rndRadius * Math.cos(rndPositionAngle);
        sprite.y = iy + rndRadius * Math.sin(rndPositionAngle);

        if(rndRadius * Math.cos(rndPositionAngle) < 0) sprite.angle = rndAlphabetAngle * (-1);
        else sprite.angle = rndAlphabetAngle;


        // this.directionHandler(this.direction);
        this.game.add.tween(sprite).from({alpha: 0.7, x: this.stXpos + this.endXpos, y: this.stYpos + this.endYpos}, 500, Phaser.Easing.Linear.In, true, 0);
        let tween1 = this.game.add.tween(sprite).to({alpha: 0}, 300, Phaser.Easing.Linear.In, true, 200);
        tween1.onComplete.add( () => {
            //sprite.kill();
            sprite.destroy();
        }, this);

        this.game.add.tween(sprite.scale).to({x: 0.5, y: 0.5}, 300, Phaser.Easing.Linear.Out, true, 200);

    }

}