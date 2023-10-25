import * as avatarModule from '@dicebear/adventurer-neutral';

/* global kiwi:true */

kiwi.plugin('avatars-adventurer-neutral', (kiwi) => {
    Object.assign(kiwi.pluginAvatars.styles, {
        'adventurer-neutral': {
            module: avatarModule,
            options: {},
        },
    });
});
