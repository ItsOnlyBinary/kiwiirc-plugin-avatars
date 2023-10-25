import * as avatarModule from '@dicebear/micah';

/* global kiwi:true */

kiwi.plugin('avatars-micah', (kiwi) => {
    Object.assign(kiwi.pluginAvatars.styles, {
        micah: {
            module: avatarModule,
            options: { translateY: 5 },
        },
    });
});
