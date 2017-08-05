
import Point from '../../Types/Point';

interface IMapDisplayMouse {
    realPosition: Point;
    mapTilePosition: Point;
    screenTilePosition: Point;
    buttons: {
        left: boolean;
        middle: boolean;
        right: boolean;
    }
}

export default IMapDisplayMouse;
