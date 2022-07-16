const path = require('path');

const distFolder = 'dist/';

module.exports = {
    mode: 'development',
    entry: ['./src/typescript/App.ts'],
    module: {
        rules: [{
            test: /\.ts$/,
            use: [
                'ts-loader',
            ]
        }],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    output: {
        filename: 'App.min.js',
        path: path.resolve(__dirname, distFolder),
    }
};