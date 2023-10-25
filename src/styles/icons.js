import * as avatarModule from '@dicebear/icons';

/* global kiwi:true */

kiwi.plugin('avatars-icons', (kiwi) => {
    Object.assign(kiwi.pluginAvatars.styles, {
        icons: {
            module: avatarModule,
            options: {},
        },
    });
});
