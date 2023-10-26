import * as avatarModule from '@dicebear/%stylename%';

/* global kiwi:true */

kiwi.plugin('avatars-%stylename%', (kiwi) => {
    kiwi.pluginAvatars.addStyle('%stylename%', avatarModule);
});
