import * as avatarModule from '@dicebear/shapes';

/* global kiwi:true */

kiwi.plugin('avatars-shapes', (kiwi) => {
    Object.assign(kiwi['plugin-avatars'].avatarStyles, {
        'shapes': {
            module: avatarModule,
            options: {},
        },
    });
});
