let shakeDistance = 1;
export default class ObjectShake {

    shake(obj, obj2 = null, x, y) {
        if(x !=null)
        {

            if(obj.x === x)
            {
                obj.x -= shakeDistance;
                if(obj2 != null) obj2.x -= shakeDistance;
            }
            else
            {
                obj.x = x;
                if(obj2 != null) obj2.x += shakeDistance;
            }
        }
        else
        {
            if(obj.y === y)
            {
                obj.y -= shakeDistance;
                if(obj2 != null) obj2.y -= shakeDistance;
            }
            else
            {
                obj.y = y;
                if(obj2 != null) obj2.y += shakeDistance;
            }
        }
    }

}
