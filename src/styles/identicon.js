import * as avatarModule from '@dicebear/identicon';

/* global kiwi:true */

kiwi.plugin('avatars-identicon', (kiwi) => {
    Object.assign(kiwi.pluginAvatars.styles, {
        identicon: {
            module: avatarModule,
            options: {},
        },
    });
});
