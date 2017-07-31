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
import ETabChanged from '../Events/ETabChanged';
import MapDisplay from '../../Common/Render/MapDisplay/MapDisplay';
import Render from '../../Common/Engine/Render/Render';
import TerrainPipeline from '../../Common/Render/MapDisplay/TerrainPipeline';
import Nullable from '../../Common/Support/Nullable';
import ITile from '../../Common/Model/ITile';
import Looper from '../../Common/Engine/Misc/Looper';
import MapControl from '../Actions/MapControl';

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

    @Inject( MapControl )
    private gMapControl: MapControl;

    @Inject( Render )
    private gRender: Render;

    @Inject( Looper )
    private gLooper: Looper;

    /**
     * Prepares editor to run on launch.
     */
    public async run(): Promise<void> {
        
        this.gEditorStore.initialize();
        this.gMinimapDisplay.setMapSize( this.gEditorStore.map.getMapSize() );                
        await this.gEngine.initialize();

        this.initMinimapDisplay();        
        this.initMapDisplay();

        this.gMapControl.initialize();

        this.gLooper.startLooper();

        this.gLooper.subscribe( dt => {
            this.gRender.render( stage => this.gMapDisplay.render( stage ) );
        } );

    }

    /**
     * Initializes minimap
     */
    private initMinimapDisplay(): void {
        this.gMinimapDisplay.setTerrainFunc( (x,y) => this.gEditorStore.map.getMapTile(x,y).terrain );
        this.gMinimapDisplay.redrawMap();
    }

    /**
     * Initializes map display
     */
    private initMapDisplay(): void {
        this.gTerrainPipeline.setTileFunc( (x,y) => this.getTileFunc(x,y) );
        this.gMapDisplay.setPipeline( [
            this.gTerrainPipeline.getPipeline()
        ] );
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
