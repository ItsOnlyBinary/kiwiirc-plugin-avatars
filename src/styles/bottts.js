import * as avatarModule from '@dicebear/bottts';

/* global kiwi:true */

kiwi.plugin('avatars-bottts', (kiwi) => {
    Object.assign(kiwi.pluginAvatars.styles, {
        bottts: {
            module: avatarModule,
            options: {},
        },
    });
});
