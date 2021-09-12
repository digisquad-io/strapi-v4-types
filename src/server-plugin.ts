import type {
  StrapiAppContext,
  StrapiConfigContext,
  ServerController,
  ServerPolicy,
  ServerMiddleware,
} from './strapi';

export interface StrapiContentType {
  schema: {
    kind?: 'singleType' | 'collectionType';
    collectionName: string;
    info: {
      name: string;
      displayName: string;
      singularName: string;
      pluralName: string;
      description?: string;
    };
    attributes: Record<string, any>;
    options: {
      draftAndPublish?: boolean;
      timestamps?: boolean;
    };
    config?: Record<string, any>;
    pluginOptions?: Record<string, any>;
  };
  actions?: Record<string, Function>;
  lifecycles?: {
    beforeCreate?: Function;
    afterCreate?: Function;
    beforeFindOne?: Function;
    afterFindOne?: Function;
    beforeFindMany?: Function;
    afterFindMany?: Function;
    beforeCount?: Function;
    afterCount?: Function;
    beforeCreateMany?: Function;
    afterCreateMany?: Function;
    beforeUpdate?: Function;
    afterUpdate?: Function;
    beforeUpdateMany?: Function;
    afterUpdateMany?: Function;
    beforeDelete?: Function;
    afterDelete?: Function;
    beforeDeleteMany?: Function;
    afterDeleteMany?: Function;
  };
}

export interface ServerPluginConfig {
  default:
    | Record<string, any>
    | ((context: StrapiConfigContext) => Record<string, any>);
  validator?: () => boolean | void;
}

export interface ServerPlugin {
  /**
   * Exposes the bootstrap function.
   * Same as the previous ./config/bootstrap.js file.
   */
  bootstrap?: () => void | Promise<void>;
  /**
   * Exposes the bootstrap function.
   * Same as the previous ./config/bootstrap.js file.
   */
  register?: () => void | Promise<void>;
  /**
   * Exposes the teardown function.
   * Similar to bootstrap this function will be called to cleanup the plugin
   * (close connections / remove listeners ...) when the Strapi instance is destroyed.
   *
   * @todo should be teardown
   */
  destroy?: () => void | Promise<void>;
  /**
   * Default plugin configuration.
   * Either a plain Object or a Function returning an Object.
   *
   * @see https://strapi.io/documentation/v3.x/concepts/configurations.html#formats
   */
  config: ServerPluginConfig;
  /**
   * An array of route configuration.
   *
   * @see https://strapi.io/documentation/v3.x/plugin-development/backend-development.html#routes
   */
  routes?: Record<string, any>[];
  /**
   * An Object with the controllers the plugin provides.
   *
   * @see https://strapi.io/documentation/v3.x/concepts/controllers.html
   */
  controllers?: Record<string, ServerController>;
  /**
   * An Object with the services the plugin provides.
   *
   * @see https://strapi.io/documentation/v3.x/concepts/services.html
   */
  services?: Record<string, any>;
  /**
   * An Object with the policies the plugin provides.
   *
   * @see https://strapi.io/documentation/v3.x/concepts/policies.html
   */
  policies?: Record<string, ServerPolicy>;

  /**
   * An Object with the middlewares the plugin provides.
   *
   * @see https://strapi.io/documentation/v3.x/concepts/middlewares.html
   */
  middlewares?: Record<string, ServerMiddleware>;
  /**
   * An Object with the contentTypes the plugin provides.
   *
   * @see https://strapi.io/documentation/v3.x/concepts/models.html#models
   */
  contentTypes?: Record<string, StrapiContentType>;
}

export interface ServerPluginExtension {}
