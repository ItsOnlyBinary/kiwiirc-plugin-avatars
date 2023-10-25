import * as avatarModule from '@dicebear/lorelei';

/* global kiwi:true */

kiwi.plugin('avatars-lorelei', (kiwi) => {
    Object.assign(kiwi.pluginAvatars.styles, {
        lorelei: {
            module: avatarModule,
            options: {},
        },
    });
});
