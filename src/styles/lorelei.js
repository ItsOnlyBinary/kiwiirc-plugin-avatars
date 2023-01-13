import * as avatarModule from '@dicebear/lorelei';

/* global kiwi:true */

kiwi.plugin('avatars-lorelei', (kiwi) => {
    Object.assign(kiwi['plugin-avatars'].avatarStyles, {
        lorelei: {
            module: avatarModule,
            options: {},
        },
    });
});
