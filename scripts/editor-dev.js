
var childProcess = require( 'child_process' );
var os = require( 'os' );
var path = process.cwd();

var WINDOWS = (os.platform() === 'win32');

const webpackPath = path + '/node_modules/.bin/webpack' + (WINDOWS ? '.cmd' : '');
const webpackDevServerPath = path + '/node_modules/.bin/webpack-dev-server' + (WINDOWS ? '.cmd' : '');
const electronPath = path + '/node_modules/.bin/electron' + (WINDOWS ? '.cmd' : '');

const webpackLauncher = childProcess.spawn( webpackPath , [ '--config' , './webpack/editor-launcher.ts' ] , { stdio: 'inherit' } );
webpackLauncher.on( 'close' , () => {

    childProcess.spawn( webpackDevServerPath , [ '--hot' , '--inline' , '--config' , './webpack/editor.dev.ts' ] , { stdio: 'inherit', shell: true } );

    setTimeout( () => {
        const electron = childProcess.spawn( electronPath , [ './bin/editor/launch-editor.js' , '--dev' , '--js-flags="--trace-ic"' ] , { 
            stdio: 'inherit',
        } );
    } , 3*1000 );

} );
