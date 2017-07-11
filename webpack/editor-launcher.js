
var webpack = require( 'webpack' );

module.exports = {

    devtool: 'sourcemap' ,

    entry: {
        'editor': [ './src/Editor/Application.ts' ] ,
    } ,

    output: {
        path: __dirname + '/../bin' ,
        filename: '[name].js' ,
    } ,

    resolve: {
        modules: [
            'node_modules' ,
            'src' ,
        ] ,
        extensions: [ '.js' , '.ts' ] ,
    } ,

    module: {
        loaders: [
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

    target: 'electron' ,

};
