/**
 * OpenHeroes2
 * 
 * This helper returns paths to various directories.
 */

import Injectable from '../../IOC/Injectable';
import * as Process from 'process';

@Injectable()
export default class Paths {

    public getDataDir(): string {
        return Process.cwd() + '/data';
    }

    public getResourceDir(): string {
        return Process.cwd() + '/resource';
    }

    public getLocaleDir(): string {
        return this.getDataDir() + '/lang';
    }

    public getImageDir(): string {
        return this.getResourceDir() + '/img';
    }

}
