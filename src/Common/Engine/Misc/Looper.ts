
import Injectable from '../../IOC/Injectable';

type LooperFunc = ( dt: number ) => void;

@Injectable()
class Looper {

    private fActive: boolean = false;
    private fLooperPipeline: LooperFunc[] = [];

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

    public subscribe( looperFunc: LooperFunc ): void {
        this.fLooperPipeline.push( looperFunc );
    }

    public unsubscribe( looperFunc: LooperFunc ): void {
        this.fLooperPipeline = this.fLooperPipeline.filter( fn => fn != looperFunc );
    }

    private loop( dt: number ): void {

        this.fLooperPipeline.forEach( looperFunc => {
            looperFunc( dt );
        } );

    }

}

export default Looper;
