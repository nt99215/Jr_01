import AssetKey from "../../../data/AssetKey";
import GameConfig from "../../../data/GameConfig";
import PriceCount from "./PriceCount";
import SoundManager from "../../../manager/SoundManager";
import SoundAssetKey from "../../../data/SoundAssetKey";
import PauseDimmed from "../../../view/object/PauseDimmed";

let _coinArr, _billBaseArr, _billArr, _startX, _startY, _currentPrice, _remove,  _count, _completeCount;
let _movePos = {coinMinimumX:580, coinMaximumX:1040, coinMinimumY: 210,
    coinResultMinX:671, coinResultMaxX:945, coinResultMinY:67, coinResultMaxY:136,
    billMinimumX:580, billMaximumX:1040, billMinimumY: 185,
    billResultMinX:674, billResultMaxX:766, billResultMinY:70, billResultMaxY:121};
const _coinSoundAsset = [SoundAssetKey.CASH_SND_100, SoundAssetKey.CASH_SND_500];
const _billSoundAsset = [SoundAssetKey.CASH_SND_1000, SoundAssetKey.CASH_SND_5000, SoundAssetKey.CASH_SND_10000];
const _intervalComplete = 30;
const _intervalCount = 300;

export default class PaymentPos {
    constructor(game) {
        this._game = game;
        this._gameGroup = this._game.add.group();
        this._posGroup = this._game.add.group();
        this._cashGroup = this._game.add.group();
        this._key = AssetKey.PAYMENT_POS;
        this._coin100 = false;
        this._checkOut = false;
        this._complete = false;
        _coinArr = [];
        _billBaseArr = [];
        _billArr = [];
        _startX = 0;
        _startY = 0;
        _currentPrice = 0;
        _count = 0;
        _completeCount = 0;
        _remove = false;

        this._init();
        this._cashGenerate();
        this._posGenerate();
        this._sndPlay();

        PauseDimmed.instance._destroy();
        PauseDimmed.instance._init(this._game.add.group());

    }

    _sndPlay() {


        GameConfig.BGM_VOLUME = GameConfig.REDUCE_BGM_VOLUME;
        // SoundManager.instance.bgmSoundStart();

        if(GameConfig.SOUND_ENABLED) SoundManager.instance.effectSoundStop(SoundAssetKey.MAIN_BGM, GameConfig.REDUCE_BGM_VOLUME,  true, false);

        SoundManager.instance.effectSoundStop(GameConfig.CURRENT_GUIDE_SOUND, 0, false, true);
        SoundManager.instance.effectSound(SoundAssetKey.guideNarr_5);
        GameConfig.CURRENT_GUIDE_SOUND = SoundAssetKey.guideNarr_5;
    }

    _init() {

        this.dragArea = this._game.add.graphics(0, 0);
        this.dragArea.beginFill(0x000, 0);
        this.dragArea.drawRect(0, 0, 1280, 720);
        this.dragArea.endFill();
        this.dragArea.visible = false;
        // this._gameGroup.addChild(this.dragArea);

        this.bgRect = this._game.add.graphics(0, 0);
        this.bgRect.beginFill(0x8bd2e8, 1);
        this.bgRect.drawRect(0, 0, 1280, 336);
        this.bgRect.endFill();
        this._gameGroup.addChild(this.bgRect);

        this.bgRectBottom = this._game.add.graphics(0, 0);
        this.bgRectBottom.beginFill(0x2e3c56, 1);
        this.bgRectBottom.drawRect(0, 336 + 33, 1280, 351);
        this.bgRectBottom.endFill();
        this._gameGroup.addChild(this.bgRectBottom);

        this.bgBar = new Phaser.Image(this._game, 0, 336, this._key, 'paymentBgBar');
        this.bgBar.width = 1280;
        this._gameGroup.addChild(this.bgBar);

        this.paymentDisplay = new Phaser.Image(this._game, 196, 23, this._key, 'paymentDisplay');
        this._gameGroup.addChild(this.paymentDisplay);

        this.paymentDisplayResult = new Phaser.Image(this._game, 196, 177, this._key, 'paymentDisplayResult');
        this._gameGroup.addChild(this.paymentDisplayResult);

        this.bowl = new Phaser.Image(this._game, 620, 19, this._key, 'payment_bowl');
        this._gameGroup.addChild(this.bowl);

    }

