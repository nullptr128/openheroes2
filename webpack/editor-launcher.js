
var webpack = require( 'webpack' );
var path = require( 'path' );

module.exports = {

    devtool: 'sourcemap' ,

    entry: {
        'launch-editor': [ './src/EditorLauncher.ts' ] ,
    } ,

    output: {
        path: __dirname + '/../bin/editor' ,
        filename: '[name].js' ,
    } ,

    resolve: {
        modules: [
            path.resolve( __dirname , '../node_modules' ) ,
            path.resolve( __dirname , '../src' ) ,
        ] ,
        extensions: [ '.js' , '.ts' ] ,
    } ,

    mode: 'development',

    module: {
        rules: [
            {
                test: /\.ts$/ ,
                exclude: /(node_modules|bower_modules)/ ,
                loaders: [ 'awesome-typescript-loader?configFileName=./tsconfig.json' ] ,
            } ,
            {
                test: /\.scss$/ ,
                loaders: [ 'style-loader' , 'css-loader?-url' , 'sass-loader' ] ,
            } ,
            {
                test: /\.html$/ ,
                loaders: [ 'text-loader' ] ,
            } ,
        ] ,
    } ,

    node: {
        __dirname: true ,
    } ,

    plugins: [] ,

    target: 'electron-main' ,

};
