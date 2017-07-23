
var childProcess = require( 'child_process' );

var webpackLauncher = childProcess.spawn( 'webpack' , [ '--config' , './webpack/editor-launcher.js' ] , { stdio: 'inherit' } );
webpackLauncher.on( 'close' , () => {

    var devServer = childProcess.spawn( 'webpack-dev-server' , [ '--hot' , '--inline' , '--config' , './webpack/editor.dev.js' ] , { stdio: 'inherit' } );
    //devServer.stdout.on( 'data' , data => console.log( data.toString() ) );

    setTimeout( () => {
        var electron = childProcess.spawn( 'electron' , [ './bin/editor/launch-editor.js' , '--dev' ] , { stdio: 'inherit' } );
        //electron.stdout.on( 'data' , data => console.log( data.toString() ) );
    } , 3*1000 );

} );