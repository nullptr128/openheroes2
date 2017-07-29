/**
 * OpenHeroes2
 * 
 * This provider installs services directly tied to rendering.
 */

import Container from '../IOC/Container';
import MinimapDisplay from '../Render/Minimap/MinimapDisplay';
import MapDisplay from '../Render/MapDisplay/MapDisplay';

export default function RenderProvider( container: Container ): void {
    container.bind( MinimapDisplay );
    container.bind( MapDisplay );
}
