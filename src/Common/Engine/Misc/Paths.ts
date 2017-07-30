/**
 * OpenHeroes2
 * 
 * This helper returns paths to various directories.
 */

import Injectable from '../../IOC/Injectable';
import * as Process from 'process';

@Injectable()
export default class Paths {

    /**
     * Returns path to data directory.
     */
    public getDataDir(): string {
        return Process.cwd() + '/data';
    }

    /**
     * Returns path to resource directory.
     */
    public getResourceDir(): string {
        return Process.cwd() + '/resource';
    }

    /**
     * Returns path to locale directory.
     */
    public getLocaleDir(): string {
        return this.getDataDir() + '/lang';
    }

    /**
     * Returns path to static images directory.
     */
    public getImageDir(): string {
        return this.getResourceDir() + '/img';
    }

}
