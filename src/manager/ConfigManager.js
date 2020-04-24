import GameConfig from "../data/GameConfig";

export default class ConfigManager {
    /**
     * CONFIG RESET
     *
     */
    GAME_CONFIG_RESET() {
        GameConfig.POP_ENABLED = false;
        // GameConfig.SOUND_ENABLED = true;
        GameConfig.BGM_ENABLED = true;
        GameConfig.IN_GAME = true;
        GameConfig.TUTORIAL_DISABLED = false;
        GameConfig.GAME_FINISH = false;
        GameConfig.IN_GAME = true;
        GameConfig.CURRENT_CHAPTER = 1;
        GameConfig.GUIDE_REMOVE = false;
        GameConfig.CHAPTER_CLEAR = false;
        GameConfig.TOTAL_AMOUNT = 0;
        GameConfig.TOTAL_QUANTITY = 0;
        GameConfig.PURCHASE_LIST = [];
        GameConfig.PURCHASE_ITEM_ARRAY_RESET = [];
        GameConfig.PURCHASE_ITEM_FOR_LIST_ARRAY_RESET = [];
    }

    GAME_OVER() {
        GameConfig.IN_GAME = false;
        GameConfig.GAME_RESET = true;


    }

}