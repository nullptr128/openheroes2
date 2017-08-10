
import Injectable from '../../../Common/IOC/Injectable';
import Inject from '../../../Common/IOC/Inject';
import EditorStore from '../../Core/EditorStore';
import Point from '../../../Common/Types/Point';
import IAutoBorderMatrix from './IAutoBorderMatrix';
import WaterBorders from './WaterBorders';
import Nullable from '../../../Common/Support/Nullable';
import ITile from '../../../Common/Model/ITile';
import Arrays from '../../../Common/Support/Arrays';

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

    private borderizeWith( x: number , y: number , matrixList: IAutoBorderMatrix[] ): void {

        matrixList.forEach( matrix => {

            for( let i = 0 ; i <= 5 ; ++i ) {
                const point: Point = this.getMatrixPoint( i );
                const tile: Nullable<ITile> = this.gStore.map.getMapTile( point.x + x , point.y + y );
                if ( !tile ) {
                    return;
                }
                if ( matrix.source[i] !== null ) {
                    if ( ( matrix.source[i] as any ).not !== undefined ) {
                        if ( tile.terrain == ( matrix.source[i] as any ).not ) {
                            return;
                        }
                    } else {
                        if ( tile.terrain != matrix.source[i] ) {
                            return;
                        }
                    }
                }

            }

            for( let i = 0 ; i <= 5 ; ++i ) {
                const point: Point = this.getMatrixPoint( i );
                const tile: ITile = this.gStore.map.getMapTile( point.x + x , point.y + y )!;
                if ( matrix.out[i] !== null ) {
                    console.log( matrix.out[i] );
                    this.gStore.map.setTileTerrain( 
                        tile.x , tile.y ,
                        tile.terrain ,
                        Arrays.randomElement( matrix.out[i]!.sprites ) ,
                        matrix.out[i]!.mirror ,
                        matrix.out[i]!.flip ,
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
