import Point from '../../Types/Point';

interface IMapDisplayData {
    tileStart: Point;
    tileEnd: Point;
    tilesWidth: number;
    tilesHeight: number;
    tileSize: number;
    scale: number;
    absOffsetX: number;
    absOffsetY: number;
}

export default IMapDisplayData;
