
var childProcess = require( 'child_process' );
var tscChecker = childProcess.spawn( 
    'node' , 
    [ 'node_modules/typescript/bin/tsc' , '-w' ] , { stdio: 'inherit' } 
);
