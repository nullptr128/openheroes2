
import * as KeyboardJS from 'keyboardjs';
import Injectable from '../../Common/IOC/Injectable';
import Inject from '../../Common/IOC/Inject';
import Looper from '../../Common/Engine/Misc/Looper';
import MapDisplay from '../../Common/Render/MapDisplay/MapDisplay';
import Tools from '../../Common/Support/Tools';

interface IMovement {
    up: boolean;
    down: boolean;
    left: boolean;
    right: boolean;
    zoomIn: boolean;
    zoomOut: boolean;
}

@Injectable() 
class MapControl {

    @Inject( Looper )
    private gLooper: Looper;

    @Inject( MapDisplay )
    private gMapDisplay: MapDisplay;

    private fMovement: IMovement = {
        up: false ,
        down: false ,
        left: false ,
        right: false ,   
        zoomIn: false ,
        zoomOut: false ,
    };

    private fScrollSpeed: number = 15.000;
    private fZoomSpeed: number = 0.750;
    private fWheelZoomDelta: number = 0.000;

    public initialize(): void {

        KeyboardJS.bind( 'up' , () => this.fMovement.up = true , () => this.fMovement.up = false );
        KeyboardJS.bind( 'down' , () => this.fMovement.down = true , () => this.fMovement.down = false );
        KeyboardJS.bind( 'left' , () => this.fMovement.left = true , () => this.fMovement.left = false );
        KeyboardJS.bind( 'right' , () => this.fMovement.right = true , () => this.fMovement.right = false );
        KeyboardJS.bind( 'q' , () => this.fMovement.zoomIn = true , () => this.fMovement.zoomIn = false );
        KeyboardJS.bind( 'w' , () => this.fMovement.zoomOut = true , () => this.fMovement.zoomOut = false );

        this.gLooper.subscribe( dt => this.timeSlice(dt) );

    }

    public onMouseWheel( event: WheelEvent ): void {

        let direction: number = 0.000;
        if ( event.deltaY > 0.001 ) {
            direction = 1;
        } else if ( event.deltaY < -0.001 ) {
            direction = -1;
        }
        
        this.fWheelZoomDelta += direction * 0.100;

    }

    private timeSlice( dt: number ): void {

        let moveX: number = 0.000;
        let moveY: number = 0.000;
        let zoom: number = 0.000;

        if ( this.fMovement.up ) {
            moveY -= this.fScrollSpeed * dt;
        }

        if ( this.fMovement.down ) {
            moveY += this.fScrollSpeed * dt;
        }

        if ( this.fMovement.left ) {
            moveX -= this.fScrollSpeed * dt;
        }

        if ( this.fMovement.right ) {
            moveX += this.fScrollSpeed * dt;
        }

        if ( this.fMovement.zoomIn ) {
            zoom += this.fZoomSpeed * dt;
        }

        if ( this.fMovement.zoomOut ) {
            zoom -= this.fZoomSpeed * dt;
        }

        if ( Math.abs( moveX ) > 0.001 || Math.abs( moveY ) > 0.001 ) {
            this.gMapDisplay.moveMap( moveX , moveY );
        }

        if ( Math.abs( zoom ) > 0.001 ) {
            this.gMapDisplay.changeZoom( zoom );
        }

        if ( Math.abs( this.fWheelZoomDelta ) > 0.001 ) {
            if ( this.fWheelZoomDelta > 0.000 ) {
                const delta: number = this.fWheelZoomDelta * 10 * dt;
                this.fWheelZoomDelta = Math.max( 0.000 , this.fWheelZoomDelta - delta );
                this.gMapDisplay.changeZoom( delta );
            } else {
                const delta: number = this.fWheelZoomDelta * 10 * dt;
                this.fWheelZoomDelta = Math.min( 0.000 , this.fWheelZoomDelta - delta );
                this.gMapDisplay.changeZoom( delta );
            }
        }

    }

}

export default MapControl;