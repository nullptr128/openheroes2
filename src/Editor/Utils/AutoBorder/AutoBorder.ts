
import Injectable from '../../../Common/IOC/Injectable';
import Inject from '../../../Common/IOC/Inject';
import EditorStore from '../../Core/EditorStore';
import Point from '../../../Common/Types/Point';
import WaterBorders from './WaterBorders';
import Nullable from '../../../Common/Support/Nullable';
import ITile from '../../../Common/Model/ITile';
import Arrays from '../../../Common/Support/Arrays';
import IAutoBorderProcessor from './IAutoBorderProcessor';

@Injectable()
class AutoBorder {

    @Inject( EditorStore )
    private gStore: EditorStore;

    public borderizeMapSection( fromPos: Point , toPos: Point ): void {

        this.fixMapSection( fromPos , toPos );

        for( let x = fromPos.x ; x <= toPos.x ; ++x ) {
            for( let y = fromPos.y ; y <= toPos.y ; ++y ) {
                this.borderizeTile( x , y );
            }
        }

    }

    public borderizeTile( x: number , y: number ): void {

        this.borderizeWith( x , y , WaterBorders );

    }

    private getMatrixPoint( i: number ): Point {
        return new Point( i % 3 , Math.floor( i / 3.00 ) );
    }

    private borderizeWith( x: number , y: number , processor: IAutoBorderProcessor ): void {

        processor.matchers.forEach( matcher => {

            for( let i = 0 ; i < 9 ; ++i ) {
                
                const point: Point = this.getMatrixPoint( i );
                const tile: Nullable<ITile> = this.gStore.map.getMapTile( point.x + x , point.y + y );
                if ( !tile ) {
                    return;
                }

                const source = processor.sources[ matcher.in[i] ];
                
                if ( !source( tile.terrain ) ) {
                    return;
                }

            }

            for( let i = 0 ; i < 9 ; ++i ) {

                const point: Point = this.getMatrixPoint( i );
                const tile: ITile = this.gStore.map.getMapTile( point.x + x , point.y + y )!;

                const output = processor.outputs[ matcher.out[i] ];
                if ( output ) {
                    this.gStore.map.setTileTerrain(
                        tile.x , 
                        tile.y ,
                        tile.terrain ,
                        Arrays.randomElement( output.sprites ) ,
                        output.mirror ,
                        output.flip ,
                    );
                }

            }

        } );


    }

    public fixMapSection( fromPos: Point , toPos: Point ): void {

        for( let x = fromPos.x ; x <= toPos.x ; ++x ) {
            for( let y = fromPos.y ; y <= toPos.y ; ++y ) {
                this.fixMapTile( x , y );
            }
        }

    }

    public fixMapTile( x: number , y: number ): void {



    }


}

export default AutoBorder;
