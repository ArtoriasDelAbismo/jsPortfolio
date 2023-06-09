const { dirname } = require('path');//?
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin'); //este plugin lo necesitamos en caso de tener que copiar un archivo desde nuestro proyecto source a nuestro build de dist
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
//const Dotenv = require('dotenv-webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); 

module.exports = {
    entry: './src/index.js', //nuestro punto de entrada, no es necesario aclararlo, por defecto es siempre el archivo index.js
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js', //optimizamos y agregamos el hash para que el browser obtenga los cambios que se realicen en cada build
        assetModuleFilename: 'assets/images/[hash][ext][query]'//pasamos las imagenes que copiamos con el CopyPlugin a la carpeta assets
    },
    resolve: {
        extensions: ['.js'],
        alias: {
            '@utils': path.resolve(__dirname, 'src/utils/'),
            '@templates': path.resolve(__dirname, 'src/templates/'),
            '@styles': path.resolve(__dirname, 'src/styles/'),
            '@images': path.resolve(__dirname, 'src/assets/images'),
        }
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            
            },
            {
                test: /\.css|.styl$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'stylus-loader'
                ]
            },
            {
                test: /\.png/,
                type: 'asset/resource'
            }
        
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: './public/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'assets/[name].[contenthash].css'//optimizamos css para que el browser reconozca los cambios que realizamos gracias al hash
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "src", "assets/images"),
                    to: "assets/images"
                }
            ]
        }),
        //new Dotenv(),
        new CleanWebpackPlugin(),
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin(),
        ]
    }
}