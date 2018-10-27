
var webpack = require( 'webpack' );
var path = require( 'path' );

module.exports = {

    devtool: 'sourcemap' ,

    entry: {
        'editor': [ 'reflect-metadata' , './src/Editor/Editor.ts' ] ,
    } ,

    output: {
        // path: __dirname + '/../bin/editor/build' ,
        filename: '[name].js' ,
        publicPath: 'http://localhost:8080/' ,
    } ,

    resolve: {
        modules: [
            path.resolve( __dirname , '../node_modules' ) ,
            path.resolve( __dirname , '../src' ) ,
            path.resolve( __dirname , '../resource' ) ,
        ] ,
        extensions: [ '.js' , '.ts' , '.tsx' ] ,
    } ,

    devServer: {
        contentBase: './bin/editor' ,
        hot: true ,
    },

    mode: 'development',

    module: {
        rules: [
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
                loaders: [ 'style-loader' , 'css-loader' ] ,
            } ,
            {
                test: /\.html$/ ,
                loaders: [ 'text-loader' ] ,
            } ,
            {
            test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
            loader: "url-loader?limit=10000&mimetype=application/font-woff"
            }, {
            test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
            loader: "url-loader?limit=10000&mimetype=application/font-woff"
            }, {
            test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
            loader: "url-loader?limit=10000&mimetype=application/octet-stream"
            }, {
            test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
            loader: "file-loader"
            }, {
            test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
            loader: "url-loader?limit=10000&mimetype=image/svg+xml"
            }
        ] ,
    } ,

    plugins: [
    ] ,

    target: 'electron-renderer' ,

};
