
let xPos = [457, 473, 832, 845];
let yPos = [394, 431, 328, 363];
let scale = [0.5, 1, 0.5, 1];
let time = [1500, 2200, 1600, 2000];
export default class IntroEffect {
    constructor(game, key) {
        this.game = game;
        this.gameGroup = this.game.add.group();
        this.key = key;
        this._create();
    }

    _create() {

        for(let i = 0; i<xPos.length; i++) {
            // let num = this.game.rnd.integerInRange(0, 3);
            let img = new Phaser.Image(this.game, xPos[i], yPos[i], this.key, 'intro_twinkle');
            img.alpha = 0;
            img.anchor.setTo(0.5, 0.5);
            let scaleNum = this.game.rnd.integerInRange(3, 10)/10;
            img.scale.setTo(scaleNum, scaleNum);
            this.gameGroup.addChild(img);

            this.game.add.tween(img.scale).to({x:scale[i], y:scale[i]}, time[i], Phaser.Easing.Quartic.Out, true, scaleNum * 1000, 1000, false);
            this.game.add.tween(img).to({alpha:0.8}, time[i], Phaser.Easing.Quartic.Out, true, scaleNum * 1000, 1000, false);
        }
    }

    _destroy() {
        this.gameGroup.removeChildren(0, this.gameGroup.length);
    }

}


