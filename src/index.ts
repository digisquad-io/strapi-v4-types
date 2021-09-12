import type {
  ServerPluginInstance,
  ServerController,
  ServerPolicy,
  ServerMiddleware,
  StrapiInstance,
  StrapiConfigContext,
  StrapiAppContext,
  StrapiUser
} from './strapi'
import type {
  ServerPlugin,
  ServerPluginConfig,
  StrapiContentType,
  ServerPluginExtension,
} from './server-plugin'


export type {
  StrapiInstance,
  StrapiContentType,
  StrapiAppContext,
  StrapiUser,
  StrapiConfigContext,
  ServerController,
  ServerPolicy,
  ServerMiddleware,
  ServerPlugin,
  ServerPluginInstance,
  ServerPluginExtension,
  ServerPluginConfig,
}

export function defineServerPlugin<T extends ServerPlugin>(plugin: (strapi: StrapiInstance) => T): T {
  //@ts-ignore
  return plugin()
}
export function defineServerMiddleware<T extends ServerMiddleware>(middleware: (strapi: StrapiInstance) => T): T {
  //@ts-ignore
  return middleware()
}
export function defineConfig<T extends ServerPluginConfig>(config: () => T): T {
  //@ts-ignore
  return config()
}
export function defineContentType<T extends StrapiContentType>(contentType: () => T): T {
  //@ts-ignore
  return contentType()
}