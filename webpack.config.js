const fs = require('fs');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { rimrafSync } = require('rimraf');

const dicebearCollection = import('@dicebear/collection');

const utils = require('./build/utils');

const devConfig = require('./build/configs/dev');
const prodConfig = require('./build/configs/prod');

module.exports = async (env, argv) => {
    const isDev = env.WEBPACK_SERVE;
    let config = {
        mode: isDev ? 'development' : 'production',
    };

    if (argv.mode) {
        config.mode = argv.mode;
    }

    if (argv.stats) {
        config.plugins = [
            new BundleAnalyzerPlugin(),
        ];
    }

    config.entry = await GenerateStyles();

    if (isDev) {
        config = devConfig(env, argv, config);
    } else {
        config = prodConfig(env, argv, config);
    }

    return config;
};

async function GenerateStyles() {
    const styles = Object.keys(await dicebearCollection)
        .map((s) => s.replace(/[A-Z]/g, (n) => '-' + n.toLowerCase()))
        .filter((s) => s !== 'initials');

    const entry = {
        avatars: './src/plugin.js',
    };

    // Read and parse styles json file
    const configStylesText = fs.readFileSync(utils.pathResolve('./src/config-styles.json'), 'utf-8');
    let configStyles = JSON.parse(configStylesText);

    // Add the built in style to json if it does not exist
    const hasInitials = configStyles.some((style) => style.name === 'initials');
    if (!hasInitials) {
        configStyles.push({ name: 'initials', options: {} });
    }

    // Cleanup styles directory
    const stylesPath = utils.pathResolve('./src/styles/');
    const fileTest = /[/\\]styles[/\\][\w-]+\.js$/;
    rimrafSync(stylesPath, {
        filter: (file) => fileTest.test(file),
    });

    // Read template file
    const templateContent = fs.readFileSync(utils.pathResolve('build/style-template.js'), 'utf-8');

    const promises = [];
    styles.forEach((style) => {
        const styleFile = `./src/styles/${style}.js`;
        const styleContent = templateContent.replace(/%stylename%/g, style);

        // Write the styles javascript file
        promises.push(
            fs.promises.writeFile(
                utils.pathResolve(styleFile),
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
        if (!hasStyle) {
            configStyles.push({ name: style, options: {} });
        }
    });

    // Add the built in style so it is not cleaned from config
    styles.push('initials');

    // Clean styles json file
    configStyles = configStyles
        .filter((s) => styles.includes(s.name))
        .sort((a, b) => a.name.localeCompare(b.name));

    // Write styles json file
    promises.push(
        fs.promises.writeFile(
            utils.pathResolve('./src/config-styles.json'),
            '[\n    ' + configStyles.map(JSON.stringify).join(',\n    ') + '\n]\n',
            'utf-8',
        ),
    );

    // Wait for all above file writes to complete
    await Promise.all(promises);

    return entry;
}
