
import IColor from '../../Types/IColor';

interface IH2Sprite {
    offsetX: number;
    offsetY: number;
    width: number;
    height: number;
    type: number;
    pixmap: IColor[][];
}

export default IH2Sprite;
