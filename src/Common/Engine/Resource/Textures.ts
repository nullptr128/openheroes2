/**
 * OpenHeroes2
 * 
 * This class manages textures for Pixi.js renderer. It allows
 * to simply "get" any texture from any icn file. It has lazy
 * loader implemented, using Pixi.js internals.
 * 
 * Code is abusing fact that Pixi.Texture is not a real texture,
 * instead it is a "pointer" to Pixi.BaseTexture which holds the
 * texture data. If we are going to display frame which is not 
 * loaded, this module will create Pixi.Texture pointing to "empty"
 * texture until real texture has loaded; after real texture is loaded,
 * Texture.baseTexture is swapped to loaded one, immediately displaying
 * on scene.
 * 
 * (*) - Before ICN or TIL texture is fully loaded, we do not know
 * how many frames it will have. So, if we request 20th frame from
 * some ICN file, lazy loader will assume that this ICN file has
 * at least 20 frames and will create 20 empty textures. Later on,
 * when texture is fully loaded, array of textures is adjusted to
 * hold the rest of frames if needed.
 */

import Injectable from '../../IOC/Injectable';
import * as Pixi from 'pixi.js';
import Nullable from '../../Support/Nullable';
import Agg from '../Data/Agg';
import Inject from '../../IOC/Inject';
import Icn from '../Data/Icn';
import GraphicsLoader from '../Graphics/GraphicsLoader';
import Render from '../Render/Render';
import Tools from '../../Support/Tools';
import PerfCounter from '../../Support/PerfCounter';

interface ITextureEntry {
    textures: Pixi.Texture[];
}

@Injectable()
class Textures {

    @Inject( Agg )
    private gAgg: Agg;

    @Inject( GraphicsLoader )
    private gGraphicsLoader: GraphicsLoader;

    @Inject( Render )
    private gRender: Render;

    private fIcn: Map<string,ITextureEntry> = new Map();
    private fTil: Map<string,ITextureEntry> = new Map();

    /**
     * Receives (and lazy loads if neccessary) texture from icnFile with
     * particular frame index. If texture wasnt used before, it will become
     * displayed after around 0.2 seconds.
     * @param icnFileName name of icn file
     * @param frame index of frame
     */
    public getIcnTexture( icnFileName: string , frame: number ): Pixi.Texture {
    
        const icnEntry: Nullable<ITextureEntry> = this.fIcn.get( icnFileName );
        if ( icnEntry ) {
            return icnEntry.textures[ frame ];
        } else {
            const newEntry: ITextureEntry = this.createIcnTextures( icnFileName , frame );
            this.fIcn.set( icnFileName , newEntry );
            return newEntry.textures[ frame ];
        }

    }

    /**
     * Receives (and lazy loads if neccessary) texture from tilFile with
     * particular frame index. If texture wasnt used before, it will become
     * displayed after around 0.2 seconds.
     * @param tilFileName 
     * @param frame 
     */
    public getTilTexture( tilFileName: string , frame: number ): Pixi.Texture {

        const tilEntry: Nullable<ITextureEntry> = this.fTil.get( tilFileName );
        if ( tilEntry ) {
            return tilEntry.textures[ frame ];
        } else {
            const newEntry: ITextureEntry = this.createTilTextures( tilFileName , frame );
            this.fTil.set( tilFileName , newEntry );
            return newEntry.textures[ frame ];
        }

    }

    /**
     * Creates ICN texture pack to insert into this.fIcn map.
     * @param icnFileName name of icn files
     * @param minimumFrames create structure with at least that number of frames* (described at the top of file)
     */
    public createIcnTextures( icnFileName: string , minimumFrames: number ): ITextureEntry {

        const textures: Pixi.Texture[] = new Array<Pixi.Texture>( minimumFrames + 1 );
        this.internalLoadIcn( icnFileName , textures );
        
        return {
            textures
        };

    }

    /**
     * Creates TIL texture pack to insert into this.fTil map.
     * @param tilFileName name of til files
     * @param minimumFrames create structure with at least that number of frames* (described at the top of file)
     */
    public createTilTextures( tilFileName: string , minimumFrames: number ): ITextureEntry {

        const textures: Pixi.Texture[] = new Array<Pixi.Texture>( minimumFrames + 1 );
        this.internalLoadTil( tilFileName , textures );
        
        return {
            textures
        };

    }

    /**
     * Loads icn textures.
     * @param icnFileName name of icn file
     * @param textures array of textures of particular frames
     */
    private async internalLoadIcn( icnFileName: string , textures: Pixi.Texture[] ): Promise<void> {

        // first of all, fill textures array with textures pointing to empty texture;
        // we will rebind them to correct ones when they will load
        for( let i = 0 ; i < textures.length ; ++i ) {
            textures[i] = new Pixi.Texture( Pixi.Texture.EMPTY as any );
        }

        // now load all sprites from icn as dataurls
        const dataUrls: string[] = await this.gGraphicsLoader.getIcnAsDataUrl( icnFileName );

        // finally rebind textures to real ones
        for( let i = 0 ; i < dataUrls.length ; ++i ) {
            // store current dataurl
            const dataUrl: string = dataUrls[i];
            // create new Pixi.BaseTexture from dataUrl
            const baseTexture: Pixi.BaseTexture = Pixi.BaseTexture.from( dataUrl );
            // if we already have empty texture in array at that index
            if ( i < textures.length ) {
                // just rebind existing one
                baseTexture.once( 'loaded' , () => {
                    textures[i].baseTexture = baseTexture;
                    textures[i].frame = new Pixi.Rectangle( 0 , 0 , baseTexture.width , baseTexture.height );
                    textures[i].update();
                } );
            } else {
                // otherwise, just add new one at the end of array
                textures.push( new Pixi.Texture( baseTexture ) );
            }   
        }

    }

    private async internalLoadTil( tilFileName: string , textures: Pixi.Texture[] ): Promise<void> {

        // @TODO: dedupe this function?

        const counter: PerfCounter = new PerfCounter();

        // first of all, fill textures array with textures pointing to empty texture
        for( let i = 0 ; i < textures.length ; ++i ) {
            textures[i] = new Pixi.Texture( Pixi.Texture.EMPTY as any );
        }

        // now load all sprites from icn as dataurls
        const dataUrls: string[] = await this.gGraphicsLoader.getTilAsDataUrl( tilFileName );

        // finally rebind textures
        for( let i = 0 ; i < dataUrls.length ; ++i ) {
            const dataUrl: string = dataUrls[i];
            const baseTexture: Pixi.BaseTexture = Pixi.BaseTexture.from( dataUrl );
            if ( i < textures.length ) {
                baseTexture.once( 'loaded' , () => {
                    textures[i].baseTexture = baseTexture;
                    textures[i].frame = new Pixi.Rectangle( 0 , 0 , baseTexture.width , baseTexture.height );
                    textures[i].update();
                } );
            } else {
                textures.push( new Pixi.Texture( baseTexture ) );
            }   
        }

    }

}

export default Textures;