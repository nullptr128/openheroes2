/**
 * OpenHeroes2
 * 
 * This class is responsible for running and quitting map editor.
 */

import Inject from '../../Common/IOC/Inject';
import Injectable from '../../Common/IOC/Injectable';
import Engine from '../../Common/Engine/Engine';
import EditorStore from './EditorStore';
import MinimapDisplay from '../../Common/Render/Minimap/MinimapDisplay';
import MapDisplay from '../../Common/Render/MapDisplay/MapDisplay';
import Render from '../../Common/Engine/Render/Render';
import TerrainPipeline from '../../Common/Render/MapDisplay/TerrainPipeline';
import Nullable from '../../Common/Support/Nullable';
import ITile from '../../Common/Model/ITile';
import Looper from '../../Common/Engine/Misc/Looper';
import MapControl from '../Actions/MapControl';
import Events from '../../Common/Engine/Events/Events';
import EEditorReady from '../Events/EEditorReady';
import EditorBrushTilePipeline from '../Render/MapDisplay/EditorBrushTilePipeline';
import EditorGridPipeline from '../Render/MapDisplay/EditorGridPipeline';
import MapTerrainControl from '../Actions/MapTerrainControl';
import EEditorTabChanged from '../Events/EEditorTabChanged';
import EditorActiveTab from '../Types/EditorActiveTab';
import MapRiverControl from '../Actions/MapRiverControl';
import RiverPipeline from '../../Common/Render/MapDisplay/RiverPipeline';

@Injectable()
class EditorCore {

    @Inject( Engine )
    private gEngine: Engine;

    @Inject( EditorStore )
    private gEditorStore: EditorStore;

    @Inject( MinimapDisplay )
    private gMinimapDisplay: MinimapDisplay;

    @Inject( MapDisplay )
    private gMapDisplay: MapDisplay;

    @Inject( TerrainPipeline )
    private gTerrainPipeline: TerrainPipeline;

    @Inject( RiverPipeline )
    private gRiverPipeline: RiverPipeline;

    @Inject( MapControl )
    private gMapControl: MapControl;

    @Inject( MapTerrainControl )
    private gMapTerrainControl: MapTerrainControl;

    @Inject( MapRiverControl )
    private gMapRiverControl: MapRiverControl;

    @Inject( Render )
    private gRender: Render;

    @Inject( Looper )
    private gLooper: Looper;

    @Inject( Events )
    private gEvents: Events;

    @Inject( EditorBrushTilePipeline )
    private gEditorBrushTilePipeline: EditorBrushTilePipeline;

    @Inject( EditorGridPipeline )
    private gEditorGridPipeline: EditorGridPipeline;

    /**
     * Prepares editor to run on launch.
     */
    public async run(): Promise<void> {

        // First of all initialize OpenHeroes2 engine
        await this.gEngine.initialize();
        
        // Initialize Editor Store
        this.gEditorStore.initialize();

        // Initialize minimapDisplay map size (this should be moved into separate event later)
        this.gMinimapDisplay.setMapSize( this.gEditorStore.map.getMapSize() );                

        // Initialize and configure minimap display
        this.initMinimapDisplay();        

        // Initialize and configure main map scree
        this.initMapDisplay();

        // Initialize map control module
        this.gMapControl.initialize();
        
        // Initialize map terrain control module
        this.gMapTerrainControl.initialize();

        // Initialize and configure rivers 
        this.gMapRiverControl.initialize();

        // Start Looper
        this.gLooper.startLooper();

        // Subscribe to looper
        this.gLooper.subscribe( dt => {
            this.gRender.render( () => this.gMapDisplay.render() );
        } );

        // Trigger Event that editor is ready to run
        await this.gEvents.trigger( EEditorReady );

        // Trigger opening terrain tab
        this.gEvents.trigger( EEditorTabChanged , { activeTab: EditorActiveTab.TERRAIN } );

    }

    /**
     * Initializes minimap
     */
    private initMinimapDisplay(): void {
        this.gMinimapDisplay.setTerrainFunc( (x,y) => this.gEditorStore.map.getMapTile(x,y).terrain );        
    }

    /**
     * Initializes map display
     */
    private initMapDisplay(): void {
        
        // setup terrain pipeline
        this.gTerrainPipeline.setTileFunc( (x,y) => this.getTileFunc(x,y) );

        // setup river pipeline
        this.gRiverPipeline.setTileFunc( (x,y) => this.getTileFunc(x,y) );

        // finally add pipelines to mapdisplay
        this.gMapDisplay.setPipeline( [
            this.gTerrainPipeline ,
            this.gRiverPipeline ,
            this.gEditorGridPipeline ,
            this.gEditorBrushTilePipeline ,
        ] );

        this.gRender.addContainer( this.gMapDisplay.getContainer() );
        this.gMapDisplay.forceRedraw();

    }

    private getTileFunc( x: number , y: number ): Nullable<ITile> {
        if ( x >= 0 && y >= 0 && x < this.gEditorStore.map.getMapSize() && y < this.gEditorStore.map.getMapSize() ) {
            return this.gEditorStore.map.getMapTile( x , y );
        } else {
            return null;
        }
    }

}

export default EditorCore;
