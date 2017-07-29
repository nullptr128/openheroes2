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
import MapDisplayBasicPipeline from '../../Common/Render/MapDisplay/MapDisplayBasicPipeline';
import Render from '../../Common/Engine/Render/Render';

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

    @Inject( MapDisplayBasicPipeline )
    private gMapDisplayBasicPipeline: MapDisplayBasicPipeline;

    @Inject( Render )
    private gRender: Render;

    /**
     * Prepares editor to run on launch.
     */
    public async run(): Promise<void> {
        
        this.gEditorStore.initialize();
        this.gMinimapDisplay.setMapSize( this.gEditorStore.map.getMapSize() );                
        await this.gEngine.initialize();

        this.initMinimapDisplay();        
        this.initMapDisplay();

    }

    /**
     * Initializes minimap
     */
    private initMinimapDisplay(): void {
        this.gMinimapDisplay.setTerrainFunc( (x,y) => this.gEditorStore.map.getMapTile(x,y).terrain );
        this.gMinimapDisplay.redrawMap();
    }

    private initMapDisplay(): void {
        this.gMapDisplay.setPipeline( [...this.gMapDisplayBasicPipeline.getPipelines() ] );
        this.gRender.startRender( stage => {
            this.gMapDisplay.render( stage );
        } );
    }

}

export default EditorCore;
