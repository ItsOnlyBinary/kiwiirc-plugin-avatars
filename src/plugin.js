/* global kiwi:true */

import { createAvatar } from '@dicebear/core';

// eslint-disable-next-line import/no-extraneous-dependencies
import * as initials from '@dicebear/initials';

import * as config from './config.js';

const includedStyles = {
    initials: { module: initials, options: {} },
};

kiwi.plugin('avatars', () => {
    config.setDefaults();

    const Logger = kiwi.require('libs/Logger');
    const log = Logger.namespace('plugin-avatars');

    const dataURL = 'data:image/svg+xml;plugin-avatars;';
    const plugin = (kiwi.pluginAvatars = {
        loadingAvatars: 0,
        updateTimeouts: Object.create(null),
        styles: includedStyles,
        addStyle: (name, module) => {
            const configStyles = config.getSetting('styles');
            const configStyle = configStyles.find((s) => s.name === name);
            const options = configStyle ? configStyle.options : {};

            const configOptions = config.getSetting('stylesOptions.' + name);
            if (configOptions) {
                Object.assign(options, configOptions);
            }

            plugin.styles[name] = {
                module,
                options,
            };
        },
        hasStyle: (name) => !!plugin.styles[name],
        canStyle: (name) => {
            if (plugin.hasStyle(name)) {
                return true;
            }

            const configStyles = config.getSetting('styles');
            return configStyles.some((s) => s.name === name);
        },
    });

    const startStyle = config.setting('style');
    if (!plugin.hasStyle(startStyle)) {
        if (config.getSetting('autoLoad') && plugin.canStyle(startStyle)) {
            loadAvatar(startStyle, config.defaultConfig.style);
        } else {
            config.setting('style', config.defaultConfig.style);
        }
    }

    kiwi.state.$watch(
        () => config.setting('style'),
        (newStyle, oldStyle) => {
            const notAllowed = !config.getSetting('autoLoad') && !plugin.hasStyle(newStyle);
            if (notAllowed || !plugin.canStyle(newStyle)) {
                config.setting('style', oldStyle);
                return;
            }

            if (plugin.hasStyle(newStyle)) {
                updateAllAvatars();
                return;
            }

            loadAvatar(newStyle, oldStyle);
        }
    );

    kiwi.on('irc.wholist', (event, network) => {
        kiwi.Vue.nextTick(() => {
            event.users.forEach((whoUser) => {
                const user = kiwi.state.getUser(network.id, whoUser.nick);
                if (user && user.avatarCache) {
                    // Only process users that have already used their avatar
                    // Other users will be handled by the user.avatar.create event
                    updateAvatar(user);
                }
            });
        });
    });

    kiwi.on('irc.nick', (event, network) => {
        kiwi.Vue.nextTick(() => {
            const user = kiwi.state.getUser(network.id, event.nick);
            if (user) {
                updateAvatar(user, true);
            }
        });
    });

    kiwi.on('irc.account', (event, network) => {
        kiwi.Vue.nextTick(() => {
            const user = kiwi.state.getUser(network.id, event.nick);
            if (user) {
                updateAvatar(user, true);
            }
        });
    });

    kiwi.on('user.avatar.create', (event) => {
        updateAvatar(event.user);
    });

    kiwi.on('user.avatar.failed', (event) => {
        if (event.failed.startsWith(dataURL)) {
            // Somehow we failed, don't get into a loop
            return;
        }
        updateAvatar(event.user);
    });

    function loadAvatar(newStyle, oldStyle) {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = config.getSetting('path').replace('%style%', newStyle);
        script.onerror = (err) => {
            plugin.loadingAvatars--;
            document.body.removeChild(script);
            config.setting('style', oldStyle);
            log.error('Failed to load avatar.', err.message, `[style="${newStyle}"]`);
        };
        script.onload = () => {
            plugin.loadingAvatars--;
            if (!plugin.loadingAvatars) {
                updateAllAvatars();
            }
        };
        plugin.loadingAvatars++;
        document.body.appendChild(script);
    }

    function updateAvatar(user, force = false) {
        const avatar = user.avatar;
        if (!force && (avatar.small || avatar.large)) {
            // Avatar already set
            return;
        }

        if (!shouldSetAvatar(avatar, force)) {
            // Not forced or not our avatar to overwrite
            return;
        }

        const userStyleName = config.setting('style').toLowerCase();
        const styleName = Object.hasOwnProperty.call(plugin.styles, userStyleName)
            ? userStyleName
            : Object.keys(plugin.styles)[0];

        const seed = (user.account || user.nick).toLowerCase();
        const options = {
            seed,
            scale: 90,
            backgroundColor: [],
        };

        const style = plugin.styles[styleName];
        if (style.options) {
            Object.assign(options, style.options);
        }

        createAvatar(style.module, options)
            .toDataUri()
            .then((newAvatar) => {
                if (!shouldSetAvatar(user.avatar, force)) {
                    return;
                }
                Object.assign(user.avatar, {
                    small: newAvatar.replace(/^data:image\/svg\+xml;/, dataURL),
                    large: '',
                });
            })
            .catch((err) => {
                log.error('Failed to generate avatar:', err.message, `[nick="${user.nick}"]`);
            });
    }

    function shouldSetAvatar(avatar, force) {
        if (avatar.large) {
            return false;
        }

        if (!avatar.small) {
            return true;
        }

        return avatar.small.startsWith(dataURL) && force;
    }

    function updateAllAvatars() {
        Object.keys(plugin.updateTimeouts).forEach((networkid) => {
            clearTimeout(plugin.updateTimeouts[networkid]);
            delete plugin.updateTimeouts[networkid];
        });

        kiwi.state.networks.forEach((network) => {
            const currentUser = network.currentUser();
            const users = Object.values(network.users).filter(
                (u) => u !== currentUser && u.avatarCache && shouldSetAvatar(u.avatar, true)
            );

            // make sure our users is in the first batch
            if (currentUser) {
                users.unshift(currentUser);
            }
            plugin.updateTimeouts[network.id] = setTimeout(() => processUpdateAvatars(network, users), 0);
        });
    }

    function processUpdateAvatars(network, users) {
        const someUsers = users.splice(0, 50);

        someUsers.forEach((user) => updateAvatar(user, true));

        if (users.length) {
            plugin.updateTimeouts[network.id] = setTimeout(() => processUpdateAvatars(network, users), 0);
        } else {
            delete plugin.updateTimeouts[network.id];
        }
    }
});
