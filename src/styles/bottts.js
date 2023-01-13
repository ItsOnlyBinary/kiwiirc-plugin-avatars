import * as avatarModule from '@dicebear/bottts';

/* global kiwi:true */

kiwi.plugin('avatars-bottts', (kiwi) => {
    Object.assign(kiwi['plugin-avatars'].avatarStyles, {
        bottts: {
            module: avatarModule,
            options: {},
        },
    });
});
