import * as avatarModule from '@dicebear/big-smile';

/* global kiwi:true */

kiwi.plugin('avatars-big-smile', (kiwi) => {
    Object.assign(kiwi.pluginAvatars.styles, {
        'big-smile': {
            module: avatarModule,
            options: {},
        },
    });
});
