
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
        }

    }

}

export default MapTerrainControl;
