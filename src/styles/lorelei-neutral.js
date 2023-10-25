import * as avatarModule from '@dicebear/lorelei-neutral';

/* global kiwi:true */

kiwi.plugin('avatars-lorelei-neutral', (kiwi) => {
    Object.assign(kiwi.pluginAvatars.styles, {
        'lorelei-neutral': {
            module: avatarModule,
            options: {},
        },
    });
});
