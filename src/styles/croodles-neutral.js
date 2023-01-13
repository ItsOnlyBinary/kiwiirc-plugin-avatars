import * as avatarModule from '@dicebear/croodles-neutral';

/* global kiwi:true */

kiwi.plugin('avatars-croodles-neutral', (kiwi) => {
    Object.assign(kiwi['plugin-avatars'].avatarStyles, {
        'croodles-neutral': {
            module: avatarModule,
            options: {},
        },
    });
});
