
let _assetArr = [
    'tutor_4_bit_4', 'tutor_4_bit_3', 'tutor_4_star', 'tutor_4_bit_1', 'tutor_4_star','tutor_4_bit_2',
    'tutor_4_bit_3', 'tutor_4_star', 'tutor_4_bit_2',  'tutor_4_bit_5', 'tutor_4_bit_6'
];

export default class TutorialEndingEffect {

    constructor(game, key, xPos, yPos, group) {
        this.game = game;
        this.gameGroup = this.game.add.group();
        // this.gameGroup = group;
        this.key = key;
        this.xPos = xPos;
        this.yPos = yPos;
        this._create();
    }

    _create() {

        for(let i = 0; i<10; i++) {
            // let num = this.game.rnd.integerInRange(0, 3);
            let img = new Phaser.Image(this.game, 0, 0, this.key, _assetArr[i]);
            img.anchor.setTo(0.5, 0.5);
            img.scale.setTo(0.3, 0.3);
            this.gameGroup.addChild(img);
            let str =  _assetArr[i].substr(_assetArr[i].length - 1, 1);
            let rotationEnable = false
            if(str === 'r') rotationEnable = true;
            this.showEffect(img, this.xPos, this.yPos, i, rotationEnable);
        }
    }

    showEffect(sprite, x, y, i, rot = false) {
        let ix = x;
        let iy = y;
        let rndPositionAngle = (Math.random() * 1/4 * Math.PI) + (1/4 * Math.PI * i);
        // let rndAlphabetAngle = Math.random()*15;
        let rndRadius = Math.random() * 30 + 210;

        sprite.alpha = 1;
        sprite.x = ix + rndRadius * Math.cos(rndPositionAngle);
        sprite.y = iy + rndRadius * Math.sin(rndPositionAngle);

        // if(rndRadius * Math.cos(rndPositionAngle) < 0) sprite.angle = rndAlphabetAngle * (-1);
        // else sprite.angle = rndAlphabetAngle;
        sprite.rotation = i * 17;

        this.game.add.tween(sprite).from({x: x, y: y}, 500, Phaser.Easing.Exponential.Out, true, 0);

        if(rot)
        {
            let angleNum = this.game.rnd.integerInRange(180, 720);
            this.game.add.tween(sprite).to({angle: angleNum}, 1500, Phaser.Easing.Quartic.Out, true, 0);
        }

        let scaleNum = this.game.rnd.integerInRange(7, 13)/10;
        this.game.add.tween(sprite.scale).to({x:scaleNum, y:scaleNum}, 1000, Phaser.Easing.Quartic.Out, true, 0);

        let tween3 = this.game.add.tween(sprite).to({alpha:0}, 300, Phaser.Easing.Quartic.Out, true, 500);
        tween3.onComplete.add( () => {
            sprite.destroy();
        }, this);

    }

    _destroy() {

        this.gameGroup.removeChildren(0, this.gameGroup.length);
    }

}


