/**
 * OpenHeroes2
 * 
 * This provider registers all services required by
 * editor.
 */

import Container from '../../Common/IOC/Container';
import EditorCore from './EditorCore';
import EditorStore from './EditorStore';
import EditorMapFactory from './EditorMapFactory';
import MapControl from '../Actions/MapControl';
import EditorBrushTilePipeline from '../Render/MapDisplay/EditorBrushTilePipeline';
import EditorGridPipeline from '../Render/MapDisplay/EditorGridPipeline';

export default function EditorProvider( container: Container ): void {
    container.bind( EditorCore );
    container.bind( EditorStore );
    container.bind( EditorMapFactory );
    container.bind( EditorBrushTilePipeline );
    container.bind( EditorGridPipeline );
    container.bind( MapControl );
}
