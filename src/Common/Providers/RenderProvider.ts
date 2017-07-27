/**
 * OpenHeroes2
 * 
 * This provider installs services directly tied to rendering.
 */

import Container from '../IOC/Container';
import MinimapDisplay from '../Render/Minimap/MinimapDisplay';

export default function RenderProvider( container: Container ): void {
    container.bind( MinimapDisplay );
}
