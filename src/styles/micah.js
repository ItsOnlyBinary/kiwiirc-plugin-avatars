import * as avatarModule from '@dicebear/micah';

/* global kiwi:true */

kiwi.plugin('avatars-micah', (kiwi) => {
    Object.assign(kiwi['plugin-avatars'].avatarStyles, {
        micah: {
            module: avatarModule,
            options: { translateY: 5 },
        },
    });
});
