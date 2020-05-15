import AssetKey from "../../data/AssetKey";
import GameConfig from "../../data/GameConfig";
import SoundAssetKey from "../../data/SoundAssetKey";

export default class PreloadResource{
    constructor(game) {
        PreloadResource.instance = this;
        this.game = game;
    }

    preload() {

        this.game.load.atlasJSONHash(AssetKey.INTRO_ASSET, 'asset/game/image/intro-asset.png', 'asset/game/image/intro-asset.json');
        this.game.load.atlasJSONHash( AssetKey.BTN_ASSET, 'asset/game/image/game-main-button.png', 'asset/game/image/game-main-button.json');
        this.game.load.atlasJSONHash(AssetKey.DEFAULT_GAME_ATLAS, 'asset/game/image/default_gameAtlas.png', 'asset/game/image/default_gameAtlas.json');


        this.game.load.atlasJSONHash(AssetKey.TUTORIAL_ANIMATION_ASSET_1, 'asset/game/image/tutorialAnimation-asset_1.png', 'asset/game/image/tutorialAnimation-asset_1.json');
        this.game.load.atlasJSONHash(AssetKey.TUTORIAL_ANIMATION_ASSET_2, 'asset/game/image/tutorialAnimation-asset_2.png', 'asset/game/image/tutorialAnimation-asset_2.json');
        this.game.load.atlasJSONHash(AssetKey.RESULT_ASSET, 'asset/game/image/ending-asset.png', 'asset/game/image/ending-asset.json');
        this.game.load.atlasJSONHash(AssetKey.MAIN_DISPLAY_ASSET, 'asset/game/image/main-display-asset.png', 'asset/game/image/main-display-asset.json');
        this.game.load.atlasJSONHash(AssetKey.PURCHASE_LIST_VIEW, 'asset/game/image/purchaseListView-asset.png', 'asset/game/image/purchaseListView-asset.json');
        this.game.load.atlasJSONHash(AssetKey.CALCULATE_POS, 'asset/game/image/calculatePos-asset.png', 'asset/game/image/calculatePos-asset.json');
        this.game.load.atlasJSONHash(AssetKey.PAYMENT_POS, 'asset/game/image/paymentPos-asset.png', 'asset/game/image/paymentPos-asset.json');
        this.game.load.atlasJSONHash(AssetKey.SLIDE_BAR_PPIYO, 'asset/game/image/slideBar-asset.png', 'asset/game/image/slideBar-asset.json');
        this.game.load.atlasJSONHash(AssetKey.CORNER_DAIRY, 'asset/game/image/corner-dairy-asset.png', 'asset/game/image/corner-dairy-asset.json');
        this.game.load.atlasJSONHash(AssetKey.CORNER_MEAT, 'asset/game/image/corner-meat-asset.png', 'asset/game/image/corner-meat-asset.json');
        this.game.load.atlasJSONHash(AssetKey.CORNER_NECESSARY, 'asset/game/image/corner-necessary-asset.png', 'asset/game/image/corner-necessary-asset.json');
        this.game.load.atlasJSONHash(AssetKey.CORNER_SEAFOOD, 'asset/game/image/corner-seafood-asset.png', 'asset/game/image/corner-seafood-asset.json');
        this.game.load.atlasJSONHash(AssetKey.CORNER_SNACK, 'asset/game/image/corner-snack-asset.png', 'asset/game/image/corner-snack-asset.json');
        this.game.load.atlasJSONHash(AssetKey.CORNER_VEGETABLE, 'asset/game/image/corner-vegetable-asset.png', 'asset/game/image/corner-vegetable-asset.json');

        let extension = ".mp3";

        if( this.game.device.desktop )
        {
            GameConfig.CURRENT_DEVICE = 'desktop';
        }
        else
        {
            if( this.game.device.android )
            {
                extension = ".ogg";
                GameConfig.CURRENT_DEVICE = 'android';
            }
            else
            {
                extension = ".m4a";
                GameConfig.CURRENT_DEVICE = 'ios';
            }

        }

        /**
         * tutorial Sound
         * @type {string}
         */

        const gameIntro = 'asset/game/sound/' + SoundAssetKey.GAME_INTRO + extension;

        const tutorNarr_1 = 'asset/game/sound/' + SoundAssetKey.tutorNarr_1 + extension;
        const tutorNarr_2 = 'asset/game/sound/' + SoundAssetKey.tutorNarr_2 + extension;
        const tutorNarr_3 = 'asset/game/sound/' + SoundAssetKey.tutorNarr_3 + extension;
        const tutorNarr_4 = 'asset/game/sound/' + SoundAssetKey.tutorNarr_4 + extension;
        const tutorNarr_5 = 'asset/game/sound/' + SoundAssetKey.tutorNarr_5 + extension;

        const result_good = 'asset/game/sound/' + SoundAssetKey.RESULT_GOOD + extension;

        const basicTouchSnd = 'asset/game/sound/' + SoundAssetKey.BASIC_TOUCH_SOUND + extension;
        const mainBgm = 'asset/game/sound/' + SoundAssetKey.MAIN_BGM + extension;
        const btnSnd = 'asset/game/sound/' + SoundAssetKey.BUTTON_SOUND + extension;
        const startSnd = 'asset/game/sound/' + SoundAssetKey.START_SOUND + extension;

        /**
         * effect Sound (add)
         */
        const sndClose = 'asset/game/sound/' + SoundAssetKey.SND_CLOSE + extension;
        const sndNext = 'asset/game/sound/' + SoundAssetKey.SND_NEXT + extension;
        const sndOff = 'asset/game/sound/' + SoundAssetKey.SND_OFF + extension;
        const sndOn = 'asset/game/sound/' + SoundAssetKey.SND_ON + extension;
        const sndPrev = 'asset/game/sound/' + SoundAssetKey.SND_PREV + extension;
        const sndSkip = 'asset/game/sound/' + SoundAssetKey.SND_SKIP + extension;
        const chapterCompleteEffect = 'asset/game/sound/' + SoundAssetKey.CHAPTER_COMPLETE_EFFECT + extension;
        const sfx_retry = 'asset/game/sound/' + SoundAssetKey.RESTART_SOUND + extension;
        const beep = 'asset/game/sound/' + SoundAssetKey.BEEP + extension;
        const cash_snd_100 = 'asset/game/sound/' + SoundAssetKey.CASH_SND_100 + extension;
        const cash_snd_500 = 'asset/game/sound/' + SoundAssetKey.CASH_SND_500 + extension;
        const cash_snd_1000 = 'asset/game/sound/' + SoundAssetKey.CASH_SND_1000 + extension;
        const cash_snd_5000 = 'asset/game/sound/' + SoundAssetKey.CASH_SND_5000 + extension;
        const cash_snd_10000 = 'asset/game/sound/' + SoundAssetKey.CASH_SND_10000 + extension;
        const cash_snd_again = 'asset/game/sound/' + SoundAssetKey.CASH_SND_AGAIN + extension;
        const cash_snd_over_1 = 'asset/game/sound/' + SoundAssetKey.CASH_SND_OVER_1 + extension;
        const cash_snd_over_2 = 'asset/game/sound/' + SoundAssetKey.CASH_SND_OVER_2 + extension;
        const cash_snd_shortage = 'asset/game/sound/' + SoundAssetKey.CASH_SND_SHORTAGE + extension;
        const cash_snd_complete = 'asset/game/sound/' + SoundAssetKey.CASH_SND_COMPLETE + extension;

        /**
         * MISC BUTTON SOUND
         */
        const btnSnd_removeCorner_1 = 'asset/game/sound/' + SoundAssetKey.BTNSND_REMOVECORNER_1 + extension;
        const btnSnd_removeCorner_2 = 'asset/game/sound/' + SoundAssetKey.BTNSND_REMOVECORNER_2 + extension;
        const btnSnd_corner_counter_1 = 'asset/game/sound/' + SoundAssetKey.BTNSND_CORNER_COUNTER_1 + extension;
        const btnSnd_corner_counter_2 = 'asset/game/sound/' + SoundAssetKey.BTNSND_CORNER_COUNTER_2 + extension;
        const btnSnd_corner_dairy_1 = 'asset/game/sound/' + SoundAssetKey.BTNSND_CORNER_DAIRY_1 + extension;
        const btnSnd_corner_dairy_2 = 'asset/game/sound/' + SoundAssetKey.BTNSND_CORNER_DAIRY_2 + extension;
        const btnSnd_corner_meat_1 = 'asset/game/sound/' + SoundAssetKey.BTNSND_CORNER_MEAT_1 + extension;
        const btnSnd_corner_meat_2 = 'asset/game/sound/' + SoundAssetKey.BTNSND_CORNER_MEAT_2 + extension;
        const btnSnd_corner_necessary_1 = 'asset/game/sound/' + SoundAssetKey.BTNSND_CORNER_NECESSARY_1 + extension;
        const btnSnd_corner_necessary_2 = 'asset/game/sound/' + SoundAssetKey.BTNSND_CORNER_NECESSARY_2 + extension;
        const btnSnd_corner_seafood_1 = 'asset/game/sound/' + SoundAssetKey.BTNSND_CORNER_SEAFOOD_1 + extension;
        const btnSnd_corner_seafood_2 = 'asset/game/sound/' + SoundAssetKey.BTNSND_CORNER_SEAFOOD_2 + extension;
        const btnSnd_corner_snack_1 = 'asset/game/sound/' + SoundAssetKey.BTNSND_CORNER_SNACK_1 + extension;
        const btnSnd_corner_snack_2 = 'asset/game/sound/' + SoundAssetKey.BTNSND_CORNER_SNACK_2 + extension;
        const btnSnd_corner_vegetable_1 = 'asset/game/sound/' + SoundAssetKey.BTNSND_CORNER_VEGETABLE_1 + extension;
        const btnSnd_corner_vegetable_2 = 'asset/game/sound/' + SoundAssetKey.BTNSND_CORNER_VEGETABLE_2 + extension;


        /**
         * GUIDE SOUND
         */
        const guideNarr_1 = 'asset/game/sound/' + SoundAssetKey.guideNarr_1 + extension;
        const guideNarr_2 = 'asset/game/sound/' + SoundAssetKey.guideNarr_2 + extension;
        const guideNarr_3 = 'asset/game/sound/' + SoundAssetKey.guideNarr_3 + extension;
        const guideNarr_4 = 'asset/game/sound/' + SoundAssetKey.guideNarr_4 + extension;
        const guideNarr_5 = 'asset/game/sound/' + SoundAssetKey.guideNarr_5 + extension;

        /**
         *CHAPTER COMPLETE SOUND
         */
        const chapterComplete_1 = 'asset/game/sound/' + SoundAssetKey.chapterComplete_1 + extension;
        const chapterComplete_2 = 'asset/game/sound/' + SoundAssetKey.chapterComplete_2 + extension;
        const chapterComplete_3 = 'asset/game/sound/' + SoundAssetKey.chapterComplete_3 + extension;
        const chapterComplete_4 = 'asset/game/sound/' + SoundAssetKey.chapterComplete_4 + extension;


        /**
         * TUTOR NARRATION
         */
        this.game.load.audio( SoundAssetKey.GAME_INTRO, gameIntro);
        let tutorNarrArr = ['', tutorNarr_1, tutorNarr_2, tutorNarr_3, tutorNarr_4, tutorNarr_5];
        for(let i = 1; i<=5; i++) this.game.load.audio(SoundAssetKey.TUTOR_NARRATION_PREFIX + i, tutorNarrArr[i])

        /**
         * GUIDE NARRATION
         */
        let guideNarrArr = ['', guideNarr_1, guideNarr_2, guideNarr_3, guideNarr_4, guideNarr_5];
        for(let i = 1; i<=5; i++) this.game.load.audio(SoundAssetKey.GUIDE_SOUND_PREFIX + i, guideNarrArr[i])

        /**
         * CHAPTER COMPLETE SOUND
         */
        let chapterCompleteArr = ['', chapterComplete_1, chapterComplete_2, chapterComplete_3, chapterComplete_4];
        for(let i = 1; i<=4; i++) this.game.load.audio(SoundAssetKey.CHAPTER_COMPLETE_PREFIX + i, chapterCompleteArr[i])

        /**
         * RESULT PAGE
         */
        this.game.load.audio( SoundAssetKey.RESULT_GOOD, result_good);


        /**
         * EFFECT SOUND
         */
        this.game.load.audio( SoundAssetKey.BASIC_TOUCH_SOUND, basicTouchSnd);
        this.game.load.audio( SoundAssetKey.BUTTON_SOUND, btnSnd);
        this.game.load.audio( SoundAssetKey.MAIN_BGM, mainBgm);
        this.game.load.audio( SoundAssetKey.START_SOUND, startSnd);

        this.game.load.audio( SoundAssetKey.SND_CLOSE, sndClose);
        this.game.load.audio( SoundAssetKey.SND_NEXT, sndNext);
        this.game.load.audio( SoundAssetKey.SND_OFF, sndOff);
        this.game.load.audio( SoundAssetKey.SND_ON, sndOn);
        this.game.load.audio( SoundAssetKey.SND_PREV, sndPrev);
        this.game.load.audio( SoundAssetKey.SND_SKIP, sndSkip);

        this.game.load.audio( SoundAssetKey.CHAPTER_COMPLETE_EFFECT, chapterCompleteEffect);
        this.game.load.audio( SoundAssetKey.RESTART_SOUND, sfx_retry);

        this.game.load.audio( SoundAssetKey.BTNSND_REMOVECORNER_1, btnSnd_removeCorner_1);
        this.game.load.audio( SoundAssetKey.BTNSND_REMOVECORNER_2, btnSnd_removeCorner_2);
        this.game.load.audio( SoundAssetKey.BTNSND_CORNER_COUNTER_1, btnSnd_corner_counter_1);
        this.game.load.audio( SoundAssetKey.BTNSND_CORNER_COUNTER_2, btnSnd_corner_counter_2);
        this.game.load.audio( SoundAssetKey.BTNSND_CORNER_DAIRY_1, btnSnd_corner_dairy_1);
        this.game.load.audio( SoundAssetKey.BTNSND_CORNER_DAIRY_2, btnSnd_corner_dairy_2);
        this.game.load.audio( SoundAssetKey.BTNSND_CORNER_MEAT_1, btnSnd_corner_meat_1);
        this.game.load.audio( SoundAssetKey.BTNSND_CORNER_MEAT_2, btnSnd_corner_meat_2);
        this.game.load.audio( SoundAssetKey.BTNSND_CORNER_NECESSARY_1, btnSnd_corner_necessary_1);
        this.game.load.audio( SoundAssetKey.BTNSND_CORNER_NECESSARY_2, btnSnd_corner_necessary_2);
        this.game.load.audio( SoundAssetKey.BTNSND_CORNER_SEAFOOD_1, btnSnd_corner_seafood_1);
        this.game.load.audio( SoundAssetKey.BTNSND_CORNER_SEAFOOD_2, btnSnd_corner_seafood_2);
        this.game.load.audio( SoundAssetKey.BTNSND_CORNER_SNACK_1, btnSnd_corner_snack_1);
        this.game.load.audio( SoundAssetKey.BTNSND_CORNER_SNACK_2, btnSnd_corner_snack_2);
        this.game.load.audio( SoundAssetKey.BTNSND_CORNER_VEGETABLE_1, btnSnd_corner_vegetable_1);
        this.game.load.audio( SoundAssetKey.BTNSND_CORNER_VEGETABLE_2, btnSnd_corner_vegetable_2);

        this.game.load.audio( SoundAssetKey.BEEP, beep);
        this.game.load.audio( SoundAssetKey.CASH_SND_100, cash_snd_100);
        this.game.load.audio( SoundAssetKey.CASH_SND_500, cash_snd_500);
        this.game.load.audio( SoundAssetKey.CASH_SND_1000, cash_snd_1000);
        this.game.load.audio( SoundAssetKey.CASH_SND_5000, cash_snd_5000);
        this.game.load.audio( SoundAssetKey.CASH_SND_10000, cash_snd_10000);
        this.game.load.audio( SoundAssetKey.CASH_SND_AGAIN, cash_snd_again);
        this.game.load.audio( SoundAssetKey.CASH_SND_OVER_1, cash_snd_over_1);
        this.game.load.audio( SoundAssetKey.CASH_SND_OVER_2, cash_snd_over_2);
        this.game.load.audio( SoundAssetKey.CASH_SND_SHORTAGE, cash_snd_shortage);
        this.game.load.audio( SoundAssetKey.CASH_SND_COMPLETE, cash_snd_complete);


    }


}


PreloadResource.instance = null;