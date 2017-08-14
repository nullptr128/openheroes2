
import Injectable from '../../../Common/IOC/Injectable';
import Inject from '../../../Common/IOC/Inject';
import EditorStore from '../../Core/EditorStore';
import Point from '../../../Common/Types/Point';
import ITile from '../../../Common/Model/ITile';
import Nullable from '../../../Common/Support/Nullable';
import Terrain from '../../../Common/Types/Terrain';
import Arrays from '../../../Common/Support/Arrays';
import TerrainData from '../../../Common/Game/Terrain/TerrainData';
import IAutoFixerProcessor from './IAutoFixerProcessor';
import WaterFixer from './WaterFixer';
import TerrainFixers from './TerrainFixers';

@Injectable()
class AutoFixer {

    @Inject( EditorStore )
    private gStore: EditorStore;

    public fixMapSection( fromPos: Point , toPos: Point , triesCount: number = 0 ): void {

        console.log( 'fixMapSection' , triesCount );

        let count: number = 0;

        for( let x = fromPos.x ; x <= toPos.x ; ++x ) {
            for( let y = fromPos.y ; y <= toPos.y ; ++y ) {
                count += this.fixMapTile( x , y );
            }
        }

        if ( count > 0 && triesCount < 50 ) {
            this.fixMapSection( fromPos , toPos , triesCount + 1 );
        }

    }

    public fixMapTile( x: number , y: number ): number {

        let count: number = 0;
        this.gStore.map.setTileDebug( x , y , false );

        const tile: Nullable<ITile> = this.gStore.map.getMapTileOrNull( x , y );
        if ( tile && !this.isValid( tile ) ) {
            this.gStore.map.setTileDebug( x , y , true );
            this.internalFix( tile.x , tile.y , tile.terrain );
            count++;
        }

        return count;

    }

    public isValid( tile: ITile ): boolean {

        for( let x = tile.x - 1 ; x <= tile.x ; ++x ) {
            for( let y = tile.y - 1 ; y <= tile.y ; ++y ) {
                if ( this.isTileSquareValid( tile , x , y ) ) {
                    return true;
                }
            }
        }

        return false;

    }

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

    public internalFix( tileX: number , tileY: number , terrain: Terrain ): void {

        const terrainCounts: number[] = new Array( 9 );
        terrainCounts.fill( 0 );

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

        let bestTerrain: Nullable<Terrain> = null;
        let bestTerrainCount: number = -1;
        terrainCounts.forEach( (count,newTerrain) => {
            if ( count > bestTerrainCount && terrain !== newTerrain ) {
                bestTerrainCount = count;
                bestTerrain = newTerrain;
            }
        } );

        if ( bestTerrain !== null ) {
            this.gStore.map.setTileTerrain(
                tileX , 
                tileY ,
                bestTerrain ,
                Arrays.randomElement( TerrainData[ bestTerrain! ].basicTiles )
            );
        }

        this.gStore.map.setTileDebug( tileX , tileY , false );

    }
    
}

export default AutoFixer;
