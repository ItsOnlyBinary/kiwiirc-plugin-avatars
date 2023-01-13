import * as avatarModule from '@dicebear/avataaars';

/* global kiwi:true */

kiwi.plugin('avatars-avataaars', (kiwi) => {
    Object.assign(kiwi['plugin-avatars'].avatarStyles, {
        avataaars: {
            module: avatarModule,
            options: {},
        },
    });
});
