import * as avatarModule from '@dicebear/identicon';

/* global kiwi:true */

kiwi.plugin('avatars-identicon', (kiwi) => {
    Object.assign(kiwi['plugin-avatars'].avatarStyles, {
        identicon: {
            module: avatarModule,
            options: {},
        },
    });
});
