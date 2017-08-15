/**
 * OpenHeroes2
 * 
 * This interface holds information of mouse actions on mapdisplay canvas.
 */

import Point from '../../Types/Point';

interface IMapDisplayMouse {
    realPosition: Point; // x/y position on canvas
    mapTilePosition: Point; // x/y of tile position on whole map
    screenTilePosition: Point; // x/y of tile position on screen
    buttons: {
        left: boolean; // is left mouse button held
        middle: boolean; // is middle mouse button held
        right: boolean; // is right mouse button held
    }
}

export default IMapDisplayMouse;
