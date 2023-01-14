import { createAvatar } from '@dicebear/core';
import * as initials from '@dicebear/initials';

import CustomAvatar from './components/CustomAvatar.vue';
import * as config from './config.js';

const avatarStyles = {
    initials: { module: initials, options: {} },
};

// eslint-disable-next-line no-undef
kiwi.plugin('avatars', (kiwi) => {
    config.setDefaults();

    kiwi['plugin-avatars'] = {
        avatarStyles,
    };

    kiwi.replaceModule('components/Avatar', CustomAvatar);

    kiwi.state.$watch(() => config.setting('avatar_style'), () => {
        kiwi.state.networks.forEach((network) => {
            Object.values(network.users).forEach((user) => {
                if (user.avatar?.small.indexOf('data:image/svg+xml;') !== 0) {
                    return;
                }
                updateAvatar(network, user.nick, true);
            });
        });
    });

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

    function updateAvatar(net, nick, _force) {
        const force = !!_force;
        const user = kiwi.state.getUser(net.id, nick);
        if (!user) {
            return;
        }

        if (!force && user.avatar && user.avatar.small) {
            return;
        }

        const userStyleName = config.setting('avatar_style').toLowerCase();
        const styleName = Object.keys(avatarStyles).includes(userStyleName)
            ? userStyleName
            : Object.keys(avatarStyles)[0];
        const style = avatarStyles[styleName];

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
});
