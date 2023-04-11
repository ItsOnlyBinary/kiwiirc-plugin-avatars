import * as avatarModule from '@dicebear/notionists-neutral';

/* global kiwi:true */

kiwi.plugin('avatars-notionists-neutral', (kiwi) => {
    Object.assign(kiwi['plugin-avatars'].avatarStyles, {
        'notionists-neutral': {
            module: avatarModule,
            options: {},
        },
    });
});
