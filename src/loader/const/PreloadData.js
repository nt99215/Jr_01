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
        const btnSnd_corner_notYet_1 = 'asset/game/sound/' + SoundAssetKey.BTNSND_CORNER_NOTYET_1 + extension;
        const btnSnd_corner_notYet_2 = 'asset/game/sound/' + SoundAssetKey.BTNSND_CORNER_NOTYET_2 + extension;
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
         * OBJECT SOUND
         */
        const objSnd_dairy_bananaMilk_1 = 'asset/game/sound/' + SoundAssetKey.OBJSND_DAIRY_BANANAMILK_1 + extension;
        const objSnd_dairy_cheese_1 = 'asset/game/sound/' + SoundAssetKey.OBJSND_DAIRY_CHEESE_1 + extension;
        const objSnd_dairy_chocolateMilk_1 = 'asset/game/sound/' + SoundAssetKey.OBJSND_DAIRY_CHOCOLATEMILK_1 + extension;
        const objSnd_dairy_chocolateMilk_2 = 'asset/game/sound/' + SoundAssetKey.OBJSND_DAIRY_CHOCOLATEMILK_2 + extension;
        const objSnd_dairy_egg_1 = 'asset/game/sound/' + SoundAssetKey.OBJSND_DAIRY_EGG_1 + extension;
        const objSnd_dairy_milk_1 = 'asset/game/sound/' + SoundAssetKey.OBJSND_DAIRY_MILK_1 + extension;
        const objSnd_dairy_milk_2 = 'asset/game/sound/' + SoundAssetKey.OBJSND_DAIRY_MILK_2 + extension;
        const objSnd_dairy_strawberryMilk_1 = 'asset/game/sound/' + SoundAssetKey.OBJSND_DAIRY_STRAWBERRYMILK_1 + extension;
        const objSnd_dairy_strawberryMilk_2 = 'asset/game/sound/' + SoundAssetKey.OBJSND_DAIRY_STRAWBERRYMILK_2 + extension;
        const objSnd_dairy_yogurt_1 = 'asset/game/sound/' + SoundAssetKey.OBJSND_DAIRY_YOGURT_1 + extension;
        const objSnd_dairy_yogurt_2 = 'asset/game/sound/' + SoundAssetKey.OBJSND_DAIRY_YOGURT_2 + extension;

        const objSnd_meat_bacon_1 = 'asset/game/sound/' + SoundAssetKey.OBJSND_MEAT_BACON_1 + extension;
        const objSnd_meat_boiledPork_1 = 'asset/game/sound/' + SoundAssetKey.OBJSND_MEAT_BOILEDPORK_1 + extension;
        const objSnd_meat_boiledPork_2 = 'asset/game/sound/' + SoundAssetKey.OBJSND_MEAT_BOILEDPORK_2 + extension;
        const objSnd_meat_chicken_1 = 'asset/game/sound/' + SoundAssetKey.OBJSND_MEAT_CHICKEN_1 + extension;
        const objSnd_meat_chicken_2 = 'asset/game/sound/' + SoundAssetKey.OBJSND_MEAT_CHICKEN_2 + extension;
        const objSnd_meat_drumstick_1 = 'asset/game/sound/' + SoundAssetKey.OBJSND_MEAT_DRUMSTICK_1 + extension;
        const objSnd_meat_drumstick_2 = 'asset/game/sound/' + SoundAssetKey.OBJSND_MEAT_DRUMSTICK_2 + extension;
        const objSnd_meat_sirloin_1 = 'asset/game/sound/' + SoundAssetKey.OBJSND_MEAT_SIRLOIN_1 + extension;
        const objSnd_meat_sirloin_2 = 'asset/game/sound/' + SoundAssetKey.OBJSND_MEAT_SIRLOIN_2 + extension;
        const objSnd_meat_tenderloin_1 = 'asset/game/sound/' + SoundAssetKey.OBJSND_MEAT_TENDERLOIN_1 + extension;
        const objSnd_meat_tenderloin_2 = 'asset/game/sound/' + SoundAssetKey.OBJSND_MEAT_TENDERLOIN_2 + extension;

        const objSnd_necessary_brush_1 = 'asset/game/sound/' + SoundAssetKey.OBJSND_NECESSARY_BRUSH_1 + extension;
        const objSnd_necessary_cleanser_1 = 'asset/game/sound/' + SoundAssetKey.OBJSND_NECESSARY_CLEANSER_1 + extension;
        const objSnd_necessary_paste_1 = 'asset/game/sound/' + SoundAssetKey.OBJSND_NECESSARY_PASTE_1 + extension;
        const objSnd_necessary_shampoo_1 = 'asset/game/sound/' + SoundAssetKey.OBJSND_NECESSARY_SHAMPOO_1 + extension;
        const objSnd_necessary_shampoo_2 = 'asset/game/sound/' + SoundAssetKey.OBJSND_NECESSARY_SHAMPOO_2 + extension;
        const objSnd_necessary_soap_1 = 'asset/game/sound/' + SoundAssetKey.OBJSND_NECESSARY_SOAP_1 + extension;
        const objSnd_necessary_tissue_1 = 'asset/game/sound/' + SoundAssetKey.OBJSND_NECESSARY_TISSUE_1 + extension;
        const objSnd_necessary_wetTissue_1 = 'asset/game/sound/' + SoundAssetKey.OBJSND_NECESSARY_WETTISSUE_1 + extension;
        const objSnd_necessary_wetTissue_2 = 'asset/game/sound/' + SoundAssetKey.OBJSND_NECESSARY_WETTISSUE_2 + extension;

        const objSnd_seafood_abalone_1 = 'asset/game/sound/' + SoundAssetKey.OBJSND_SEAFOOD_ABALONE_1 + extension;
        const objSnd_seafood_crab_1 = 'asset/game/sound/' + SoundAssetKey.OBJSND_SEAFOOD_CRAB_1 + extension;
        const objSnd_seafood_mackerel_1 = 'asset/game/sound/' + SoundAssetKey.OBJSND_SEAFOOD_MACKEREL_1 + extension;
        const objSnd_seafood_mackerel_2 = 'asset/game/sound/' + SoundAssetKey.OBJSND_SEAFOOD_MACKEREL_2 + extension;
        const objSnd_seafood_shell_1 = 'asset/game/sound/' + SoundAssetKey.OBJSND_SEAFOOD_SHELL_1 + extension;
        const objSnd_seafood_shell_2 = 'asset/game/sound/' + SoundAssetKey.OBJSND_SEAFOOD_SHELL_2 + extension;
        const objSnd_seafood_shrimp_1 = 'asset/game/sound/' + SoundAssetKey.OBJSND_SEAFOOD_SHRIMP_1 + extension;
        const objSnd_seafood_squid_1 = 'asset/game/sound/' + SoundAssetKey.OBJSND_SEAFOOD_SQUID_1 + extension;
        const objSnd_seafood_squid_2 = 'asset/game/sound/' + SoundAssetKey.OBJSND_SEAFOOD_SQUID_2 + extension;

        const objSnd_snack_candy_1 = 'asset/game/sound/' + SoundAssetKey.OBJSND_SNACK_CANDY_1 + extension;
        const objSnd_snack_candy_2 = 'asset/game/sound/' + SoundAssetKey.OBJSND_SNACK_CANDY_2 + extension;
        const objSnd_snack_chocolate_1 = 'asset/game/sound/' + SoundAssetKey.OBJSND_SNACK_CHOCOLATE_1 + extension;
        const objSnd_snack_chocolate_2 = 'asset/game/sound/' + SoundAssetKey.OBJSND_SNACK_CHOCOLATE_2 + extension;
        const objSnd_snack_iceCream_1 = 'asset/game/sound/' + SoundAssetKey.OBJSND_SNACK_ICECREAM_1 + extension;
        const objSnd_snack_iceCream_2 = 'asset/game/sound/' + SoundAssetKey.OBJSND_SNACK_ICECREAM_2 + extension;
        const objSnd_snack_jelly_1 = 'asset/game/sound/' + SoundAssetKey.OBJSND_SNACK_JELLY_1 + extension;

        const objSnd_vegetable_apple_1 = 'asset/game/sound/' + SoundAssetKey.OBJSND_VEGETABLE_APPLE_1 + extension;
        const objSnd_vegetable_apple_2 = 'asset/game/sound/' + SoundAssetKey.OBJSND_VEGETABLE_APPLE_2 + extension;
        const objSnd_vegetable_carrot_1 = 'asset/game/sound/' + SoundAssetKey.OBJSND_VEGETABLE_CARROT_1 + extension;
        const objSnd_vegetable_carrot_2 = 'asset/game/sound/' + SoundAssetKey.OBJSND_VEGETABLE_CARROT_2 + extension;
        const objSnd_vegetable_grape_1 = 'asset/game/sound/' + SoundAssetKey.OBJSND_VEGETABLE_GRAPE_1 + extension;
        const objSnd_vegetable_grape_2 = 'asset/game/sound/' + SoundAssetKey.OBJSND_VEGETABLE_GRAPE_2 + extension;
        const objSnd_vegetable_onion_1 = 'asset/game/sound/' + SoundAssetKey.OBJSND_VEGETABLE_ONION_1 + extension;
        const objSnd_vegetable_onion_2 = 'asset/game/sound/' + SoundAssetKey.OBJSND_VEGETABLE_ONION_2 + extension;
        const objSnd_vegetable_radish_1 = 'asset/game/sound/' + SoundAssetKey.OBJSND_VEGETABLE_RADISH_1 + extension;
        const objSnd_vegetable_radish_2 = 'asset/game/sound/' + SoundAssetKey.OBJSND_VEGETABLE_RADISH_2 + extension;
        const objSnd_vegetable_strawberry_1 = 'asset/game/sound/' + SoundAssetKey.OBJSND_VEGETABLE_STRAWBERRY_1 + extension;
        const objSnd_vegetable_strawberry_2 = 'asset/game/sound/' + SoundAssetKey.OBJSND_VEGETABLE_STRAWBERRY_2 + extension;
        const objSnd_vegetable_sweetPotato_1 = 'asset/game/sound/' + SoundAssetKey.OBJSND_VEGETABLE_SWEETPOTATO_1 + extension;
        const objSnd_vegetable_sweetPotato_2 = 'asset/game/sound/' + SoundAssetKey.OBJSND_VEGETABLE_SWEETPOTATO_2 + extension;
        const objSnd_vegetable_sweetPotato_3 = 'asset/game/sound/' + SoundAssetKey.OBJSND_VEGETABLE_SWEETPOTATO_3 + extension;
        const objSnd_vegetable_welshonion_1 = 'asset/game/sound/' + SoundAssetKey.OBJSND_VEGETABLE_WELSHONION_1 + extension;
        const objSnd_vegetable_welshonion_2 = 'asset/game/sound/' + SoundAssetKey.OBJSND_VEGETABLE_WELSHONION_2 + extension;
        const objSnd_vegetable_welshonion_3 = 'asset/game/sound/' + SoundAssetKey.OBJSND_VEGETABLE_WELSHONION_3 + extension;

        const objSnd_wrong_1 = 'asset/game/sound/' + SoundAssetKey.OBJSND_WRONG_1 + extension;
        const objSnd_wrong_2 = 'asset/game/sound/' + SoundAssetKey.OBJSND_WRONG_2 + extension;



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
        this.game.load.audio( SoundAssetKey.BTNSND_CORNER_NOTYET_1, btnSnd_corner_notYet_1);
        this.game.load.audio( SoundAssetKey.BTNSND_CORNER_NOTYET_2, btnSnd_corner_notYet_2);
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

        this.game.load.audio( SoundAssetKey.OBJSND_DAIRY_BANANAMILK_1, objSnd_dairy_bananaMilk_1);
        this.game.load.audio( SoundAssetKey.OBJSND_DAIRY_CHEESE_1, objSnd_dairy_cheese_1);
        this.game.load.audio( SoundAssetKey.OBJSND_DAIRY_CHOCOLATEMILK_1, objSnd_dairy_chocolateMilk_1);
        this.game.load.audio( SoundAssetKey.OBJSND_DAIRY_CHOCOLATEMILK_2, objSnd_dairy_chocolateMilk_2);
        this.game.load.audio( SoundAssetKey.OBJSND_DAIRY_EGG_1, objSnd_dairy_egg_1);
        this.game.load.audio( SoundAssetKey.OBJSND_DAIRY_MILK_1, objSnd_dairy_milk_1);
        this.game.load.audio( SoundAssetKey.OBJSND_DAIRY_MILK_2, objSnd_dairy_milk_2);
        this.game.load.audio( SoundAssetKey.OBJSND_DAIRY_STRAWBERRYMILK_1, objSnd_dairy_strawberryMilk_1);
        this.game.load.audio( SoundAssetKey.OBJSND_DAIRY_STRAWBERRYMILK_2, objSnd_dairy_strawberryMilk_2);
        this.game.load.audio( SoundAssetKey.OBJSND_DAIRY_YOGURT_1, objSnd_dairy_yogurt_1);
        this.game.load.audio( SoundAssetKey.OBJSND_DAIRY_YOGURT_2, objSnd_dairy_yogurt_2);

        this.game.load.audio( SoundAssetKey.OBJSND_MEAT_BACON_1, objSnd_meat_bacon_1);
        this.game.load.audio( SoundAssetKey.OBJSND_MEAT_BOILEDPORK_1, objSnd_meat_boiledPork_1);
        this.game.load.audio( SoundAssetKey.OBJSND_MEAT_BOILEDPORK_2, objSnd_meat_boiledPork_2);
        this.game.load.audio( SoundAssetKey.OBJSND_MEAT_CHICKEN_1, objSnd_meat_chicken_1);
        this.game.load.audio( SoundAssetKey.OBJSND_MEAT_CHICKEN_2, objSnd_meat_chicken_2);
        this.game.load.audio( SoundAssetKey.OBJSND_MEAT_DRUMSTICK_1, objSnd_meat_drumstick_1);
        this.game.load.audio( SoundAssetKey.OBJSND_MEAT_DRUMSTICK_2, objSnd_meat_drumstick_2);
        this.game.load.audio( SoundAssetKey.OBJSND_MEAT_SIRLOIN_1, objSnd_meat_sirloin_1);
        this.game.load.audio( SoundAssetKey.OBJSND_MEAT_SIRLOIN_2, objSnd_meat_sirloin_2);
        this.game.load.audio( SoundAssetKey.OBJSND_MEAT_TENDERLOIN_1, objSnd_meat_tenderloin_1);
        this.game.load.audio( SoundAssetKey.OBJSND_MEAT_TENDERLOIN_2, objSnd_meat_tenderloin_2);

        this.game.load.audio( SoundAssetKey.OBJSND_NECESSARY_BRUSH_1, objSnd_necessary_brush_1);
        this.game.load.audio( SoundAssetKey.OBJSND_NECESSARY_CLEANSER_1, objSnd_necessary_cleanser_1);
        this.game.load.audio( SoundAssetKey.OBJSND_NECESSARY_PASTE_1, objSnd_necessary_paste_1);
        this.game.load.audio( SoundAssetKey.OBJSND_NECESSARY_SHAMPOO_1, objSnd_necessary_shampoo_1);
        this.game.load.audio( SoundAssetKey.OBJSND_NECESSARY_SHAMPOO_2, objSnd_necessary_shampoo_2);
        this.game.load.audio( SoundAssetKey.OBJSND_NECESSARY_SOAP_1, objSnd_necessary_soap_1);
        this.game.load.audio( SoundAssetKey.OBJSND_NECESSARY_TISSUE_1, objSnd_necessary_tissue_1);
        this.game.load.audio( SoundAssetKey.OBJSND_NECESSARY_WETTISSUE_1, objSnd_necessary_wetTissue_1);
        this.game.load.audio( SoundAssetKey.OBJSND_NECESSARY_WETTISSUE_2, objSnd_necessary_wetTissue_2);

        this.game.load.audio( SoundAssetKey.OBJSND_SEAFOOD_ABALONE_1, objSnd_seafood_abalone_1);
        this.game.load.audio( SoundAssetKey.OBJSND_SEAFOOD_CRAB_1, objSnd_seafood_crab_1);
        this.game.load.audio( SoundAssetKey.OBJSND_SEAFOOD_MACKEREL_1, objSnd_seafood_mackerel_1);
        this.game.load.audio( SoundAssetKey.OBJSND_SEAFOOD_MACKEREL_2, objSnd_seafood_mackerel_2);
        this.game.load.audio( SoundAssetKey.OBJSND_SEAFOOD_SHELL_1, objSnd_seafood_shell_1);
        this.game.load.audio( SoundAssetKey.OBJSND_SEAFOOD_SHELL_2, objSnd_seafood_shell_2);
        this.game.load.audio( SoundAssetKey.OBJSND_SEAFOOD_SHRIMP_1, objSnd_seafood_shrimp_1);
        this.game.load.audio( SoundAssetKey.OBJSND_SEAFOOD_SQUID_1, objSnd_seafood_squid_1);
        this.game.load.audio( SoundAssetKey.OBJSND_SEAFOOD_SQUID_2, objSnd_seafood_squid_2);

        this.game.load.audio( SoundAssetKey.OBJSND_SNACK_CANDY_1, objSnd_snack_candy_1);
        this.game.load.audio( SoundAssetKey.OBJSND_SNACK_CANDY_2, objSnd_snack_candy_2);
        this.game.load.audio( SoundAssetKey.OBJSND_SNACK_CHOCOLATE_1, objSnd_snack_chocolate_1);
        this.game.load.audio( SoundAssetKey.OBJSND_SNACK_CHOCOLATE_2, objSnd_snack_chocolate_2);
        this.game.load.audio( SoundAssetKey.OBJSND_SNACK_ICECREAM_1, objSnd_snack_iceCream_1);
        this.game.load.audio( SoundAssetKey.OBJSND_SNACK_ICECREAM_2, objSnd_snack_iceCream_2);
        this.game.load.audio( SoundAssetKey.OBJSND_SNACK_JELLY_1, objSnd_snack_jelly_1);

        this.game.load.audio( SoundAssetKey.OBJSND_VEGETABLE_APPLE_1, objSnd_vegetable_apple_1);
        this.game.load.audio( SoundAssetKey.OBJSND_VEGETABLE_APPLE_2, objSnd_vegetable_apple_2);
        this.game.load.audio( SoundAssetKey.OBJSND_VEGETABLE_CARROT_1, objSnd_vegetable_carrot_1);
        this.game.load.audio( SoundAssetKey.OBJSND_VEGETABLE_CARROT_2, objSnd_vegetable_carrot_2);
        this.game.load.audio( SoundAssetKey.OBJSND_VEGETABLE_GRAPE_1, objSnd_vegetable_grape_1);
        this.game.load.audio( SoundAssetKey.OBJSND_VEGETABLE_GRAPE_1, objSnd_vegetable_grape_1);
        this.game.load.audio( SoundAssetKey.OBJSND_VEGETABLE_GRAPE_2, objSnd_vegetable_grape_2);
        this.game.load.audio( SoundAssetKey.OBJSND_VEGETABLE_ONION_1, objSnd_vegetable_onion_1);
        this.game.load.audio( SoundAssetKey.OBJSND_VEGETABLE_ONION_2, objSnd_vegetable_onion_2);
        this.game.load.audio( SoundAssetKey.OBJSND_VEGETABLE_RADISH_1, objSnd_vegetable_radish_1);
        this.game.load.audio( SoundAssetKey.OBJSND_VEGETABLE_RADISH_2, objSnd_vegetable_radish_2);
        this.game.load.audio( SoundAssetKey.OBJSND_VEGETABLE_STRAWBERRY_1, objSnd_vegetable_strawberry_1);
        this.game.load.audio( SoundAssetKey.OBJSND_VEGETABLE_STRAWBERRY_2, objSnd_vegetable_strawberry_2);
        this.game.load.audio( SoundAssetKey.OBJSND_VEGETABLE_SWEETPOTATO_1, objSnd_vegetable_sweetPotato_1);
        this.game.load.audio( SoundAssetKey.OBJSND_VEGETABLE_SWEETPOTATO_2, objSnd_vegetable_sweetPotato_2);
        this.game.load.audio( SoundAssetKey.OBJSND_VEGETABLE_SWEETPOTATO_3, objSnd_vegetable_sweetPotato_3);
        this.game.load.audio( SoundAssetKey.OBJSND_VEGETABLE_WELSHONION_1, objSnd_vegetable_welshonion_1);
        this.game.load.audio( SoundAssetKey.OBJSND_VEGETABLE_WELSHONION_2, objSnd_vegetable_welshonion_2);
        this.game.load.audio( SoundAssetKey.OBJSND_VEGETABLE_WELSHONION_3, objSnd_vegetable_welshonion_3);

        this.game.load.audio( SoundAssetKey.OBJSND_WRONG_1, objSnd_wrong_1);
        this.game.load.audio( SoundAssetKey.OBJSND_WRONG_2, objSnd_wrong_2);







    }


}


PreloadResource.instance = null;