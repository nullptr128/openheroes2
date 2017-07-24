
//var childProcess = require( 'child_process' );
//var devServer = childProcess.spawn( 'node' , [ 'node_modules/webpack-dev-server/bin/webpack-dev-server.js' , '--hot' , '--inline' , '--config' , './webpack/editor.dev.js' ] , { stdio: 'inherit' } );

var childProcess = require( 'child_process' );

var webpackLauncher = childProcess.spawn( 'node' , [ 'node_modules/webpack/bin/webpack.js' , '--config' , './webpack/editor-launcher.js' ] , { stdio: 'inherit' } );
webpackLauncher.on( 'close' , () => {

    var devServer = childProcess.spawn( 'node' , [ 'node_modules/webpack-dev-server/bin/webpack-dev-server.js' , '--hot' , '--inline' , '--config' , './webpack/editor.dev.js' ] , { stdio: 'inherit' } );
    //devServer.stdout.on( 'data' , data => console.log( data.toString() ) );

    setTimeout( () => {
        var electron = childProcess.spawn( './node_modules/electron/dist/electron' , [ './bin/editor/launch-editor.js' , '--dev' ] , { stdio: 'inherit' } );
        //electron.stdout.on( 'data' , data => console.log( data.toString() ) );
    } , 3*1000 );

} );
