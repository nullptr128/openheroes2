
import * as Webpack from 'webpack';
import * as Path from 'path';

const config: Webpack.Configuration = {

    devtool: 'source-map' ,

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
            Path.resolve( __dirname , '../node_modules' ) ,
            Path.resolve( __dirname , '../src' ) ,
            Path.resolve( __dirname , '../resource' ) ,
        ] ,
        extensions: [ '.js' , '.ts' , '.tsx' ] ,
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

export default config;
