export default class AssetKey {

    static get DEFAULT_GAME_ATLAS() {return 'default_gameAtlas';}
    static get BTN_ASSET()  {   return 'game-main-button'; }

    static get INTRO_ASSET() { return 'intro-asset';}
    static get RESULT_ASSET() {return 'ending-asset';}
    static get TUTOR_BG_ASSET() {return 'tutorialBg-asset';}
    static get TUTORIAL_ANIMATION_ASSET() {return 'tutorialAnimation-asset';}


    /**
     * Intro
     */

    static get INTRO_BG() { return 'introBg'}


    /**
     * Tutorial
     */

    static get TUTORIAL_ANIMATION_ASSET_1() { return 'tutorialAnimation-asset_1'; }
    static get TUTORIAL_ANIMATION_ASSET_2() { return 'tutorialAnimation-asset_2'; }

    /**
     * inGame
     */

    static get MAIN_DISPLAY_ASSET() {return 'main-display-asset';}
    static get SLIDEBAR_PPIYO() {return 'slideBar-asset';}
    static get CORNER_VEGETABLE() {return 'corner-vegetable-asset';}
    static get CORNER_SEAFOOD() {return 'corner-seafood-asset';}
    static get CORNER_MEAT() {return 'corner-meat-asset';}
    static get CORNER_NECESSARY() {return 'corner-necessary-asset';}
    static get CORNER_DAIRY() {return 'corner-dairy-asset';}
    static get CORNER_SNACK() {return 'corner-snack-asset';}
    static get CORNER_COUNTER() {return 'corner-counter-asset';}




    /**
     * Guide
     */

    //USER GUIDE
    static get GUIDE_HAND() { return 'img_hand'; }
    static get GUIDE_CIRCLE() { return 'img_touch'; }

    static get TALK_CLOUD() {return 'talkCloud'; }
    static get RESULT_TEXT_PREFIX() {return 'resultText_'; }

    static get FEEDBACK_EFFECT_PREFIX() {return 'heart_' ;}

    //USER GUIDE
    static get INFO_HAND() {return 'img_hand'; }
    static get INFO_TEXTBOX() {return 'img_textbox'; }
    static get INFO_TOUCH() {return 'img_touch'; }

    static get CHAPTER_GUIDE_BG() {return 'guideTextBg'; }
    static get CHAPTER_GUIDE_TEXT_PREFIX() {return 'guideText'; }


    /**
     * Result
     */

    static get BTN_CLOSE_DEFAULT() { return'result_btn_close_default'; }
    static get BTN_CLOSE_OVER() { return'result_btn_close_over'; }

    static get RESULT_BG() { return'endingBg'; }

    /**
     * Button
     * @returns {string}
     * @constructor
     */
    static get START_BUTTON() { return 'start-button'}
    static get RETRY_BUTTON() { return 'retry-button'}
    static get RETRY_BUTTON_OVER() { return 'retry-button-over'}

    static get BTN_BACK_DEFAULT() { return 'btn_Back_default'}
    static get BTN_BACK_OVER() { return 'btn_Back_over'}

    static get BTN_SOUNDON_DEFAULT() { return 'btn_soundon_default'}
    static get BTN_SOUNDON_OVER() { return 'btn_soundon_over'}

    static get BTN_SOUNDOFF_DEFAULT() { return 'btn_soundoff_default'}
    static get BTN_SOUNDOFF_OVER() { return 'btn_soundoff_over'}


    /**
     * BTN_TUTORIAL CONTENT
     * @returns {string}
     * @constructor
     */

    static get BTN_TUTORIAL_DEFAULT() { return 'btn_tutorial_default'}
    static get BTN_TUTORIAL_OVER() { return 'btn_tutorial_over'}

    static get BTN_TUTORIAL_SKIP_DEFAULT() {return 'btn_jump_default'}
    static get BTN_TUTORIAL_SKIP_OVER() {return 'btn_jump_over'}

    static get BTN_TUTORIAL_PREV_DEFAULT() {return 'btn_back_default'}
    static get BTN_TUTORIAL_PREV_OVER() {return 'btn_back_over'}

    static get BTN_TUTORIAL_NEXT_DEFAULT() {return 'btn_next_default'}
    static get BTN_TUTORIAL_NEXT_OVER() {return 'btn_next_over'}

    static get BTN_TUTORIAL_START_DEFAULT() {return 'btn_start_default'}
    static get BTN_TUTORIAL_START_OVER() {return 'btn_start_over'}

}
