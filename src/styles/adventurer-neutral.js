import * as avatarModule from '@dicebear/adventurer-neutral';

/* global kiwi:true */

kiwi.plugin('avatars-adventurer-neutral', (kiwi) => {
    Object.assign(kiwi['plugin-avatars'].avatarStyles, {
        'adventurer-neutral': {
            module: avatarModule,
            options: {},
        },
    });
});
