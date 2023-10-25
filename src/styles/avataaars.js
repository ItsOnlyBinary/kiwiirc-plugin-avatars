import * as avatarModule from '@dicebear/avataaars';

/* global kiwi:true */

kiwi.plugin('avatars-avataaars', (kiwi) => {
    Object.assign(kiwi.pluginAvatars.styles, {
        avataaars: {
            module: avatarModule,
            options: {},
        },
    });
});
