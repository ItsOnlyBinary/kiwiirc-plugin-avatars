import * as avatarModule from '@dicebear/notionists';

/* global kiwi:true */

kiwi.plugin('avatars-notionists', (kiwi) => {
    Object.assign(kiwi.pluginAvatars.styles, {
        'notionists': {
            module: avatarModule,
            options: {},
        },
    });
});
