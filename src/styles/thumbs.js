import * as avatarModule from '@dicebear/thumbs';

/* global kiwi:true */

kiwi.plugin('avatars-thumbs', (kiwi) => {
    Object.assign(kiwi.pluginAvatars.styles, {
        'thumbs': {
            module: avatarModule,
            options: {},
        },
    });
});
