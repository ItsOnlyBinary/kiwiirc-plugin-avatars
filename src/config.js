/* global kiwi:true */
/* global _:true */

// eslint-disable-next-line no-unused-vars
const basePath = getBasePath();
const configBase = 'plugin-avatars';

const defaultConfig = {
    avatar_style: 'initials',
};

export function setDefaults() {
    let walkConfig = (obj, _target) => {
        _.each(obj, (val, key) => {
            let target = [..._target, key];
            let targetName = target.join('.');
            if (typeof val === 'object' && !_.isArray(val)) {
                walkConfig(val, target);
            } else if (typeof getSetting(targetName) === 'undefined') {
                setSetting(targetName, val);
            }
        });
    };
    walkConfig(defaultConfig, []);
}

export function setting(name) {
    return kiwi.state.setting([configBase, name].join('.'));
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
