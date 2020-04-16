export default class ObjectPosition{
    constructor(game) {
        ObjectPosition.instance = this;

    }

    _pos(obj) {
        console.log('x : ', parseInt(obj.x), 'y :', parseInt(obj.y));

    }


}