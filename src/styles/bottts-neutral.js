import * as avatarModule from '@dicebear/bottts-neutral';

/* global kiwi:true */

kiwi.plugin('avatars-bottts-neutral', (kiwi) => {
    Object.assign(kiwi['plugin-avatars'].avatarStyles, {
        'bottts-neutral': {
            module: avatarModule,
            options: {},
        },
    });
});
