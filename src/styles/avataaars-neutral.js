import * as avatarModule from '@dicebear/avataaars-neutral';

/* global kiwi:true */

kiwi.plugin('avatars-avataaars-neutral', (kiwi) => {
    Object.assign(kiwi.pluginAvatars.styles, {
        'avataaars-neutral': {
            module: avatarModule,
            options: {},
        },
    });
});
