import * as avatarModule from '@dicebear/thumbs';

/* global kiwi:true */

kiwi.plugin('avatars-thumbs', (kiwi) => {
    Object.assign(kiwi['plugin-avatars'].avatarStyles, {
        'thumbs': {
            module: avatarModule,
            options: {},
        },
    });
});
