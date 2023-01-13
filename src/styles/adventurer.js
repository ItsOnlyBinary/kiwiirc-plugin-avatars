import * as avatarModule from '@dicebear/adventurer';

/* global kiwi:true */

kiwi.plugin('avatars-adventurer', (kiwi) => {
    Object.assign(kiwi['plugin-avatars'].avatarStyles, {
        adventurer: {
            module: avatarModule,
            options: {},
        },
    });
});
