/**
 * OpenHeroes2
 * 
 * This class is responsible for running and quitting map editor.
 */

import Inject from '../../Common/IOC/Inject';
import Injectable from '../../Common/IOC/Injectable';
import Engine from '../../Common/Engine/Engine';

@Injectable()
class EditorCore {

    @Inject( Engine )
    private gEngine: Engine;

    public async run(): Promise<void> {
        await this.gEngine.initialize();
    }

}

export default EditorCore;
