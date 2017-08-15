/**
 * OpenHeroes2
 * 
 * This interface holds data structure that is passed to map rendering
 * pipelines.
 */

import Point from '../../Types/Point';

interface IMapDisplayData {
    tileStart: Point; // top-left point of visible map 
    tileEnd: Point; // bottom-right point of visible map
    tilesWidth: number; // amount of tiles visible on screen (x axis)
    tilesHeight: number; // amount of tiles visible on screen (y axis)
    tileSize: number; // size of single tile in pixels (with zoom included)
    scale: number; // scale of all tiles (1=100%)
    absOffsetX: number; // absolute offset x
    absOffsetY: number; // absolute offset y
}

export default IMapDisplayData;
