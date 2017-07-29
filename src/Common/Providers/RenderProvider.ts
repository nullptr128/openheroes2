/**
 * OpenHeroes2
 * 
 * This provider installs services directly tied to rendering.
 */

import Container from '../IOC/Container';
import MinimapDisplay from '../Render/Minimap/MinimapDisplay';
import MapDisplay from '../Render/MapDisplay/MapDisplay';
import MapDisplayBasicPipeline from '../Render/MapDisplay/MapDisplayBasicPipeline';

export default function RenderProvider( container: Container ): void {
    container.bind( MinimapDisplay );
    container.bind( MapDisplay );
    container.bind( MapDisplayBasicPipeline );
}
