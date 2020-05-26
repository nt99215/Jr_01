import ResourceKey from "../const/ResourceKey";
import GameConfig from "../../data/GameConfig";

window.PIXI = require('phaser-ce/build/custom/pixi');
window.p2 = require('phaser-ce/build/custom/p2');
window.Phaser = require('phaser-ce/build/custom/phaser-split');
const win = window;
export default class Boot extends Phaser.State {
    init(...args) {
        this.game.stage.backgroundColor = 0x0000;
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.pageAlignVertically = true;
        this.game.scale.pageAlignHorizontally = true;
        this.game.input.maxPointers = 1;

        this.game.scale.refresh();

        this.game.time.advancedTiming = true;
        this.game.time.desiredFps = 60;
        this.game.time.slowMotion = 1.0;
        // console.log('BOOT');
    }

    preload() {
        this.game.load.image(ResourceKey.BOOT_LOADING_BACK, './asset/game/image/preLoadingBg.png');
        window.onblur = () => {
            if(this._appCheck()) GameConfig.GAME_FOCUS = false;
        };
        window.onfocus = () => {
            if(this._appCheck())  GameConfig.GAME_FOCUS = true;
        };
    }

    _appCheck() {
        if (this.game.device.android && navigator.userAgent.indexOf('NAVER(inapp') !== -1) return true;
        else return false;
    }

    create() {
        // ResourceKey.data = this.game.cache.getJSON(ResourceKey.PRELOAD_RESOURCE);
        this.loadLoadingImg();
        this.resize();

    }

    resize () {
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

    loadLoadingImg(){

        this.game.load.atlasJSONHash(ResourceKey.PRELOAD_RESOURCE, './asset/game/image/loading.png', './asset/game/image/loading.json');
        this.game.load.onLoadComplete.addOnce(()=> {
            setTimeout(()=> {
                this.game.state.start('Preloader', true, false);
            }, 500);
        }, this);

        this.game.load.start();
    }

    render() {
    }

    update() {

    }




}