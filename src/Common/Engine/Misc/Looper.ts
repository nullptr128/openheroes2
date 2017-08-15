/**
 * OpenHeroes2
 * 
 * This class is responsible for calling user-defined functions as quickly as possible,
 * for rendering and game logic. It automatically calculates delta time and passes it
 * to user function.
 */

import Injectable from '../../IOC/Injectable';

type LooperFunc = ( dt: number ) => void;

@Injectable()
class Looper {

    private fActive: boolean = false;
    private fLooperPipeline: LooperFunc[] = [];

    /**
     * Initializes and runs looper.
     */
    public startLooper(): void {

        this.fActive = true;

        let lastDT: number = performance.now();

        const doLoop = () => {
            const now: number = performance.now();
            const dt: number = ( now - lastDT ) / 1000.0;
            lastDT = now;
            this.loop( dt );
            if ( this.fActive ) {
                requestAnimationFrame( doLoop );
            }
        };

        doLoop();

    }

    /**
     * Adds user-defined function to looper. It will be called
     * (possibly) at 60fps, passing delta time every call.
     * @param looperFunc function
     */
    public subscribe( looperFunc: LooperFunc ): void {
        this.fLooperPipeline.push( looperFunc );
    }

    /**
     * Removes user-defined function from looper.
     * @param looperFunc function
     */
    public unsubscribe( looperFunc: LooperFunc ): void {
        this.fLooperPipeline = this.fLooperPipeline.filter( fn => fn != looperFunc );
    }

    /**
     * Calls all looper functions
     * @param dt delta time in seconds
     */
    private loop( dt: number ): void {

        this.fLooperPipeline.forEach( looperFunc => {
            looperFunc( dt );
        } );

    }

}

export default Looper;
