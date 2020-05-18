let currentScene = null;
let chapter = 1;
const displaySlidingSpeed = 7000;

let guideEnable = true;
let chapterClear = false;

const defaultBgmVolume = 0.3;
// let bgmVolume = 0.3;
let bgmVolume = 0.001;
const reduceBgmVolume = 0.1;
const muteSoundVolume = 0.0001;

let currentFillObject = null;
let purchaseList = [];
let purchaseListEnable = true;
let purchaseItemArray = [];
let purchaseItemForListArray = [];
let totalCategories = 0;
let totalQuantity = 0;
let totalAmount = 0;

let introSnd = true;
let pause = true;
let device;
let scene = '';
let reset;
let soundEnabled = false;
let bgmEnabled = true;
let mainController;
let tutorialDisabled = false;
let pop = false;
let finish = false;
const guideRepeatTime = 2;

let gameFocus = true;
let updateObject = null;

let guideRemove = false;
let currentGuideSound = null;
let currentButtonSound = null;

let cheatOn = false;

let helpBtn = null;
let backBtn = null;
const appUrl = 'https://jr.msdl.naver.com/jrapp?cmd=close&type=webview&version=1';
const appEnabledString = 'app';
const webEnabledString = 'web';


export default class GameConfig {

    static get INTRO_SND_PLAY() {return introSnd; }
    static set INTRO_SND_PLAY(bool) {introSnd = bool; }
    static get CURRENT_SCENE() { return currentScene}
    static set CURRENT_SCENE(obj){currentScene = obj; }
    static get GAME_RESET() { return reset;}
    static set GAME_RESET(bool) { reset = bool;}
    static get SCENE_STATE() { return scene; }
    static set SCENE_STATE(str) {scene = str; }

    static get IN_GAME() { return pause; }
    static set IN_GAME(bool) { return pause = bool; }

    static get CURRENT_CHAPTER() { return chapter;}
    static set CURRENT_CHAPTER(num) { chapter = num;}

    static get CHAPTER_CLEAR() { return chapterClear;}
    static set CHAPTER_CLEAR(bool) { chapterClear = bool;}

    static get GUIDE_REMOVE() { return guideRemove; }
    static set GUIDE_REMOVE(bool) { guideRemove = bool; }

    static get SOUND_ENABLED() {return soundEnabled; }
    static set SOUND_ENABLED(bool) {soundEnabled = bool; }

    static get BGM_ENABLED() {return bgmEnabled; }
    static set BGM_ENABLED(bool) {bgmEnabled = bool; }


    static get CURRENT_DEVICE()  { return device; }
    static set CURRENT_DEVICE(str)  { device = str; }

    static get MAIN_CONTROLLER() { return mainController; }
    static set MAIN_CONTROLLER(obj) { mainController = obj; }

    static get TUTORIAL_DISABLED() {return tutorialDisabled ; }
    static set TUTORIAL_DISABLED(bool) {tutorialDisabled = bool;}

    static get CURRENT_FILL_OBJECT() { return currentFillObject; }
    static set CURRENT_FILL_OBJECT(obj) { currentFillObject = obj; }

    static get PURCHASE_LIST() { return purchaseList; }
    static set PURCHASE_LIST(arr) { purchaseList = arr; }

    static get PURCHASE_LIST_ENABLE() { return purchaseListEnable; }
    static set PURCHASE_LIST_ENABLE(bool) { purchaseListEnable = bool; }

    static get PURCHASE_ITEM_ARRAY() { return purchaseItemArray; }
    static set PURCHASE_ITEM_ARRAY(obj) { purchaseItemArray.push(obj); }
    static set PURCHASE_ITEM_ARRAY_RESET(arr) { purchaseItemArray = arr; }

    static get PURCHASE_ITEM_FOR_LIST_ARRAY() { return purchaseItemForListArray; }
    static set PURCHASE_ITEM_FOR_LIST_ARRAY(obj) { purchaseItemForListArray.push(obj); }
    static set PURCHASE_ITEM_FOR_LIST_ARRAY_RESET(arr) { purchaseItemForListArray = arr; }

    static get TOTAL_CATEGORIES() { return totalCategories; }
    static set TOTAL_CATEGORIES(num) { totalCategories = num; }

    static get TOTAL_QUANTITY() { return totalQuantity; }
    static set TOTAL_QUANTITY(num) { totalQuantity = num; }

    static get TOTAL_AMOUNT() { return totalAmount; }
    static set TOTAL_AMOUNT(num) { totalAmount = num; }

    static get POP_ENABLED() { return pop;}
    static set POP_ENABLED(bool) { pop = bool; }

    static get GAME_FINISH() { return finish; }
    static set GAME_FINISH(bool) { finish = bool; }

    static get DEFAULT_BGM_VOLUME() { return defaultBgmVolume; }
    static get REDUCE_BGM_VOLUME() { return reduceBgmVolume; }

    static get BGM_VOLUME() { return bgmVolume; }
    static set BGM_VOLUME(num) { bgmVolume = num; }

    static get MUTE_SOUND_VOLUME() { return muteSoundVolume; }

    static get HELP_BUTTON() { return helpBtn; }
    static set HELP_BUTTON(obj) { helpBtn = obj; }

    static get BACK_BUTTON() { return backBtn; }
    static set BACK_BUTTON(obj) { backBtn = obj; }

    static get GUIDE_REPEAT_TIME() { return guideRepeatTime; }
    static get GUIDE_ENABLED() { return guideEnable; }
    static set GUIDE_ENABLED(bool) { guideEnable = bool; }

    static set GAME_FOCUS(bool) { gameFocus = bool; }
    static get GAME_FOCUS() { return gameFocus; }

    static get UPDATE_OBJECT() { return updateObject; }
    static set UPDATE_OBJECT(obj) { updateObject = obj; }

    static get CURRENT_GUIDE_SOUND() { return currentGuideSound; }
    static set CURRENT_GUIDE_SOUND(obj) { currentGuideSound = obj; }

    static get CURRENT_BUTTON_SOUND() { return currentButtonSound; }
    static set CURRENT_BUTTON_SOUND(obj) { currentButtonSound = obj; }

    static get DISPLAY_SLIDING_SPEED() { return displaySlidingSpeed; }

    static get CHEAT_ON() { return cheatOn; }
    static set CHEAT_ON(bool) { cheatOn = bool; }

    static get CHECK_APP_STRING() { return appEnabledString; }
    static get CHECK_WEB_STRING() { return webEnabledString; }
    static get APP_URL() { return appUrl; }


}

