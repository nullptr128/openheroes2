/**
 * OpenHeroes2
 * 
 * This provider installs services directly tied to rendering.
 */

import Container from '../IOC/Container';
import MinimapDisplay from '../Render/Minimap/MinimapDisplay';
import MapDisplay from '../Render/MapDisplay/MapDisplay';
import TerrainPipeline from '../Render/MapDisplay/TerrainPipeline';
import RiverPipeline from '../Render/MapDisplay/RiverPipeline';
import RoadPipeline from '../Render/MapDisplay/RoadPipeline';

export default function RenderProvider( container: Container ): void {
    container.bind( MinimapDisplay );
    container.bind( MapDisplay );
    container.bind( TerrainPipeline );
    container.bind( RiverPipeline );
    container.bind( RoadPipeline );
}
