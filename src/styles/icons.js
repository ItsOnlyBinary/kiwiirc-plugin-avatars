import * as avatarModule from '@dicebear/icons';

/* global kiwi:true */

kiwi.plugin('avatars-icons', (kiwi) => {
    Object.assign(kiwi['plugin-avatars'].avatarStyles, {
        icons: {
            module: avatarModule,
            options: {},
        },
    });
});
