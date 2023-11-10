const fs = require('fs');
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const TerserPlugin = require('terser-webpack-plugin');
const { rimrafSync } = require('rimraf');

const dicebearCollection = import('@dicebear/collection');

const makeSourceMap = process.argv.indexOf('--srcmap') > -1;

module.exports = (async (env, argv) => {
    const entryPoints = await GenerateStyles();

    return {
        mode: 'production',
        entry: entryPoints,
        output: {
            filename: 'plugin-[name].js',
            clean: true,
        },
        externals: {
            'vue': 'kiwi.Vue',
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
})();

async function GenerateStyles() {
    const styles = Object.keys(await dicebearCollection)
        .map((s) => s.replace(/[A-Z]/g, (n) => '-' + n.toLowerCase()))
        .filter((s) => s !== 'initials');

    const entry = {
        'avatars': './src/plugin.js',
    };

    // Read and parse styles json file
    const configStylesText = fs.readFileSync(path.join(__dirname, './src/config-styles.json'), 'utf-8');
    let configStyles = JSON.parse(configStylesText);

    // Add the built in style to json if it does not exist
    const hasInitials = configStyles.some((style) => style.name === 'initials');
    if (!hasInitials){
        configStyles.push({ name: 'initials', options: {} });
    }

    // Cleanup styles directory
    const stylesPath = path.resolve(__dirname, './src/styles/');
    const fileTest = /[/\\]styles[/\\][\w-]+\.js$/
    rimrafSync(stylesPath, {
        filter: (file) => fileTest.test(file),
    });

    // Read template file
    const templateContent = fs.readFileSync(path.join(__dirname, './build/style-template.js'), 'utf-8');

    const promises = [];
    styles.forEach((style) => {
        const styleFile = `./src/styles/${style}.js`;
        const styleContent = templateContent.replace(/%stylename%/g, style);

        // Write the styles javascript file
        promises.push(
            fs.promises.writeFile(
                path.join(__dirname, styleFile),
                styleContent,
                'utf-8',
            ),
        );

        // Add an entry point for the style
        entry['avatars-' + style] = {
            import: styleFile,
            filename: 'plugin-avatars/' + style + '.js',
        };

        // Add the style to json if it does not exist
        const hasStyle = configStyles.some((s) => s.name === style);
        if (!hasStyle){
            configStyles.push({ name: style, options: {} });
        }
    });

    // Add the built in style so it is not cleaned from config
    styles.push('initials');

    // Clean styles json file
    configStyles = configStyles
        .filter((s) => styles.includes(s.name))
        .sort((a, b) => a.name.localeCompare(b.name));;

    // Write styles json file
    promises.push(
        fs.promises.writeFile(
            path.join(__dirname, './src/config-styles.json'),
            '[\n    ' + configStyles.map(JSON.stringify).join(',\n    ') + '\n]\n',
            'utf-8',
        ),
    );

    // Wait for all above file writes to complete
    await Promise.all(promises);

    return entry;
}