    _cashGenerate() {
        //100
        for(let i = 0; i<5; i++)
        {
            let term = 178;
            let xPos = term + (i * 49);
            let coin = new Phaser.Image(this._game, xPos, 382, this._key, 'cash_100');
            coin.x = term + (i * (49 + coin.width));
            coin.amount = 100;
            coin.soundAsset = _coinSoundAsset[0];
            // coin.minimumX = _movePos[0].minimumX;
            // console.log(coin.minimumX)
            this._cashGroup.addChild(coin);
            _coinArr.push(coin);
        }

        //500
        let coin_500 = new Phaser.Image(this._game, 976, 374, this._key, 'cash_500');
        coin_500.amount = 500;
        coin_500.soundAsset = _coinSoundAsset[1];
        this._cashGroup.addChild(coin_500);
        _coinArr.push(coin_500);

        //1000~10000
        let _amount = [1000, 5000, 10000];
        let _billQuantity = [40, 10, 5];
        for(let i = 0; i < 3; i++)
        {
            let term = 118;
            let xPos = term + (i * 75);
            let baseAsset = 'cash_base_' + _amount[i];
            let baseBill = new Phaser.Image(this._game, xPos, 524, this._key, baseAsset);
            baseBill.x = term + (i * (75 + baseBill.width));
            baseBill.amount = _amount[i];
            this._cashGroup.addChild(baseBill);
            _billBaseArr.push(baseBill);

            // baseBill.inputEnabled =  true;
            // baseBill.pixelPerfectOver = true;
            // baseBill.pixelPerfectClick = true;
            // baseBill.events.onInputDown.add(this._cashSelect, this);

            for(let j = 0; j < _billQuantity[i]; j ++)
            {
                let asset = 'cash_' + _amount[i];
                let bill = new Phaser.Image(this._game, xPos, 524, this._key, asset);
                bill.x = term + (i * (75 + bill.width));
                bill.amount = _amount[i];
                bill.soundAsset = _billSoundAsset[i];
                this._cashGroup.addChild(bill);
                _billBaseArr.push(bill);

                bill.inputEnabled =  true;
                bill.pixelPerfectOver = true;
                bill.pixelPerfectClick = true;
                bill.input.enableDrag(true, true, true, 255, this.dragArea);
                bill.events.onInputDown.add(this._cashSelect, this);
                bill.events.onDragUpdate.add(this._dragUpdate, this);
                bill.events.onDragStop.add(this._stopDrag, this);
                bill.minX = _movePos.billMinimumX;
                bill.maxX = _movePos.billMaximumX;
                bill.minY = _movePos.billMinimumY;
                bill.resultMinX = _movePos.billResultMinX;
                bill.resultMaxX = _movePos.billResultMaxX;
                bill.resultMinY = _movePos.billResultMinY;
                bill.resultMaxY = _movePos.billResultMaxY;
            }
        }

        for(let i = 0; i < _coinArr.length; i++)
        {
            let obj = _coinArr[i];
            obj.inputEnabled =  true;
            obj.pixelPerfectOver = true;
            obj.pixelPerfectClick = true;
            obj.input.enableDrag(true, true, true, 255, this.dragArea);
            obj.events.onInputDown.add(this._cashSelect, this);
            obj.events.onDragUpdate.add(this._dragUpdate, this);
            obj.events.onDragStop.add(this._stopDrag, this);
            obj.minX = _movePos.coinMinimumX;
            obj.maxX = _movePos.coinMaximumX;
            obj.minY = _movePos.coinMinimumY;
            obj.resultMinX = _movePos.coinResultMinX;
            obj.resultMaxX = _movePos.coinResultMaxX;
            obj.resultMinY = _movePos.coinResultMinY;
            obj.resultMaxY = _movePos.coinResultMaxY;
        }

    }


    _posGenerate() {
        this._priceCount = new PriceCount(this._game, this._cashGroup, this._posGroup, this._key);
    }

    _cashSelect(obj) {

        // console.log(obj.soundAsset);
        this._checkOut = true;
        SoundManager.instance.effectSoundStop(GameConfig.CURRENT_GUIDE_SOUND, 0, false, true);
        SoundManager.instance.effectSoundStop(GameConfig.CURRENT_BUTTON_SOUND, 0, false, true);
        SoundManager.instance.effectSound(obj.soundAsset, 0.8);
        GameConfig.CURRENT_BUTTON_SOUND = obj.soundAsset;
        _startX = obj.x;
        _startY = obj.y;
        _remove = false;

        if(obj.amount<1000) return;

       }

    _dragUpdate(obj) {

        obj.bringToTop();
        // console.log(parseInt(obj.x), parseInt(obj.y));
    }

