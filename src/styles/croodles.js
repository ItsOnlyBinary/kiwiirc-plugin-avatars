import * as avatarModule from '@dicebear/croodles';

/* global kiwi:true */

kiwi.plugin('avatars-croodles', (kiwi) => {
    Object.assign(kiwi.pluginAvatars.styles, {
        croodles: {
            module: avatarModule,
            options: {},
        },
    });
});
