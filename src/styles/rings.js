import * as avatarModule from '@dicebear/rings';

/* global kiwi:true */

kiwi.plugin('avatars-rings', (kiwi) => {
    Object.assign(kiwi.pluginAvatars.styles, {
        'rings': {
            module: avatarModule,
            options: {},
        },
    });
});