    _stopDrag(obj) {

        this._checkOut = false;
        _count = 0;

        if(this._pushEnable(obj.amount))
        {
            if(obj.x >= obj.minX && obj.x < obj.maxX && obj.y < obj.minY)
            {
                obj.inputEnabled = false;
                _currentPrice += obj.amount;
                this._priceCount._count(_currentPrice);
                let xPos = this._game.rnd.between(obj.resultMinX, obj.resultMaxX);
                let yPos = this._game.rnd.between(obj.resultMinY, obj.resultMaxY);
                // let angle = this._game.rnd.between(-20, 20);
                let tw = this._game.add.tween(obj).to({x:xPos, y: yPos, angle: 0}, 200, Phaser.Easing.Quartic.Out, true, 0);
                tw.onComplete.add(()=> {
                    this._payment()
                })
            }

            else this._restoreMoney(obj);
        }

        else
        {
            if(obj.x >= obj.minX && obj.x < obj.maxX && obj.y < obj.minY)
            {
                SoundManager.instance.effectSoundStop(GameConfig.CURRENT_GUIDE_SOUND, 0, false, true);
                SoundManager.instance.effectSoundStop(GameConfig.CURRENT_BUTTON_SOUND, 0, false, true);
                let soundAsset = 'cash_snd_over_' + this._game.rnd.between(1,2);
                SoundManager.instance.effectSound(soundAsset, 0.8);
                GameConfig.CURRENT_GUIDE_SOUND = soundAsset;
            }

            this._restoreMoney(obj);
        }


    }

    _restoreMoney(obj) {
        let tw = this._game.add.tween(obj).to({x:_startX, y: _startY}, 200, Phaser.Easing.Quartic.Out, true, 0);
        tw.onComplete.add(()=> {
            if(_remove)
            {
                this._cashGroup.removeChild(obj);
                obj.destroy();
            }
        })
    }

    _payment() {

        if(_currentPrice === GameConfig.TOTAL_AMOUNT)
        {
            SoundManager.instance.effectSoundStop(GameConfig.CURRENT_GUIDE_SOUND, 0, false, true);
            SoundManager.instance.effectSoundStop(GameConfig.CURRENT_BUTTON_SOUND, 0, false, true);
            SoundManager.instance.effectSound(SoundAssetKey.CASH_SND_COMPLETE, 0.8);
            this._complete = true;
            for(let i = 0; i < _coinArr.length; i++) _coinArr[i].inputEnabled = false;
            for(let i = 0; i < _billBaseArr.length; i++) _billBaseArr[i].inputEnabled = false;
        }
    }

    _pushEnable(amount) {

        let total = GameConfig.TOTAL_AMOUNT.toString();
        let len = (total.length <= 4 ) ? 1 : 2;
        let remainPrice = String(total).substring(total.length, len);
        let resultPrice = _currentPrice + amount;

        // console.log('remainPrice : ', remainPrice, ' - ', 'resultPrice : ', resultPrice,  ' - ', 'amount : ', amount);

        let idx = String(resultPrice).length - 3;
        let str = String(resultPrice).substr(idx, 1);

        // console.log(typeof str, str)
        if(Number(remainPrice) === 500)
        {
            if(str === '1') this._coin100 = true;
            if(this._coin100) if(amount === 500) return false;
            if(! this._coin100) if(amount === 500) return true;
            if(Number(str) > 5) return false;
        }

        if(resultPrice > GameConfig.TOTAL_AMOUNT) return false;
        else return true;
    }

    _update() {
        if(this._complete)
        {
            _completeCount++;
            if(_completeCount >= _intervalComplete)
            {
                this._complete = false;
                GameConfig.GAME_FINISH = true;
            }
        }

        if(! this._checkOut)
        {
            _count++;
            if(_count >= _intervalCount)
            {
                // this._checkOut = true;
                _count = 0;
                SoundManager.instance.effectSoundStop(GameConfig.CURRENT_GUIDE_SOUND, 0, false, true);
                SoundManager.instance.effectSoundStop(GameConfig.CURRENT_BUTTON_SOUND, 0, false, true);
                SoundManager.instance.effectSound(SoundAssetKey.CASH_SND_SHORTAGE, 0.8);
                GameConfig.CURRENT_GUIDE_SOUND = SoundAssetKey.CASH_SND_SHORTAGE;
            }
        }
    }

    _destroy() {
        this._gameGroup.removeChildren(0, this._gameGroup.length);
        this._posGroup.removeChildren(0, this._posGroup.length);
        this._cashGroup.removeChildren(0, this._cashGroup.length);
        for(let i  =0; i<this._gameGroup.length; i++) this._gameGroup[i].destroy();
        for(let i  =0; i<this._posGroup.length; i++) this._posGroup[i].destroy();
        for(let i  =0; i<this._cashGroup.length; i++) this._cashGroup[i].destroy();
    }


}