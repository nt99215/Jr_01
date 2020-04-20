import AssetKey from "../data/AssetKey";
import GameConfig from "../data/GameConfig";
import SoundManager from "./SoundManager";
import SoundAssetKey from "../data/SoundAssetKey";
import CornerMain from "../view/corner/CornerMain";

export default class CornerManager extends Phaser.Group{
    constructor(game, parent) {
        super(game);
        this._game = game;
        this._bgGroup = this._game.add.group();
        this._chapterGroup = this._game.add.group();
        this._buttonGroup = this._game.add.group();
        this._parent = parent;
        this.key = null;
        this.chapter = null;

        this._createCorner(GameConfig.CURRENT_CHAPTER);
    }

    _createCorner(num) {

        if(this.chapter !== null)
        {
            this.chapter._destroy();
            this.chapter = null;
        }

        this.chapter = new CornerMain(this._game, this);
        this.chapter._setting(this._bgGroup, this._chapterGroup, this._buttonGroup);

    }

    _createPos() {
        if(this.chapter) this.chapter = null;
        console.log('pos');
    }


    _update() {

        this._objectVisibleHandler();
        if(this.chapter) this.chapter._update();

    }

    _createController() {
        this._parent._createController();
    }


    _end() {
        GameConfig.GAME_FINISH = true;
        this._destroy();
    }



    _objectPause() {
        GameConfig.IN_GAME = false;
        for(let i = 0; i<this._bgGroup.length; i++) {
            this._bgGroup.children[i].visible = false;
        }
        this.chapter._objectPause();
    }

    _objectReplay() {

        GameConfig.IN_GAME = true;
        for(let i = 0; i<this._bgGroup.length; i++) {
            this._bgGroup.children[i].visible = true;
        }
        this.chapter._objectReplay();


    }

    _objectVisibleHandler() {
        //OBJECT CHECK
        if(GameConfig.GAME_FOCUS)
        {
            if(GameConfig.UPDATE_OBJECT)
            {
                if(GameConfig.UPDATE_OBJECT) GameConfig.UPDATE_OBJECT.visible = false;
            }


        }
        else
        {
            if(GameConfig.UPDATE_OBJECT)
            {
                if(! GameConfig.UPDATE_OBJECT.visible) GameConfig.UPDATE_OBJECT.visible = true;
            }

        }
    }

    _destroy() {
      /*  if(! GameConfig.IN_GAME)
        {
            this._bgGroup.removeChildren(0, this._bgGroup.length);
        }*/
        // if(this._chapterGroup) this._chapterGroup.removeChildren(0, this._chapterGroup.length);
        this._bgGroup.removeChildren(0, this._bgGroup.length);

    }


}