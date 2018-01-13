
import Injectable from '../../Common/IOC/Injectable';
import Inject from '../../Common/IOC/Inject';
import Events from '../../Common/Engine/Events/Events';
import EEditorTabChanged from '../Events/EEditorTabChanged';
import EditorActiveTab from '../Types/EditorActiveTab';
import EditorBrushTilePipeline from '../Render/MapDisplay/EditorBrushTilePipeline';
import MapDisplay from '../../Common/Render/MapDisplay/MapDisplay';
import IMapDisplayMouse from '../../Common/Render/MapDisplay/IMapDisplayMouse';
import EditorStore from '../Core/EditorStore';
import ITile from '../../Common/Model/ITile';
import Nullable from '../../Common/Support/Nullable';
import Terrain from '../../Common/Types/Terrain';
import Point from '../../Common/Types/Point';
import Arrays from '../../Common/Support/Arrays';

@Injectable()
class MapRoadControl {

    @Inject( Events )
    private gEvents: Events;

    @Inject( EditorBrushTilePipeline )
    private gEditorBrushTilePipeline: EditorBrushTilePipeline;

    @Inject( MapDisplay )
    private gMapDisplay: MapDisplay;

    @Inject( EditorStore )
    private gStore: EditorStore;

    private fActive: boolean = false;
    private fDrawing: boolean = false;

    public initialize(): void {

        this.gMapDisplay.onMouseMove( mouse => this.continueDrawing(mouse) );
        this.gMapDisplay.onMouseDown( mouse => this.startDrawing(mouse) );
        this.gMapDisplay.onMouseUp( mouse => this.finishDrawing(mouse) );

    }

    public onActivate(): void {
        this.gEditorBrushTilePipeline.show();
        this.fActive = true;
    }

    public onDeactivate(): void {
        this.gEditorBrushTilePipeline.hide();
        this.fActive = false;
    }

    public update( mouse: IMapDisplayMouse ): void {
        
        if ( this.fActive ) {
            
            this.gEditorBrushTilePipeline.set(
                mouse.mapTilePosition.x ,
                mouse.mapTilePosition.y ,
                mouse.mapTilePosition.x ,
                mouse.mapTilePosition.y ,
            );

            if ( this.fDrawing ) {
                if ( mouse.buttons.left ) {
                    this.drawRoad( mouse.mapTilePosition.x , mouse.mapTilePosition.y );
                } else if ( mouse.buttons.right ) {
                    this.eraseRoad( mouse.mapTilePosition.x , mouse.mapTilePosition.y );
                } 
                this.updateSpritesInSection( mouse.mapTilePosition.subtract( 3 ) , mouse.mapTilePosition.add( 3 ) );
                this.gMapDisplay.forceRedraw();
            }

        }

    }

    public startDrawing( mouse: IMapDisplayMouse ): void {

        if ( this.fActive ) {
            this.fDrawing = true;
            this.update( mouse );
        }

    }

    public continueDrawing( mouse: IMapDisplayMouse ): void {

        if ( this.fActive ) {
            this.update( mouse );
        }

    }

    public finishDrawing( mouse: IMapDisplayMouse ): void {

        if ( this.fActive ) {
            this.fDrawing = false;
            this.update( mouse );
        }

    }

    public drawRoad( x: number , y: number ): void {
        const tile: Nullable<ITile> = this.gStore.map.getMapTileOrNull( x , y );
        if ( tile && tile.terrain !== Terrain.WATER ) {
            this.gStore.map.setTileRoad( x , y , 3 );
        }
    }

    public eraseRoad( x: number , y: number ): void {
        this.gStore.map.clearTileRoad( x , y );
    }

    public updateSpritesInSection( fromPos: Point , toPos: Point ): void {

        for( let x = fromPos.x ; x <= toPos.x ; ++x ) {
            for( let y = fromPos.y ; y <= toPos.y ; ++y ) {
                this.updateSprites( x , y );
            }
        }

    }

    public updateSprites( x: number , y: number ): void {

        const tiles: Nullable<ITile>[] = [];
        for( let i = 0 ; i <= 8 ; ++i ) {
            const tile: Nullable<ITile> = this.gStore.map.getMapTileOrNull( x + i % 3 , y + Math.floor( i / 3 ) );
            tiles.push( tile );
        }

        const roadsToAdd: { x: number , y: number , sprite: number , isRoad: boolean }[] = [];

        if ( this.match( tiles , [ 'N' , 'R' , 'N' ,
                                   'N' , 'R' , 'N' ,
                                   'N' , 'R' , 'N' ] ) ) {
         
            roadsToAdd.push( { x: x + 1 , y: y + 1 , sprite: 0 , isRoad: true } );
                                    
        } else if ( this.match( tiles , [ 'N' , 'N' , 'N' , 
                                          'R' , 'R' , 'R' ,
                                          'N' , 'N' , 'N' ] ) ) {
                                              
            roadsToAdd.push( 
                { x: x + 1 , y: y + 1 , sprite: 2 , isRoad: true } ,
                { x: x + 1 , y: y + 2 , sprite: 1 , isRoad: false } 
            );
            
        }

        roadsToAdd.forEach( road => this.gStore.map.setTileRoad( road.x , road.y , road.sprite , road.isRoad ) );

    }

    private match( tiles: Nullable<ITile>[] , pattern: string[] ): boolean {

        for( let i = 0 ; i < tiles.length ; ++i ) {
            
            if ( pattern[i] == '?' ) {
                continue;
            }

            if ( pattern[i] == 'R' && tiles[i] && tiles[i]!.isRoad ) {
                continue;
            }

            if ( pattern[i] == 'N' && ( !tiles[i] || !tiles[i]!.isRoad ) ) {
                continue;
            }

            return false;

        }

        return true;

    }

}

export default MapRoadControl;
