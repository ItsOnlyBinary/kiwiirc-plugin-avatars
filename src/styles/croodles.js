import * as avatarModule from '@dicebear/croodles';

/* global kiwi:true */

kiwi.plugin('avatars-croodles', (kiwi) => {
    Object.assign(kiwi['plugin-avatars'].avatarStyles, {
        croodles: {
            module: avatarModule,
            options: {},
        },
    });
});
