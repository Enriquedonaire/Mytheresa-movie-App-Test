import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import webpack from 'webpack';
import dotenv from 'dotenv';

dotenv.config();

export default {
    entry: './src/index.js',
    output: {
        path: path.resolve('dist/client'),
        filename: 'bundle.js',
        publicPath: '/Mytheresa-movie-App-Test/',
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
        new webpack.DefinePlugin({
            'process.env.REACT_APP_TMDB_API_KEY': JSON.stringify(process.env.REACT_APP_TMDB_API_KEY),
        }),
    ],
    devServer: {
        static: './dist/client',
        port: 4000,
        historyApiFallback: true,
        open: true,
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
};
