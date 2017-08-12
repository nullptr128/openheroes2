
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

@Injectable()
class AutoFixer {

    @Inject( EditorStore )
    private gStore: EditorStore;

    public fixMapSection( fromPos: Point , toPos: Point , triesCount: number = 0 ): void {

        let fixCount: number = 0;

        for( let x = fromPos.x ; x <= toPos.x ; ++x ) {
            for( let y = fromPos.y ; y <= toPos.y ; ++y ) {
                fixCount += this.fixMapTile( x , y );
            }
        }

        if ( fixCount > 0 && triesCount < 50 ) {
            this.fixMapSection( fromPos , toPos , triesCount + 1 );
        }

    }

    public fixMapTile( x: number , y: number ): number {

        const processors: IAutoFixerProcessor[] = [
            WaterFixer ,
        ];

        const fixCount: number = processors.reduce( (p,c) => p += this.fixWith( x , y , c ) , 0 );
        return fixCount;

    }

    private getMatrixPoint( i: number ): Point {
        return new Point( i % 3 , Math.floor( i / 3.00 ) );
    }

    public fixWith( x: number , y: number , processor: IAutoFixerProcessor ): number {

        let fixCount: number = 0;

        processor.matchers.forEach( matcher => {

            for( let i = 0 ; i < 9 ; ++i ) {
                
                const point: Point = this.getMatrixPoint( i );

                if ( this.gStore.map.isValidTile( point.x + x , point.y + y ) ) {                
                    const tile: ITile = this.gStore.map.getMapTile( point.x + x , point.y + y );
                    const source = processor.sources[ matcher.in[i] ];
                
                    if ( !source( tile.terrain ) ) {
                        return;
                    }

                } else {

                    const source = processor.sources[ matcher.in[i] ];
                    if ( !source( null ) ) {
                        return;
                    }

                }

            }

            for( let i = 0 ; i < 9 ; ++i ) {
                
                const point: Point = this.getMatrixPoint( i );

                if ( this.gStore.map.isValidTile( point.x + x , point.y + y ) ) {
                    const tile: ITile = this.gStore.map.getMapTile( point.x + x , point.y + y )!;

                    const output = processor.outputs[ matcher.out[i] ];

                    if ( output ) {
                        const copyTile: Nullable<ITile> = this.gStore.map.getMapTileOrNull( 
                            output.copyFrom.x + point.x + x ,
                            output.copyFrom.y + point.y + y 
                        );
                        if ( copyTile ) {
                            this.gStore.map.setTileTerrain(
                                tile.x ,
                                tile.y ,
                                copyTile.terrain ,
                                Arrays.randomElement( TerrainData[ copyTile.terrain ].basicTiles )
                            );
                            fixCount++;
                        }
                    }

                }

            }

        } );

        return fixCount;

    }
    
}

export default AutoFixer;
