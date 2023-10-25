import * as avatarModule from '@dicebear/big-ears-neutral';

/* global kiwi:true */

kiwi.plugin('avatars-big-ears-neutral', (kiwi) => {
    Object.assign(kiwi.pluginAvatars.styles, {
        'big-ears-neutral': {
            module: avatarModule,
            options: {},
        },
    });
});
