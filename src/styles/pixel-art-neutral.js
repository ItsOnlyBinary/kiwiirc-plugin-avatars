import * as avatarModule from '@dicebear/pixel-art-neutral';

/* global kiwi:true */

kiwi.plugin('avatars-pixel-art-neutral', (kiwi) => {
    Object.assign(kiwi.pluginAvatars.styles, {
        'pixel-art-neutral': {
            module: avatarModule,
            options: {},
        },
    });
});
