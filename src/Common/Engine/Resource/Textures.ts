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
    isLoaded: boolean;
    textures: Pixi.Texture[];
}

type TextureLoaderFunc = () => Promise<string[]>;

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
            if ( icnEntry.isLoaded ) {
                return icnEntry.textures[ frame ];
            } else {
                this.ensureEntrySize( icnEntry , frame + 1 );
                return icnEntry.textures[ frame ];
            }
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
            if ( tilEntry.isLoaded ) {
                return tilEntry.textures[ frame ];
            } else {
                this.ensureEntrySize( tilEntry , frame + 1 );
                return tilEntry.textures[ frame ];
            }
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

        const textureEntry: ITextureEntry = {
            isLoaded: false ,
            textures: new Array<Pixi.Texture>( minimumFrames + 1 ) ,
        };

        this.internalLoadTextures( textureEntry , () => this.gGraphicsLoader.getIcnAsDataUrl( icnFileName ) );
        return textureEntry;

    }

    /**
     * Creates TIL texture pack to insert into this.fTil map.
     * @param tilFileName name of til files
     * @param minimumFrames create structure with at least that number of frames* (described at the top of file)
     */
    public createTilTextures( tilFileName: string , minimumFrames: number ): ITextureEntry {

        const textureEntry: ITextureEntry = {
            isLoaded: false ,
            textures: new Array<Pixi.Texture>( minimumFrames + 1 ) ,
        };

        this.internalLoadTextures( textureEntry , () => this.gGraphicsLoader.getTilAsDataUrl( tilFileName ) );
        return textureEntry;

    }

    private ensureEntrySize( entry:ITextureEntry , size: number ): void {
        while ( entry.textures.length < size ) {
            entry.textures.push( new Pixi.Texture( Pixi.Texture.EMPTY as any ) );
        }
    }

    private async internalLoadTextures( entry: ITextureEntry , loaderFunc: TextureLoaderFunc ): Promise<void> {

        // first of all, fill textures array with textures pointing to empty texture;
        // we will rebind them to correct ones when they will load
        for( let i = 0 ; i < entry.textures.length ; ++i ) {
            entry.textures[i] = new Pixi.Texture( Pixi.Texture.EMPTY as any );
        }

        // create array of promises that will resolve when texture is loaded
        const loadPromises: Promise<void>[] = [];

        // now load all sprites from icn as dataurls
        const dataUrls: string[] = await loaderFunc();

        // finally rebind textures to real ones
        for( let i = 0 ; i < dataUrls.length ; ++i ) {
            // store current dataurl
            const dataUrl: string = dataUrls[i];
            // create new Pixi.BaseTexture from dataUrl
            const baseTexture: Pixi.BaseTexture = Pixi.BaseTexture.from( dataUrl );
            // if we already have empty texture in array at that index
            if ( i < entry.textures.length ) {
                // create promise 
                const promise: Promise<void> = new Promise( resolve => {
                    // just rebind existing one
                    baseTexture.once( 'loaded' , () => {
                        entry.textures[i].baseTexture = baseTexture;
                        entry.textures[i].frame = new Pixi.Rectangle( 0 , 0 , baseTexture.width , baseTexture.height );
                        entry.textures[i].update();
                        resolve();
                    } );
                } );
                loadPromises.push( promise );
            } else {
                // otherwise, just add new one at the end of array
                entry.textures.push( new Pixi.Texture( baseTexture ) );
            }   
        }

        // run all promises and await it
        await Promise.all( loadPromises );

        // finally mark entry as loaded
        entry.isLoaded = true;

    }

}

export default Textures;