import * as avatarModule from '@dicebear/lorelei-neutral';

/* global kiwi:true */

kiwi.plugin('avatars-lorelei-neutral', (kiwi) => {
    Object.assign(kiwi['plugin-avatars'].avatarStyles, {
        'lorelei-neutral': {
            module: avatarModule,
            options: {},
        },
    });
});
