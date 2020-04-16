import AssetKey from "../../data/AssetKey";

let xPos = [[9], [78, 998], [354]];
let yPos = [[226], [322, 299], [421]];
let moveX = [[700], [830, 690], [224]];
let moveY = [[540], [521, 490], [608]];

let xTerm = 132;
let yTerm = 138;
let circle, hand;

export default class GuideView extends Phaser.Group{
    constructor(game) {
        super(game);
        this._game = game;
        this._gameGroup = this._game.add.group();
    }

    _guidePop(chapter, phase = 0) {
        let x = xPos[chapter - 1][phase];
        let y = yPos[chapter - 1][phase];
        let mX = moveX[chapter - 1][phase];
        let mY = moveY[chapter - 1][phase];
        // console.log(x, y);

        circle = new Phaser.Image(this._game, 0, 0, AssetKey.DEFAULT_GAME_ATLAS, AssetKey.GUIDE_CIRCLE);
        circle.anchor.setTo(0.5, 0.5);
        circle.alpha = 0;
        circle.x = x + circle.width/2;
        circle.y = y + circle.height/2;
        circle.scale.setTo(0.1, 0.1);
        this._gameGroup.addChild(circle);

        this._game.add.tween(circle.scale).to({x:1.1, y:1.1}, 1000, Phaser.Easing.Bounce.Out, true, 0, 0, false );
        this._game.add.tween(circle).to({alpha:1}, 1000, Phaser.Easing.Bounce.Out, true, 0, 1000, false );

        hand = new Phaser.Image(this._game, 0, 0, AssetKey.DEFAULT_GAME_ATLAS, AssetKey.GUIDE_HAND);
        hand.anchor.setTo(0.5, 0.5);
        hand.alpha = 0;
        hand.x = x + hand.width/2 + xTerm;
        hand.y = y + hand.height/2 + yTerm;
        hand.scale.setTo(0.5, 0.5);
        this._gameGroup.addChild(hand);
        this._game.add.tween(hand).to({alpha:1}, 500, Phaser.Easing.Linear.Out, true, 800, 0, false );
        this._game.add.tween(hand.scale).to({x:1.2, y:1.2}, 500, Phaser.Easing.Bounce.Out, true, 800, 0, false );
        let tw = this._game.add.tween(hand).to({x:mX, y:mY}, 1500, Phaser.Easing.Linear.None, true, 1500, 100, false );

    }

    _objectPause() {
        for(let i=0; i<this._gameGroup.children.length; i++)
        {
            this._gameGroup.children[i].visible = false;
        }

    }

    _objectReplay() {
        for(let i=0; i<this._gameGroup.children.length; i++)
        {
            this._gameGroup.children[i].visible = true;
        }
    }

    _destroy() {
        this._gameGroup.removeChildren(0, this._gameGroup.length);
        this.destroy(true);
    }

}