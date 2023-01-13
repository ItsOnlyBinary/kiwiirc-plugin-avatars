import * as avatarModule from '@dicebear/personas';

/* global kiwi:true */

kiwi.plugin('avatars-personas', (kiwi) => {
    Object.assign(kiwi['plugin-avatars'].avatarStyles, {
        personas: {
            module: avatarModule,
            options: {},
        },
    });
});
