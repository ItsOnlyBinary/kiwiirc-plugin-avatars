const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const TerserPlugin = require('terser-webpack-plugin');
const makeSourceMap = process.argv.indexOf('--srcmap') > -1;

module.exports = {
    mode: 'production',
    entry: {
        'avatars': './src/plugin.js',
        'avatars-adventurer': './src/styles/adventurer.js',
        'avatars-adventurer-neutral': './src/styles/adventurer-neutral.js',
        'avatars-avataaars': './src/styles/avataaars.js',
        'avatars-avataaars-neutral': './src/styles/avataaars-neutral.js',
        'avatars-big-ears': './src/styles/big-ears.js',
        'avatars-big-ears-neutral': './src/styles/big-ears-neutral.js',
        'avatars-big-smile': './src/styles/big-smile.js',
        'avatars-bottts': './src/styles/bottts.js',
        'avatars-bottts-neutral': './src/styles/bottts-neutral.js',
        'avatars-croodles': './src/styles/croodles.js',
        'avatars-croodles-neutral': './src/styles/croodles-neutral.js',
        'avatars-fun-emoji': './src/styles/fun-emoji.js',
        'avatars-icons': './src/styles/icons.js',
        'avatars-identicon': './src/styles/identicon.js',
        'avatars-lorelei': './src/styles/lorelei.js',
        'avatars-lorelei-neutral': './src/styles/lorelei-neutral.js',
        'avatars-micah': './src/styles/micah.js',
        'avatars-miniavs': './src/styles/miniavs.js',
        'avatars-notionists': './src/styles/notionists.js',
        'avatars-notionists-neutral': './src/styles/notionists-neutral.js',
        'avatars-open-peeps': './src/styles/open-peeps.js',
        'avatars-personas': './src/styles/personas.js',
        'avatars-pixel-art': './src/styles/pixel-art.js',
        'avatars-pixel-art-neutral': './src/styles/pixel-art-neutral.js',
        'avatars-rings': './src/styles/rings.js',
        'avatars-shapes': './src/styles/shapes.js',
        'avatars-thumbs': './src/styles/thumbs.js',
    },
    output: {
        filename: 'plugin-[name].js',
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.js$/,
                use: [{ loader: 'babel-loader' }],
                include: [
                    path.join(__dirname, 'src'),
                ]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.less$/,
                use: ['vue-style-loader', 'css-loader', 'less-loader']
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
    ],
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    },
    optimization: {
        minimizer: [new TerserPlugin({
            extractComments: false,
        })],
    },
    devtool: makeSourceMap ? 'source-map' : undefined,
    devServer: {
        static: path.join(__dirname, "dist"),
        compress: true,
        port: 9000,
        headers: {
            "Access-Control-Allow-Origin": "*"
        }
    }
};
