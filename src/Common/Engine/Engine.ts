/**
 * OpenHeroes2
 * 
 * This class is responsible for bootstrapping and managing
 * OpenHeroes2 engine.
 */

import Injectable from '../IOC/Injectable';
import Agg from './Data/Agg';
import Inject from '../IOC/Inject';
import Pal from './Data/Pal';

@Injectable()
class Engine {

    @Inject( Agg )
    private gAgg: Agg;

    @Inject( Pal )
    private gPal: Pal;

    /**
     * Initializes OpenHeroes2 engine.
     */
    public async initialize(): Promise<void> {

        // load Heroes2.agg and Heroes2x.agg 
        await this.gAgg.loadAggFile( 'h2data/Heroes2.agg' );
        await this.gAgg.loadAggFile( 'h2data/Heroes2x.agg' );

        // initialize sprite palette
        await this.gPal.openPalFile( await this.gAgg.getFile( 'KB.PAL' ) );

    }

}

export default Engine;
