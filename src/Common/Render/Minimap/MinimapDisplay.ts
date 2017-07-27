
import Injectable from '../../IOC/Injectable';
import Nullable from '../../Support/Nullable';
import IMap from '../../Model/IMap';
import IColor from '../../Types/IColor';
import Terrain from '../../Types/Terrain';
import TerrainColor from './TerrainColor';

type GetTerrainFunc = ( x: number , y: number ) => Terrain;

@Injectable()
class MinimapDisplay {

    private fInternalCanvas: Nullable<HTMLCanvasElement>;
    private fTarget: Nullable<HTMLCanvasElement>;
    private fSize: number;
    private fGetTerrainFunc: GetTerrainFunc;

    private createCanvas( size: number ): HTMLCanvasElement {
        const result: HTMLCanvasElement = document.createElement( 'canvas' );
        result.width = size;
        result.height = size;
        return result;
    }

    public setMapSize( mapSize: number ): void {
        this.fInternalCanvas = this.createCanvas( mapSize );
        this.fSize = mapSize;
    }

    public setRenderTarget( targetCanvas: HTMLCanvasElement ): void {
        this.fTarget = targetCanvas;
    }

    public setTerrainFunc( terrainFunc: GetTerrainFunc ): void {
        this.fGetTerrainFunc = terrainFunc;
    }

    public redrawMap(): void {
        
        if ( !this.fInternalCanvas || !this.fTarget ) {
            console.warn( 'MinimapDisplay.redrawMap() called without required context!' );
            return;
        }

        const mapSize: number = this.fSize;

        const context = this.fInternalCanvas.getContext( '2d' )!;
        const imageData = context.createImageData( mapSize , mapSize );

        for( let x = 0 ; x < mapSize ; ++x ) {
            for( let y = 0 ; y < mapSize ; ++y ) {
                const pixelOffset: number = ( y * mapSize + x ) * 4;
                const color: IColor = this.getTileColor( x , y );
                imageData.data[ pixelOffset + 0 ] = color.r;
                imageData.data[ pixelOffset + 1 ] = color.g;
                imageData.data[ pixelOffset + 2 ] = color.b;
                imageData.data[ pixelOffset + 3 ] = color.a;
            }
        }

        context.putImageData( imageData , 0 , 0 );

        const targetContext = this.fTarget.getContext( '2d' )!;
        targetContext.drawImage( this.fInternalCanvas , 0 , 0 , mapSize , mapSize , 0 , 0 , this.fTarget.width , this.fTarget.height );

    }

    public getTileColor( x: number , y: number ): Readonly<IColor> {
        const terrain: Terrain = this.fGetTerrainFunc( x , y );
        return TerrainColor[ terrain ];
    }

}

export default MinimapDisplay;
