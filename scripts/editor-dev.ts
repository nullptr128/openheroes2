
import * as ChildProcess from 'child_process';
import * as OS from 'os';

const path: string = process.cwd();

const IS_WINDOWS = (OS.platform() === 'win32');

const webpackPath = path + '/node_modules/.bin/webpack' + (IS_WINDOWS ? '.cmd' : '');
const webpackDevServerPath = path + '/node_modules/.bin/webpack-dev-server' + (IS_WINDOWS ? '.cmd' : '');
const electronPath = path + '/node_modules/.bin/electron' + (IS_WINDOWS ? '.cmd' : '');

const webpackLauncher = ChildProcess.spawn( webpackPath , [ '--config' , './webpack/editor-launcher.ts' ] , { stdio: 'inherit' } );
webpackLauncher.on( 'close' , () => {

    ChildProcess.spawn( webpackDevServerPath , [ '--hot' , '--inline' , '--config' , './webpack/editor.dev.ts' ] , { stdio: 'inherit', shell: true } );

    setTimeout( () => {
        ChildProcess.spawn( electronPath , [ './bin/editor/launch-editor.js' , '--dev' , '--js-flags="--trace-ic"' ] , { 
            stdio: 'inherit',
        } );
    } , 3*1000 );

} );
