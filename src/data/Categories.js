import AssetKey from "./AssetKey";


export default class Categories {

    static get VEGETABLE() {
        return {
            category: 'vegetable',
            displayPosition: {groupStartX: 275, groupEndX: -775, displayBarY: 138, xPos: 29, yPos:172},
            backGroundColor:0x82d3e6,
            backGroundAsset: ['vegetable'],
            assetKey: AssetKey.CORNER_VEGETABLE,
            displayBoardHead: true,
            totalDisplayBoard: 5,
            itemList: [
                {item:'apple', price:'1000', xPos:1111, yPos:211},
                {item:'carrot', price:'500', xPos:487, yPos:177},
                {item:'grape', price:'1500', xPos:1133, yPos:393},
                {item:'onion', price:'500', xPos:68, yPos:393},
                {item:'radish', price:'500', xPos:175, yPos:149},
                {item:'strawberry', price:'2000', xPos:1404, yPos:241},
                {item:'sweetPotato', price:'500', xPos:404, yPos:392},
                {item:'welshonion', price:'1000', xPos:776, yPos:139},
            ],
            rollingButtonList:[
                ['radish', 'onion'],
                ['carrot', 'sweetPotato'],
                ['welshonion'],
                ['apple', 'grape'],
                ['strawberry'],
                ['radish', 'onion'],
            ]

        }
    }

    static get SEAFOOD() {
        return {
            category: 'seafood',
            displayPosition: {groupStartX: 61, groupEndX: -790, displayBarY: 150, xPos: 371, yPos:183},
            backGroundColor:0x67cb59,
            backGroundAsset: ['seafood'],
            assetKey: AssetKey.CORNER_SEAFOOD,
            displayBoardHead: false,
            totalDisplayBoard: 8,
            itemList: [
                {item:'abalone', price:'1500', xPos:1147, yPos:409},
                {item:'crab', price:'1000', xPos:1413, yPos:208},
                {item:'mackerel', price:'1000', xPos:426, yPos:213},
                {item:'shell', price:'1000', xPos:816, yPos:183},
                {item:'shrimp', price:'1000', xPos:781, yPos:361},
                {item:'squid', price:'1000', xPos:1120, yPos:207},
            ],
            rollingButtonList:[
                [],
                ['mackerel'],
                ['shell', 'shrimp'],
                ['squid', 'abalone'],
                ['crab'],
                ['mackerel'],
                ['shell', 'shrimp'],
                ['squid', 'abalone'],
                ['crab'],
            ]

        }
    }

    static get MEAT() {
        return {
            category: 'meat',
            displayPosition: {groupStartX: 344, groupEndX: -720, displayBarY: 172, xPos: 698, yPos:196},
            backGroundColor:0xe88baa,
            backGroundAsset: ['meat'],
            assetKey: AssetKey.CORNER_MEAT,
            displayBoardHead: false,
            totalDisplayBoard: 6,
            itemList: [
                {item:'drumstick', price:'1500', xPos:1391, yPos:198},
                {item:'chicken', price:'2000', xPos:1361, yPos:396},
                {item:'tenderloin', price:'3000', xPos:831, yPos:217},
                {item:'sirloin', price:'3000', xPos:829, yPos:415},
                {item:'bacon', price:'1500', xPos:283, yPos:216},
                {item:'boiledPork', price:'1500', xPos:267, yPos:412},
            ],
            rollingButtonList:[
                [],
                ['bacon', 'boiledPork'],
                ['tenderloin', 'sirloin'],
                ['drumstick', 'chicken'],
                ['bacon', 'boiledPork'],
                ['tenderloin', 'sirloin'],
                ['drumstick', 'chicken'],
            ]

        }
    }

    static get NECESSARY() {
        return {
            category: 'necessary',
            displayPosition: {groupStartX: 343, groupEndX: -1445, displayBarY: 171, xPos: 38, yPos:442},
            backGroundColor:0x31be8e,
            backGroundAsset: ['necessary_1', 'necessary_2'],
            assetKey: AssetKey.CORNER_NECESSARY,
            displayBoardHead: false,
            totalDisplayBoard: 4,
            itemList: [
                {item:'cleanser', price:'1500', xPos:1310, yPos:211},
                {item:'shampoo', price:'1000', xPos:182, yPos:220},
                {item:'soap', price:'500', xPos:765, yPos:240},
                {item:'brush', price:'500', xPos:778, yPos:422},
                {item:'paste', price:'500', xPos:192, yPos:417},
                {item:'tissue', price:'1000', xPos:1313, yPos:415},
                {item:'wetTissue', price:'1000', xPos:1988, yPos:223},
            ],
            rollingButtonList:[
                [],
                ['shampoo', 'paste'],
                ['soap', 'brush'],
                ['cleanser', 'tissue'],
                ['wetTissue'],
            ]

        }
    }

    static get DAIRY() {
        return {
            category: 'dairy',
            displayPosition: {groupStartX: 343, groupEndX: -1305, displayBarY: 171, xPos: 378, yPos:441},
            backGroundColor:0xf49e4b,
            backGroundAsset: ['dairy_1', 'dairy_2'],
            assetKey: AssetKey.CORNER_DAIRY,
            displayBoardHead: false,
            totalDisplayBoard: 4,
            itemList: [
                {item:'bananaMilk', price:'500', xPos:1309, yPos:214},
                {item:'cheese', price:'1000', xPos:1848, yPos:227},
                {item:'chocolateMilk', price:'500', xPos:244, yPos:415},
                {item:'egg', price:'1500', xPos:742, yPos:201},
                {item:'milk', price:'1000', xPos:259, yPos:208},
                {item:'strawberryMilk', price:'500', xPos:768, yPos:415},
                {item:'yogurt', price:'1000', xPos:1863, yPos:409},
            ],
            rollingButtonList:[
                [],
                ['milk', 'chocolateMilk'],
                ['egg', 'strawberryMilk'],
                ['bananaMilk'],
                ['cheese', 'yogurt'],
            ]

        }
    }

    static get SNACK() {
        return {
            category: 'snack',
            displayPosition: {groupStartX: 174, groupEndX: -420, displayBarY: 161, xPos: 682, yPos:435},
            backGroundColor:0xd58fe9,
            backGroundAsset: ['snack'],
            assetKey: AssetKey.CORNER_SNACK,
            displayBoardHead: true,
            totalDisplayBoard: 8,
            itemList: [
                {item:'candy', price:'1000', xPos:51, yPos:235},
                {item:'chocolate', price:'1000', xPos:325, yPos:239},
                {item:'iceCream', price:'1000', xPos:623, yPos:238},
                {item:'jelly', price:'1000', xPos:1220, yPos:249},
            ],
            rollingButtonList:[
                ['candy'],
                ['chocolate'],
                ['iceCream'],
                ['jelly'],
                ['candy'],
                ['chocolate'],
                ['iceCream'],
                ['jelly'],
                ['candy'],
            ]

        }
    }

    static get COUNTER() {
        return {
            category: 'counter',
            displayPosition: {xPos: 1033, yPos:185},
            backGroundColor:0x8bd3e7,
            assetKey: AssetKey.CORNER_COUNTER,

        }
    }



}