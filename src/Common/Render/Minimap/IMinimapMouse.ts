
import Point from '../../Types/Point';

interface IMinimapMouse {
    tilePosition: Point;
    cursorPosition: Point;
    buttons: {
        left: boolean;
        middle: boolean;
        right: boolean;
    };
}

export default IMinimapMouse;
