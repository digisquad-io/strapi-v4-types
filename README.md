# Strapi V4 - Typescript plugins

This package is a proposal to be part of @strapi packages as @strapi/types

**It implements:** 
- Content type definition file syntax: https://github.com/strapi/rfcs/pull/28
- Plugin API RFC: https://github.com/strapi/rfcs/pull/23

**Tested on next.11:**

1. Create `@strapi/types` package:
   1. clone this repository
   1. run `yarn install` 
   1. run `yarn run build`
   1. run `yarn link`

2. Build `strapi-plugin-typescript-template`
   1. clone `strapi-plugin-typescript-template` repository
   1. run `yarn install` AND `yarn link "@strapi/types"`
   1. code the plugin in `src/strapi-server.ts` :smile:
   1. run `yarn run build`
   1. run `yarn link`

3. Test on next.11
   1. create strapi app
   1. run `yarn install` 
   1. add `"strapi-plugin-typescript-template": "latest"`
   1. run `yarn link "strapi-plugin-typescript-template"`
   1. update `loadJsFile` from `@strapi/strapi`
   1. yay your typescript plugin is loaded :smile:


**loadJsFile**

A small hack is needed in `@strapi/strapi/lib/core/app-configuration/load-config-file.js`

```diff
const loadJsFile = file => {
  try {
    const jsModule = require(file);

    // call if function
    if (typeof jsModule === 'function') {
      return jsModule({ env });
    }

+    // use export.default from ESM or Typescript 
+    if (jsModule && typeof jsModule.default === 'function') {
+      return jsModule.default({ env });
+    } else if (typeof jsModule.default === 'object') {
+      return jsModule.default
+    }

    return jsModule;
  } catch (error) {
    throw new Error(`Could not load js config file ${file}: ${error.message}`);
  }
};
```


**usage**

[see example plugin here](https://github.com/digisquad-io/strapi-plugin-typescript-template/blob/main/src/strapi-server.ts)

```ts
// src/strapi-server.ts
import { 
  defineServerPlugin, 
  defineContentType, 
  defineConfig
} from '@strapi/types'

const config = defineConfig(() => ({
  default: {},
  validator: () => true,
}))

const restaurants = defineContentType(() => ({
  schema: {
    kind: 'collectionType',
    collectionName: 'restaurants',
    info: {
      name: 'restaurant',
      singularName: 'restaurant',
      pluralName: 'restaurants',
      displayName: 'Restaurants',
    },

    attributes: {
      name: {
        type: "string"
      }
    }
  },
}))

export default defineServerPlugin(strapi => ({
  bootstrap() {
    console.log('bootstrap from typescript!', strapi)
  },
})) 
``` 