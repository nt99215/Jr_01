
export default class PipeConnectEffect{
    constructor(game, xPos, yPos, key, asset, radius = 40) {
        this.game = game;
        this.xPos = xPos;
        this.yPos = yPos;
        this.radius = radius;
        this.key = key;
        this.asset =  asset;

        this._create();
    }

    _create() {

        for(let i = 0; i<10; i++) {
            let img = this.game.add.image(0, 0, this.key, this.asset);
            // img.scale.setTo(0.7, 0.7)
            this.showEffect(img, this.xPos, this.yPos, i);
        }
    }

    showEffect(sprite, x, y, i) {
        let ix = x;
        let iy = y;
        // let rndPositionAngle = Math.random()*240 - 30;   // 위치 각도
        // let rndPositionAngle = (Math.random() * 4/3 * Math.PI) + (5/6 * Math.PI) ;   // 위치 각도 0~240 - 150
        let rndPositionAngle = (Math.random() * 1/4 * Math.PI) + (1/4 * Math.PI * i);   // 위치 각도
        let rndAlphabetAngle = Math.random()*15;   // 알파벳 각도
        let rndRadius = Math.random() * 30 + this.radius;
        // let rndRadius = 50;

        // console.log(rndPositionAngle);

        sprite.alpha = 1;
        sprite.x = ix + rndRadius * Math.cos(rndPositionAngle);
        sprite.y = iy + rndRadius * Math.sin(rndPositionAngle);

        if(rndRadius * Math.cos(rndPositionAngle) < 0) {
            sprite.angle = rndAlphabetAngle * (-1);
        }
        else {
            sprite.angle = rndAlphabetAngle;
        }

        this.game.add.tween(sprite).from({alpha: 0.7, x: x, y: y}, 500, Phaser.Easing.Linear.In, true, 0);

        let tween1 = this.game.add.tween(sprite).to({alpha: 0}, 300, Phaser.Easing.Linear.In, true, 200);
        tween1.onComplete.add( () => {
            //sprite.kill();
            sprite.destroy();
        }, this);
        this.game.add.tween(sprite.scale).to({x: 0.5, y: 0.5}, 300, Phaser.Easing.Linear.Out, true, 200);

    }

}