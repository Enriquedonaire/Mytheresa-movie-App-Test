import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
    entry: './server.js',
    target: 'node',
    output: {
        path: path.resolve(__dirname, 'dist/server'),
        filename: 'server.cjs',
        libraryTarget: 'commonjs2',
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
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx', '.mjs'],
    },
};
