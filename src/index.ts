import type {
  ServerPluginInstance,
  ServerController,
  ServerPolicy,
  ServerMiddleware,
  StrapiInstance,
  StrapiConfigContext,
  StrapiAppContext,
  StrapiUser,
} from './strapi';
import type {
  ServerPlugin,
  ServerPluginConfig,
  StrapiContentType,
  ServerPluginExtension,
} from './server-plugin';
import { AdminPlugin, AdminPluginConfig, AdminAppInstance } from 'admin';

export type {
  AdminPlugin,
  AdminPluginConfig,
  AdminAppInstance,
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
};

export function defineServerPlugin<T extends ServerPlugin>(
  plugin: (strapi: StrapiInstance) => T
): T {
  //@ts-ignore
  return plugin(strapi);
}

export function defineAdminPlugin<T extends AdminPluginConfig>(
  plugin: () => T
): T {
  //@ts-ignore
  return plugin();
}

export function defineServerMiddleware<T extends ServerMiddleware>(
  middleware: (strapi: StrapiInstance) => T
): T {
  //@ts-ignore
  return middleware(strapi);
}

export function defineConfig<T extends ServerPluginConfig>(config: () => T): T {
  //@ts-ignore
  return config();
}

export function defineContentType<T extends StrapiContentType>(
  contentType: () => T
): T {
  //@ts-ignore
  return contentType();
}

export function withStrapi<T extends any>(
  scoped: (strapi: StrapiInstance) => T
): T {
  //@ts-ignore
  return scoped(strapi);
}

export function withAdminApp<T extends any>(
  scoped: (app: AdminAppInstance) => T
): T {
  //@ts-ignore
  return scoped(app);
}
