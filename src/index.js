import Boot from "./loader/state/Boot";
import Preloader from "./loader/state/Preloader";
import Main from "./loader/state/Main";
import GameInfo from "./loader/const/GameInfo";
import SoundManager from "./manager/SoundManager";
import LoadManager from "./loader/manager/LoadManager";
import ScreenManager from "./loader/manager/ScreenManager";

export default class index extends Phaser.Game {
    constructor(targetElementId, w, h, debug = false, from) {
        let cfg = {
            width: w,
            height: h,
            renderer: Phaser.CANVAS,
            parent: targetElementId,
            multiTexture: true,
            enableDebug: debug
        };

        GameInfo.GAME_WIDTH = w;
        GameInfo.GAME_HEIGHT = h;
        GameInfo.GAME_DEBUG = debug;
        GameInfo.GAME_RENDER_TYPE = cfg.renderer;

        super(cfg);

        new SoundManager(this);
        new LoadManager(this);
        let sm = new ScreenManager(this);
        sm.init();


        this.state.add('Boot', Boot, false);
        this.state.add('Preloader', Preloader, false);
        this.state.add('Main', Main, false);
        this.state.start('Boot');



    }

}

function resize () {
    if(window.nts.index) {
        const ww = win.innerWidth;
        const hh = win.innerHeight;

        // var debugs:any = document.getElementById("debugs");
        // debugs.value += "\n"+"w : "+ww + " H : " +hh;

        if(win.nts.winSize && win.nts.winSize.ww ==ww && win.nts.winSize.hh == hh) return;
        win.nts.winSize = {ww:ww, hh:hh};

        let w = 1280;
        let h = 720;
        const scale = Math.min(ww/w, hh/h);
        w = Math.round(w * scale);
        h = Math.round(h * scale);
        const marginTop = (hh - h) >> 1;
        const marginLeft = (ww - w) >> 1;

        window.nts.index.canvas.setAttribute('style',
            `display:block; -ms-transform: scale(${scale}); 
        -webkit-transform: scale3d(${scale}, 1);
         -moz-transform: scale(${scale}); 
         -o-transform: scale(${scale}); 
         transform: scale(${scale});
         transform-origin: top left;
         margin-left: ${marginLeft}px; margin-top: ${marginTop}px;
         `
        );
        window.nts.index.scale.setGameSize(1280,720);
    }

    console.log("A~~~~~~~~~~~~")
}

const win = window;
window.nts = {};
window.nts.index = new index('main_doc', 1280, 720);

/*
if(window.nts.index.isBooted ) {
    resize ();
}

window.nts.index.events.add(()=> {
    resize();
});*/
