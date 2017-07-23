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
import Locale from './Misc/Locale';
import Events from '../Events/Events';
import EEditorLoaded from '../../Editor/Events/EEditorLoaded';

@Injectable()
class Engine {

    @Inject( Agg )
    private gAgg: Agg;

    @Inject( Pal )
    private gPal: Pal;

    @Inject( Locale )
    private gLocale: Locale;

    @Inject( Events )
    private gEvents: Events;

    /**
     * Initializes OpenHeroes2 engine.
     */
    public async initialize(): Promise<void> {

        // load Heroes2.agg and Heroes2x.agg 
        await this.gAgg.loadAggFile( 'h2data/Heroes2.agg' );
        await this.gAgg.loadAggFile( 'h2data/Heroes2x.agg' );

        // initialize sprite palette
        await this.gPal.openPalFile( await this.gAgg.getFile( 'KB.PAL' ) );

        // load locale files
        await this.gLocale.loadLocale( 'english' );

        // notify other that we are ready
        this.gEvents.trigger( EEditorLoaded );

    }

}

export default Engine;
