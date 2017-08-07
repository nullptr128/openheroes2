
import Injectable from '../../Common/IOC/Injectable';
import Events from '../../Common/Engine/Events/Events';
import Inject from '../../Common/IOC/Inject';
import EEditorTabChanged from '../Events/EEditorTabChanged';
import EditorActiveTab from '../Types/EditorActiveTab';
import EditorBrushTilePipeline from '../Render/MapDisplay/EditorBrushTilePipeline';
import EditorStore from '../Core/EditorStore';
import EditorTerrainBrushSize from '../Types/EditorTerrainBrushSize';
import MapDisplay from '../../Common/Render/MapDisplay/MapDisplay';
import IMapDisplayMouse from '../../Common/Render/MapDisplay/IMapDisplayMouse';
import Point from '../../Common/Types/Point';
import Terrain from '../../Common/Types/Terrain';
import TerrainData from '../../Common/Game/Terrain/TerrainData';
import Arrays from '../../Common/Support/Arrays';
import Tools from '../../Common/Support/Tools';

@Injectable()
class MapTerrainControl {

    @Inject( Events )
    private gEvents: Events;

    @Inject( EditorBrushTilePipeline )
    private gEditorBrushTilePipeline: EditorBrushTilePipeline;

    @Inject( EditorStore )
    private gEditorStore: EditorStore;

    @Inject( MapDisplay )
    private gMapDisplay: MapDisplay;

    private fIsActive: boolean;
    
    public initialize(): void {

        this.gEvents.on( EEditorTabChanged , data => {
            if ( data.activeTab == EditorActiveTab.TERRAIN ) {
                this.onActivate();
            } else {
                this.onDeactivate();
            }
        } );

        this.gMapDisplay.onMouseMove( mouse => this.update(mouse) );
        this.gMapDisplay.onMouseDown( mouse => this.update(mouse) );

    }

    public getBrushSize(): number {

        const brushSize: EditorTerrainBrushSize = this.gEditorStore.ui.getTerrainBrushSize();
        
        switch ( brushSize ) {
            case EditorTerrainBrushSize.SINGLE:
                return 1;
            case EditorTerrainBrushSize.DOUBLE: 
                return 3;
            case EditorTerrainBrushSize.TRIPLE:
                return 5;
            default:
                return 0;
        }

    }

    public onActivate(): void {
        this.gEditorBrushTilePipeline.set( 0 , 0 , this.getBrushSize() );
        this.fIsActive = true;
    }

    public onDeactivate(): void {
        this.gEditorBrushTilePipeline.set( 0 , 0 , 0 );        
        this.fIsActive = false;
    }

    public update( mouse: IMapDisplayMouse ): void {

        if ( this.fIsActive ) {

            this.gEditorBrushTilePipeline.set(
                mouse.mapTilePosition.x ,
                mouse.mapTilePosition.y ,
                this.getBrushSize() ,
            );

            if ( mouse.buttons.left ) {
                this.placePrimaryTile( mouse.mapTilePosition );
            } else if ( mouse.buttons.right ) {
                this.placeSecondaryTile( mouse.mapTilePosition );
            }

        }

    }

    private placePrimaryTile( mapPos: Point ): void {
        this.internalPlaceTile( mapPos , this.gEditorStore.ui.getTerrainBrushType() );
    }

    private placeSecondaryTile( mapPos: Point ): void {
        this.internalPlaceTile( mapPos , this.gEditorStore.ui.getTerrainAltBrushType() );
    }

    private getSpriteId( terrainType: Terrain ): number {

        if ( Tools.random( 1 , 100 ) < 10 ) {
            return Arrays.randomElement( TerrainData[ terrainType ].decorationTiles );
        } else {
            return Arrays.randomElement( TerrainData[ terrainType ].basicTiles );
        }

    }

    private internalPlaceTile( mapPos: Point , terrainType: Terrain ): void {

        const brushSize: number = this.getBrushSize();
        const startX: number = mapPos.x - Math.floor( brushSize / 2.000 );
        const startY: number = mapPos.y - Math.floor( brushSize / 2.000 );
        const endX: number = startX + brushSize;
        const endY: number = startY + brushSize;

        for( let x = startX ; x < endX ; ++x ) {
            for( let y = startY ; y < endY ; ++y ) {
                const spriteId: number = this.getSpriteId( terrainType );
                this.gEditorStore.map.setTileTerrain( x , y , terrainType , spriteId );
            }
        }

        this.gMapDisplay.forceRedraw();

    }

}

export default MapTerrainControl;
