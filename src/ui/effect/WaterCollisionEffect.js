
const maxY = 610;
export default class WaterCollisionEffect {

    constructor(game, group, key, asset, xPos, yPos, scale, term, quantity = 10) {
        this.game = game;
        // this.gameGroup = this.game.add.group();
        this.gameGroup = group;
        this.key = key;
        this.asset = asset;
        this.xPos = xPos;
        this.yPos = yPos;
        this.scale = scale;
        this.term = term;
        this.quantity = quantity;
        this._create();
    }

    _create() {

        for(let i = 0; i<this.quantity; i++) {
            let num = this.game.rnd.between(1, 4);
            let asset = 'mountainFire_waterDrop_' + num;
            let img = new Phaser.Image(this.game, 0, 0, this.key, asset);
            img.anchor.setTo(0.5, 0.5);
            img.scale.setTo(this.scale, this.scale);
            this.gameGroup.addChild(img);
            this.showEffect(img, this.xPos, this.yPos, i, true);
        }
    }

    showEffect(sprite, x, y, i, rot = false) {
        let ix = x;
        let iy = y;
        let rndPositionAngle = (Math.random() * 1/4 * Math.PI) + (1/4 * Math.PI * i);
        // let rndAlphabetAngle = Math.random()*15;
        // let rndRadius = Math.random() * 30 + 210;

        let rndRadius = Math.random() * 10 + this.term;

        sprite.alpha = 1;
        sprite.x = ix + rndRadius * Math.cos(rndPositionAngle);
        sprite.y = iy + rndRadius * Math.sin(rndPositionAngle);
        // console.log(sprite.y)
        if(sprite.y > maxY) sprite.visible = false;

        // if(rndRadius * Math.cos(rndPositionAngle) < 0) sprite.angle = rndAlphabetAngle * (-1);
        // else sprite.angle = rndAlphabetAngle;
        // sprite.rotation = i * 17;

        this.game.add.tween(sprite).from({x: x, y: y}, 500, Phaser.Easing.Exponential.Out, true, 0);

        if(rot)
        {
            // let angleNum = this.game.rnd.integerInRange(180, 720);
            // this.game.add.tween(sprite).to({angle: angleNum}, 1500, Phaser.Easing.Quartic.Out, true, 0);
        }

        let scaleNum = this.game.rnd.between(3, 9)/10;
        this.game.add.tween(sprite.scale).to({x:scaleNum, y:scaleNum}, 1000, Phaser.Easing.Quartic.Out, true, 0);

        let tween3 = this.game.add.tween(sprite).to({alpha:0}, 300, Phaser.Easing.Quartic.Out, true, scaleNum * 100);
        tween3.onComplete.add( () => {
            sprite.destroy();
        }, this);

    }

    _destroy() {

        this.gameGroup.removeChildren(0, this.gameGroup.length);
    }

}


