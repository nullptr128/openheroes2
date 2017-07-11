
import * as Glob from 'glob';

const ignored: string[] = [
    'src/Application.ts'
];

function filterIgnored( file: string ) {
    return ignored.find( ignoredFile => file.indexOf(ignoredFile) === -1 );
}

const files: string[] = Glob.sync( './src/**/*.ts' ).filter( filterIgnored );
files.forEach( f => require( '../' + f ) );
