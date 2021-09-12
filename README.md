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
// src/server/bootstrap.ts
import { 
  withStrapi,
} from '@strapi/types'

export function bootstrap() {
  return withStrapi(async (strapi) => {
    // withStrapi is an empty function, 
    // it's here only to decalre the type for us

    const entityService = strapi.service('entityService')
    
    const articles = await entityService.query("article").findMany({
      select: ["title", "description"],
      where: { title: "Hello World" },
      orderBy: { title: "DESC" },
      populate: { category: true },
    })
  })
}
```

```ts
// src/server/config.ts
import { 
  defineConfig,
} from '@strapi/types'

export interface CustomPluginOption {
  mode: 'default' | 'typescript'
}
export const config = defineConfig(() => ({
  default: ({ env }) => ({
    mode: env('STRAPI_PLUGIN_CONFIG_MODE', 'default')
  } as CustomPluginOption),
  validator: () => true,
}))
```

```ts
// src/server/contentType/restaurants.ts
import { 
  defineContentType,
} from '@strapi/types'

export const restaurants = defineContentType(() => ({
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
```

```ts
// src/strapi-server.ts
import { 
  defineServerPlugin, 
} from '@strapi/types'
import { bootstrap } from './server/bootstrap'
import { config } from './server/bootstrap'
import { restaurants } from './server/contentType/restaurants'

export default defineServerPlugin((strapi) => ({
  bootstrap,
  config,
  contentTypes: {
    restaurants,
  }
})) 
``` 