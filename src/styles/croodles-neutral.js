import * as avatarModule from '@dicebear/croodles-neutral';

/* global kiwi:true */

kiwi.plugin('avatars-croodles-neutral', (kiwi) => {
    Object.assign(kiwi.pluginAvatars.styles, {
        'croodles-neutral': {
            module: avatarModule,
            options: {},
        },
    });
});
