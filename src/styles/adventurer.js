import * as avatarModule from '@dicebear/adventurer';

/* global kiwi:true */

kiwi.plugin('avatars-adventurer', (kiwi) => {
    Object.assign(kiwi.pluginAvatars.styles, {
        adventurer: {
            module: avatarModule,
            options: {},
        },
    });
});
