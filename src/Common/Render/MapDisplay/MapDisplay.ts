/**
 * OpenHeroes2
 * 
 * This class is responsible for drawing game screen.
 */

import Injectable from '../../IOC/Injectable';
import Render from '../../Engine/Render/Render';
import Inject from '../../IOC/Inject';

@Injectable()
class MapDisplay {

    @Inject( Render )
    private gRender: Render;

    private fCanvas: HTMLCanvasElement;

    public createAndGetCanvas( baseWidth: number , baseHeight: number ): HTMLCanvasElement {
        this.fCanvas = this.gRender.getCanvas( baseWidth , baseHeight );
        return this.fCanvas;
    }

}

export default MapDisplay;
