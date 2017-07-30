/**
 * OpenHeroes2
 * 
 * This class is responsible for managing loaded assets, destroying them if necessary etc.
 */

import Injectable from '../../IOC/Injectable';
import * as Pixi from 'pixi.js';
import Nullable from '../../Support/Nullable';
import Inject from '../../IOC/Inject';
import Textures from './Textures';

@Injectable()
class Resources {

    @Inject( Textures )
    private gTextures: Textures;

    /**
     * Returns Pixi.Texture from icn file with particular frame.
     * If texture wasnt loaded yet, it will be loaded and displayed
     * automatically.
     * @param icnFileName name of icn file
     * @param frame index of frame
     */
    public getIcnTexture( icnFileName: string , frame: number = 0 ): Pixi.Texture {
        return this.gTextures.getIcnTexture( icnFileName , frame );
    }

    /**
     * Returns Pixi.Texture from til file with particular frame.
     * If texture wasnt loaded yet, it will be loaded and displayed
     * automatically.
     * @param tilFileName 
     * @param frame 
     */
    public getTilTexture( tilFileName: string , frame: number = 0 ): Pixi.Texture {
        return this.gTextures.getTilTexture( tilFileName , frame );
    }
    
}

export default Resources;
