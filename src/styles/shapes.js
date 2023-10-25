import * as avatarModule from '@dicebear/shapes';

/* global kiwi:true */

kiwi.plugin('avatars-shapes', (kiwi) => {
    Object.assign(kiwi.pluginAvatars.styles, {
        'shapes': {
            module: avatarModule,
            options: {},
        },
    });
});
