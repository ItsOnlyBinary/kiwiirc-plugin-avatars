/* global kiwi:true */

import { createAvatar } from '@dicebear/core';
import * as initials from '@dicebear/initials';

import CustomAvatar from './components/CustomAvatar.vue';
import * as config from './config.js';

const includedStyles = {
    initials: { module: initials, options: {} },
};

// eslint-disable-next-line no-undef
kiwi.plugin('avatars', () => {
    const pluginAvatars = kiwi.pluginAvatars = {
        loadingAvatars: 0,
        styles: includedStyles,
        addStyle: (name, module) => {
            const configStyles = config.getSetting('styles');
            const configStyle = configStyles.find((s) => s.name === name);
            const options = configStyle ? configStyle.options : {};
            pluginAvatars.styles[name] = {
                module,
                options,
            };
        },
        canStyle: (name) => {
            if (pluginAvatars.styles[name]) {
                return true;
            }

            const configStyles = config.getSetting('styles');
            return configStyles.some((s) => s.name === name);
        },
    };

    config.setDefaults(pluginAvatars);

    const startStyle = config.setting('style');
    if (!pluginAvatars.styles[startStyle]) {
        loadAvatar(startStyle, config.defaultConfig.style);
    }

    kiwi.replaceModule('components/Avatar', CustomAvatar);

    kiwi.state.$watch(
        () => config.setting('style'),
        (newStyle, oldStyle) => {
            if (!pluginAvatars.canStyle(newStyle)) {
                config.setting('style', oldStyle);
                return;
            }
            if (pluginAvatars.styles[newStyle]) {
                updateAllAvatars();
                return;
            }

            loadAvatar(newStyle, oldStyle);
        }
    );

    kiwi.on('irc.join', (event, net) => {
        kiwi.Vue.nextTick(() => {
            updateAvatar(net, event.nick, false);
        });
    });

    kiwi.on('irc.wholist', (event, net) => {
        const nicks = event.users.map((user) => user.nick);
        kiwi.Vue.nextTick(() => {
            nicks.forEach((nick) => {
                updateAvatar(net, nick, false);
            });
        });
    });

    kiwi.on('irc.nick', (event, net) => {
        kiwi.Vue.nextTick(() => {
            updateAvatar(net, event.new_nick, true);
        });
    });

    kiwi.on('irc.account', (event, net) => {
        kiwi.Vue.nextTick(() => {
            updateAvatar(net, event.nick, true);
        });
    });

    function loadAvatar(newStyle, oldStyle) {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = config.getSetting('path').replace('%style%', newStyle);
        script.onerror = () => {
            pluginAvatars.loadingAvatars--;
            document.body.removeChild(script);
            config.setting('style', oldStyle);
        };
        script.onload = () => {
            pluginAvatars.loadingAvatars--;
            if (!pluginAvatars.loadingAvatars) {
                updateAllAvatars();
            }
        };
        pluginAvatars.loadingAvatars++;
        document.body.appendChild(script);
    }

    function updateAvatar(net, nick, _force) {
        const force = !!_force;
        const user = kiwi.state.getUser(net.id, nick);
        if (!user) {
            return;
        }

        if (!force && user.avatar && user.avatar.small) {
            return;
        }

        const userStyleName = config.setting('style').toLowerCase();
        const styleName = Object.keys(pluginAvatars.styles).includes(userStyleName)
            ? userStyleName
            : Object.keys(pluginAvatars.styles)[0];
        const style = pluginAvatars.styles[styleName];

        const seed = (user.account || user.nick).toLowerCase();
        const options = {
            seed,
            scale: 90,
            backgroundColor: [],
        };

        if (style.options) {
            Object.assign(options, style.options);
        }

        createAvatar(style.module, options)
            .toDataUri()
            .then((avatar) => {
                user.avatar.small = avatar;
            });
    }

    function updateAllAvatars() {
        kiwi.state.networks.forEach((network) => {
            Object.values(network.users).forEach((user) => {
                if (user.avatar?.small.indexOf('data:image/svg+xml;') !== 0) {
                    return;
                }
                updateAvatar(network, user.nick, true);
            });
        });
    }
});
