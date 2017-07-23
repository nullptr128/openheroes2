/**
 * OpenHeroes2
 * 
 * IH2Tile describes single tile readed from .TIL file.
 */

import IColor from '../../Types/IColor';

interface IH2Tile {
    width: number;
    height: number;
    pixmap: IColor[][];
}

export default IH2Tile;