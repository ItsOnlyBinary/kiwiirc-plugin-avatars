import * as avatarModule from '@dicebear/miniavs';

/* global kiwi:true */

kiwi.plugin('avatars-miniavs', (kiwi) => {
    Object.assign(kiwi.pluginAvatars.styles, {
        miniavs: {
            module: avatarModule,
            options: {},
        },
    });
});
