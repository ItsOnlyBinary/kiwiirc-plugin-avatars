import * as avatarModule from '@dicebear/big-ears';

/* global kiwi:true */

kiwi.plugin('avatars-big-ears', (kiwi) => {
    Object.assign(kiwi['plugin-avatars'].avatarStyles, {
        'big-ears': {
            module: avatarModule,
            options: {},
        },
    });
});
