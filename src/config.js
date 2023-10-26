/* global kiwi:true */
const configStyles = require('./config-styles.json');

const basePath = getBasePath();
const configBase = 'plugin-avatars';

export const defaultConfig = {
    path: basePath + 'plugin-avatars/%style%.js',
    style: 'initials',
    styles: configStyles,
};

export function setDefaults(pluginAvatars) {
    const oldStyle = getSetting('avatar_style');
    if (oldStyle) {
        // eslint-disable-next-line quotes, no-console
        console.warn(`[Deprecated] config option 'plugin-avatars.avatar_style' changed to 'plugin-avatars.style'. Please update your config.json`);
        setSetting('style', oldStyle);
    }

    kiwi.setConfigDefaults(configBase, defaultConfig);

    if (!pluginAvatars.canStyle(setting('style'))) {
        setting('style', defaultConfig.style);
    }
}

export function setting(name, value) {
    return kiwi.state.setting([configBase, name].join('.'), value);
}

export function getSetting(name) {
    return kiwi.state.getSetting(['settings', configBase, name].join('.'));
}

export function setSetting(name, value) {
    return kiwi.state.setSetting(['settings', configBase, name].join('.'), value);
}

function getBasePath() {
    const scripts = document.getElementsByTagName('script');
    const scriptPath = scripts[scripts.length - 1].src;
    return scriptPath.substr(0, scriptPath.lastIndexOf('/') + 1);
}
