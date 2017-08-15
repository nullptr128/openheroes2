/**
 * OpenHeroes2
 * 
 * This class tries to find and fix tiles where borderization
 * using original Heroes2 is impossible.
 */

import Injectable from '../../../Common/IOC/Injectable';
import Inject from '../../../Common/IOC/Inject';
import EditorStore from '../../Core/EditorStore';
import Point from '../../../Common/Types/Point';
import ITile from '../../../Common/Model/ITile';
import Nullable from '../../../Common/Support/Nullable';
import Terrain from '../../../Common/Types/Terrain';
import Arrays from '../../../Common/Support/Arrays';
import TerrainData from '../../../Common/Game/Terrain/TerrainData';

@Injectable()
class AutoFixer {

    @Inject( EditorStore )
    private gStore: EditorStore;

    /**
     * Searches and fixes tiles from rectangle-shaped map section.
     * @param fromPos top/left position of rectangle
     * @param toPos bottom/right position of rectangle
     * @param triesCount how many times this function called itself recursively
     */
    public fixMapSection( fromPos: Point , toPos: Point , triesCount: number = 0 ): void {

        // store amount of tiles fixed
        let count: number = 0;

        // try to fix tiles
        for( let x = fromPos.x ; x <= toPos.x ; ++x ) {
            for( let y = fromPos.y ; y <= toPos.y ; ++y ) {
                count += this.fixMapTile( x , y );
            }
        }

        /**
         * Sometimes one pass is not enough (as fixing breaks another tile), so we are
         * making another call of this function if previous one fixed at least one tile.
         * However we have hard limit of 50 recursive calls.
         */
        if ( count > 0 && triesCount < 50 ) {
            this.fixMapSection( fromPos , toPos , triesCount + 1 );
        }

    }

    /**
     * Tries to fix map tile in position x/y
     * @param x tile-x position to fix
     * @param y tile-y position to fix
     */
    public fixMapTile( x: number , y: number ): number {

        // store amount of tiles fixed
        let count: number = 0;

        const tile: Nullable<ITile> = this.gStore.map.getMapTileOrNull( x , y );
        if ( tile && !this.isValid( tile ) ) {
            this.internalFix( tile.x , tile.y , tile.terrain );
            count++;
        }

        return count;

    }

    /**
     * Checks if this tile should be marked as invalid
     * @param tile target tile
     */
    public isValid( tile: ITile ): boolean {

        for( let x = tile.x - 1 ; x <= tile.x ; ++x ) {
            for( let y = tile.y - 1 ; y <= tile.y ; ++y ) {
                // use "square method" for this
                if ( this.isTileSquareValid( tile , x , y ) ) {
                    return true;
                }
            }
        }

        return false;

    }

    /**
     * Checks if tile should be marked as invalid using "square method". This
     * method works as follows - a target tile should be a part of a 2x2 tile
     * segment with exacly the same terrain, it its not then its invalid.
     * @param tile target tile
     * @param startX 
     * @param startY 
     */
    public isTileSquareValid( tile: ITile , startX: number , startY: number ): boolean {

        for( let x = startX ; x <= startX+1 ; ++x ) {
            for( let y = startY ; y <= startY+1 ; ++y ) {
                const checkTile: Nullable<ITile> = this.gStore.map.getMapTileOrNull( x , y );
                if ( checkTile && tile.terrain != checkTile.terrain ) {
                    return false;
                }
            }
        }

        return true;

    }

    /**
     * Tries to fix partcular tile
     * @param tileX x-position of tile
     * @param tileY y-position of tile
     * @param terrain terrain of tile
     */
    public internalFix( tileX: number , tileY: number , terrain: Terrain ): void {

        // create array that will held neightbour tiles counts
        const terrainCounts: number[] = new Array( 9 );
        // fill it with zeroes initially
        terrainCounts.fill( 0 );

        // calculate neightbours
        for( let x = tileX - 1 ; x <= tileX + 1 ; ++x ) {
            for( let y = tileY - 1 ; y <= tileY + 1 ; ++y ) {
                if ( x != tileX || y != tileY ) {
                    const tile: Nullable<ITile> = this.gStore.map.getMapTileOrNull( x , y );
                    if ( tile ) {
                        terrainCounts[ tile.terrain ] += 1;
                    }
                }
            }
        }

        // select "best terrain" (the one with most quantity)
        let bestTerrain: Nullable<Terrain> = null;
        let bestTerrainCount: number = -1;
        terrainCounts.forEach( (count,newTerrain) => {
            if ( count > bestTerrainCount && terrain !== newTerrain ) {
                bestTerrainCount = count;
                bestTerrain = newTerrain;
            }
        } );

        // fix tile if possible
        if ( bestTerrain !== null ) {
            this.gStore.map.setTileTerrain(
                tileX , 
                tileY ,
                bestTerrain ,
                Arrays.randomElement( TerrainData[ bestTerrain! ].basicTiles )
            );
        }

    }
    
}

export default AutoFixer;
