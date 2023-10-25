import * as avatarModule from '@dicebear/big-ears';

/* global kiwi:true */

kiwi.plugin('avatars-big-ears', (kiwi) => {
    Object.assign(kiwi.pluginAvatars.styles, {
        'big-ears': {
            module: avatarModule,
            options: {},
        },
    });
});
