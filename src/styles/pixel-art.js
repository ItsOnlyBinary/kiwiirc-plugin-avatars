import * as avatarModule from '@dicebear/pixel-art';

/* global kiwi:true */

kiwi.plugin('avatars-pixel-art', (kiwi) => {
    Object.assign(kiwi['plugin-avatars'].avatarStyles, {
        'pixel-art': {
            module: avatarModule,
            options: {},
        },
    });
});
