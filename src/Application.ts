//
//
//
/**
 * OpenHeroes2
 * 
 * This is entry point for electron app.
 */

import * as Electron from 'electron';
import Nullable from './Common/Support/Nullable';

//
let mainWindow: Nullable<Electron.BrowserWindow> = null;

// 
function createWindow(): void {

    //
    mainWindow = new Electron.BrowserWindow( { width: 640 , height: 480 } );
    mainWindow.maximize();

    //
    const path: string = process.cwd();
    mainWindow.loadURL( `file://${path}/bin/editor.html` );

    //
    mainWindow.on( 'closed' , () => {
        mainWindow = null;
    } );

}

Electron.app.on( 'ready' , createWindow );

Electron.app.on( 'window-all-closed' , () => {
    Electron.app.quit();
} );

Electron.app.on( 'activate' , () => {
    if ( !mainWindow ) {
        createWindow();
    }
} );
