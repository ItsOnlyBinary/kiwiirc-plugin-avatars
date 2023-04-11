import * as avatarModule from '@dicebear/notionists';

/* global kiwi:true */

kiwi.plugin('avatars-notionists', (kiwi) => {
    Object.assign(kiwi['plugin-avatars'].avatarStyles, {
        'notionists': {
            module: avatarModule,
            options: {},
        },
    });
});
