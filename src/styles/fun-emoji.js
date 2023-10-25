import * as avatarModule from '@dicebear/fun-emoji';

/* global kiwi:true */

kiwi.plugin('avatars-fun-emoji', (kiwi) => {
    Object.assign(kiwi.pluginAvatars.styles, {
        'fun-emoji': {
            module: avatarModule,
            options: {},
        },
    });
});
