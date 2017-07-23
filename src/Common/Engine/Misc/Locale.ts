/**
 * OpenHeroes2
 * 
 * This class is reponsible for managing translation files
 * and extraction of translated strings from language files.
 */

import * as _ from 'lodash';
import Injectable from '../../IOC/Injectable';
import Inject from '../../IOC/Inject';
import Files from '../Files/Files';
import Paths from './Paths';

type ILocaleDef = { file: string , key: string };

interface ILocale {
    [key: string]: string|ILocale;
}

@Injectable()
export default class Locale {

    @Inject( Files )
    private gFiles: Files;

    @Inject( Paths )
    private gPaths: Paths;

    private fLoaded: boolean = false;
    private fData: ILocale = {};
    private fLocale: string = '';    

    private static FILES: ILocaleDef[] = [
        { file: 'common.json' , key: 'Common' } ,
        { file: 'editor.json' , key: 'Editor' } ,
    ];

    /**
     * This method changes current locale to another one. It returns
     * promise that is resolved when locale with its all files is
     * correctly loaded.
     */
    public async loadLocale( locale: string ): Promise<void> {

        // initialize variables for now
        this.fLoaded = false;
        this.fLocale = locale;
        this.fData = {};

        // load all locale files
        await Promise.all( Locale.FILES.map( f => this.loadLocaleFile(f) ) );

        // finally set locale as loaded
        this.fLoaded = true;

    }

    /**
     * This helper method loads one locale file and puts it into fData map.
     */
    private async loadLocaleFile( def: ILocaleDef ): Promise<void> {

        // first, load file contents
        const fileData: ILocale = await this.gFiles.getJSONFile( this.gPaths.getLocaleDir() + '/' + this.fLocale + '/' + def.file );

        // finally put fileData to map
        this.fData[ def.key ] = fileData;

    }

    /**
     * This method retrieves an key from locale files
     */
    public get( keyPath: string , params?: any ): string {

        if ( this.fLoaded == false ) {
            throw new Error( 'Locale is not loaded.' );
        }

        const value: string | object = _.get( this.fData , keyPath , '[' + keyPath + ']' );

        if ( typeof value == 'string' ) {
            return value;
        } else {
            throw new Error( 'Trying to return Object value instead of key string.' );
        }

    }

}
