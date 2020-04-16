let water;
let waterStroke;
let maskShape;
let mask;
let numRotatingRoundedRects = 35;
let rotatingRoundedRects = [];
let rotatingRoundedRectsContainer;

export default class WaterStackEffect extends Phaser.BitmapData{
    constructor(game) {
        super(game);
        this._game = game;

        this._init();
    }


    _init() {

      /*  let g = this._game,
            r = g.renderer,
            w = r.width,
            h = r.height;

        maskShape = this._game.add.graphics();
        maskShape.setPosition(w/2,h/3)
        maskShape.fillStyle(0x333333, 1)
        maskShape.fillRoundedRect(0,0,w/4,w/4,{tl:0,tr:w/8,bl:w/8,br:w/8})
        maskShape.setAngle(45);


        mask = new Phaser.Display.Masks.BitmapMask(this, maskShape);

        water = this._game.add.graphics();
        water.fillStyle(0x1155ae)
        water.fillRect(0,0,w,h)

        //water.setMask(mask);

        for (let i = 0; i<numRotatingRoundedRects; i++)
        {
            rotatingRoundedRects.push(this._game.add.graphics(w/2,h/3))

            let rrr = rotatingRoundedRects[i],
                cr = w/9

            rrr.setPosition(w/numRotatingRoundedRects*i,h/6*(Math.random()*0.05+0.95))
            rrr.fillStyle(0xffffff, 0.85)
            rrr.fillRoundedRect(-w/8,-w/8,w/4,w/4,{tl:cr,tr:cr,bl:cr,br:cr})


            rrr.rang = Math.random() * 360
            rrr.rangrate = Math.random() * 10 + 10
        }


        rotatingRoundedRectsContainer = this._game.add.container().add(rotatingRoundedRects)
        rotatingRoundedRectsContainer.mask = mask

        waterStroke = this._game.add.graphics();

        waterStroke.setPosition(w/2,h/3)
        waterStroke.lineStyle( 10, 0x1155ae, 1)
        waterStroke.strokeRoundedRect(0,0,w/4,w/4,{tl:0,tr:w/8,bl:w/8,br:w/8})
        waterStroke.setAngle(45);

        waterStroke.setMask(mask)*/

    }

    _update() {

       /* for (let key in rotatingRoundedRects) {
            let rrr = rotatingRoundedRects[key]
            rrr.setAngle(rrr.rang + ((Date.now()/rrr.rangrate)%360))
        }

        rotatingRoundedRectsContainer.y = this._game.renderer.height*(Math.sin(Date.now()/5000)*0.15+0.18)*/

    }

}