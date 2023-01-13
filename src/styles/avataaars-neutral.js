import * as avatarModule from '@dicebear/avataaars-neutral';

/* global kiwi:true */

kiwi.plugin('avatars-avataaars-neutral', (kiwi) => {
    Object.assign(kiwi['plugin-avatars'].avatarStyles, {
        'avataaars-neutral': {
            module: avatarModule,
            options: {},
        },
    });
});
