import * as avatarModule from '@dicebear/miniavs';

/* global kiwi:true */

kiwi.plugin('avatars-miniavs', (kiwi) => {
    Object.assign(kiwi['plugin-avatars'].avatarStyles, {
        miniavs: {
            module: avatarModule,
            options: {},
        },
    });
});
