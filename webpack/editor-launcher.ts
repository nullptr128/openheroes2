
import * as Webpack from 'webpack';
import * as Path from 'path';

const config: Webpack.Configuration = {

    devtool: 'source-map' ,

    entry: {
        'launch-editor': [ './src/EditorLauncher.ts' ] ,
    } ,

    output: {
        path: __dirname + '/../bin/editor' ,
        filename: '[name].js' ,
    } ,

    resolve: {
        modules: [
            Path.resolve( __dirname , '../node_modules' ) ,
            Path.resolve( __dirname , '../src' ) ,
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

export default config;
