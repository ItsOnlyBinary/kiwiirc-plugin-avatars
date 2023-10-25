import * as avatarModule from '@dicebear/open-peeps';

/* global kiwi:true */

kiwi.plugin('avatars-open-peeps', (kiwi) => {
    Object.assign(kiwi.pluginAvatars.styles, {
        'open-peeps': {
            module: avatarModule,
            options: {},
        },
    });
});
