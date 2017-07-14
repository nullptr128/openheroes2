
var webpack = require( 'webpack' );
var path = require( 'path' );

module.exports = {

    devtool: 'sourcemap' ,

    entry: {
        'editor': [ 'reflect-metadata' , './src/Editor/Editor.ts' ] ,
    } ,

    output: {
        path: __dirname + '/../bin' ,
        filename: 'build/[name].js' ,
    } ,

    resolve: {
        modules: [
            path.resolve( __dirname , '../node_modules' ) ,
            path.resolve( __dirname , '../src' ) ,
            path.resolve( __dirname , '../style' ) ,
        ] ,
        extensions: [ '.js' , '.ts' , '.tsx' ] ,
    } ,

    module: {
        loaders: [
            {
                test: /\.ts$/ ,
                exclude: /(node_modules|bower_modules)/ ,
                loaders: [ 'awesome-typescript-loader?configFileName=./tsconfig.json' ] ,
            } ,
            {
                test: /\.tsx$/ ,
                exclude: /(node_modules|bower_modules)/ ,
                loaders: [ 'awesome-typescript-loader?configFileName=./tsconfig.json' ] ,
            } ,
            {
                test: /\.scss$/ ,
                loaders: [ 'style-loader' , 'css-loader?-url' , 'sass-loader' ] ,
            } ,
            {
                test: /\.css$/ ,
                loaders: [ 'style-loader' , 'css-loader?-url' ] ,
            } ,
            {
                test: /\.html$/ ,
                loaders: [ 'text-loader' ] ,
            } ,
        ] ,
    } ,

    plugins: [] ,

    target: 'electron-renderer' ,

};
