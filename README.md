# Avatars for [Kiwi IRC](https://kiwiirc.com)

This plugin add avatars to all users, they are locally generated to reduce network calls.

It is powered by [DiceBear](https://dicebear.com/)

---

### Dependencies
* node (https://nodejs.org/)
* yarn (https://yarnpkg.com/)

### Building and installing

1. Build the plugin

   ```console
   $ yarn
   $ yarn build
   ```

   The plugin will then be created at `dist/plugin-avatars.js`

   You will also find many other avatar styles starting with `dist/plugin-avatars-`

2. Copy the plugin to your Kiwi webserver

   The plugin file must be loadable from a webserver. Creating a `plugins/` folder with your KiwiIRC files is a good place to put it.

3. Add the plugin to Kiwi IRC

   In your kiwi `config.json` file, find the `plugins` section and add:
   ```json
   {"name": "avatars", "url": "/plugins/plugin-avatars.js"}
   ```

   [Optional] To load other styles also add them as plugins, eg:
    ```json
   {"name": "avatars-micah", "url": "/plugins/plugin-avatars-micah.js"}
   ```

### Configuration

To set the default style add the following json to your `config.json`

```json5
"plugin-avatars" : {
   // URL path to other avatar styles
   // if not set this to use auto detection
   "path": "/static/plugins/plugin-avatars-%style%.js",

   // Default avatar style that will be used
   "style": "initials",

   // Allow styles to be auto loaded if they exist
   "autoLoad": true
},
```

It is possible to specify which styles can be autoloaded, or tweak the style options by setting `"styles"` array with the contents from [config-styles.json](https://github.com/ItsOnlyBinary/kiwiirc-plugin-avatars/blob/master/src/config-styles.json) and editing the contents.

### Advanced

There are some size benefits to including your wanted styles into the main plugin.

To do so take a look in `./src/plugin.js`.

Import the styles you want the same way `initials` is imported, then add them to the `includedStyles` object, making sure the key is all lowercase.

You can also add extra options for each avatar style, see [DiceBear/syles](https://dicebear.com/styles) for the options.

## License

[Licensed under the Apache License, Version 2.0](LICENSE).
