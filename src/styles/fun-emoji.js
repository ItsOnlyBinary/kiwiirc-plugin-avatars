import * as avatarModule from '@dicebear/fun-emoji';

/* global kiwi:true */

kiwi.plugin('avatars-fun-emoji', (kiwi) => {
    Object.assign(kiwi['plugin-avatars'].avatarStyles, {
        'fun-emoji': {
            module: avatarModule,
            options: {},
        },
    });
});
