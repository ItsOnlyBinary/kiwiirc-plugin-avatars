/* global kiwi:true */

import { watch } from 'vue';
import { createAvatar } from '@dicebear/core';
import * as initials from '@dicebear/initials';

import CustomAvatar from './components/CustomAvatar.vue';
import * as config from './config.js';

const includedStyles = {
    initials: { module: initials, options: {} },
};

kiwi.plugin('avatars', () => {
    const plugin = kiwi.pluginAvatars = {
        loadingAvatars: 0,
        updateTimeouts: Object.create(null),
        styles: includedStyles,
        addStyle: (name, module) => {
            const configStyles = config.getSetting('styles');
            const configStyle = configStyles.find((s) => s.name === name);
            const options = configStyle ? configStyle.options : {};
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
    };

    config.setDefaults();

    const startStyle = config.setting('style');
    if (!plugin.hasStyle(startStyle)) {
        if (config.getSetting('autoLoad') && plugin.canStyle(startStyle)) {
            loadAvatar(startStyle, config.defaultConfig.style);
        } else {
            config.setting('style', config.defaultConfig.style);
        }
    }

    kiwi.replaceModule('components/Avatar', CustomAvatar);

    watch(
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
            plugin.loadingAvatars--;
            document.body.removeChild(script);
            config.setting('style', oldStyle);
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
        const styleName = Object.keys(plugin.styles).includes(userStyleName)
            ? userStyleName
            : Object.keys(plugin.styles)[0];
        const style = plugin.styles[styleName];

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
        Object.keys(plugin.updateTimeouts).forEach((networkid) => {
            clearTimeout(plugin.updateTimeouts[networkid]);
            delete plugin.updateTimeouts[networkid];
        });

        kiwi.state.networks.forEach((network) => {
            const currentUser = network.currentUser();
            const users = Object.values(network.users)
                .filter((u) => u !== currentUser && u.avatar?.small.indexOf('data:image/svg+xml;') === 0);

            // make sure our users is in the first batch
            users.unshift(currentUser);
            plugin.updateTimeouts[network.id] = setTimeout(
                () => processUpdateAvatars(network, users),
                0
            );
        });
    }

    function processUpdateAvatars(network, users) {
        const someUsers = users.splice(0, 50);

        someUsers.forEach((user) => updateAvatar(network, user.nick, true));

        if (users.length) {
            plugin.updateTimeouts[network.id] = setTimeout(
                () => processUpdateAvatars(network, users),
                0
            );
        } else {
            delete plugin.updateTimeouts[network.id];
        }
    }
});
