import type {
  DefaultContext,
  DefaultState,
  ParameterizedContext,
  Request,
} from 'koa';
import type { ParsedUrlQuery } from 'querystring';
import type { Logger } from 'winston'
import * as Boom from 'boom'

export interface StrapiConfigContext {
  env: (<T = string>(key: string, initial?: T) => T) & {
    int: (key: string, initial?: number) => number;
    float: (key: string, initial?: number) => number;
    bool: (key: string, initial?: boolean) => boolean;
    json: (key: string, initial?: any) => any;
    array: (key: string, initial?: any[]) => any[];
    date: (key: string, initial?: Date) => Date;
  };
}

export interface StrapiUser extends Record<string, any> {}

export interface StrapiAppContext
  extends ParameterizedContext<
    DefaultState & {
      user?: StrapiUser;
    },
    DefaultContext & {},
    any
  > {
  query: ParsedUrlQuery & Record<string, any>;
  request: Request & { body: any };
}

export interface StrapiContainer extends Record<string, any> {}

export interface StrapiInstance {
  dir: string
  log: Logger

  isLoaded: boolean
  reload: any
  fs: any
  eventHub: any
  startupLogger: any
  components: any
  middleware: any
  webhookRunner: any
  db: any
  store: Function
  webhookStore: any
  errors: typeof Boom
  telemetry?: {
    destroy: Function
    send: Function
  },
  container: {
    register<T extends StrapiContainer>(name: string, resolver: T | (() => T)): void
    get<T extends StrapiContainer>(name: string, args?: any): T 
    extend(): void
  }
  server: {
    app: any
    router: any
    httpserver: any
    api: Function
    use: Function
    routes: Function
    listen: Function
    destroy: Function
  }
  admin: {
    register: Function
    bootstrap: Function
    destroy: Function
    config: any
    policies: any
    routes: any[]
    services: any
    controllers: any
    contentTypes: any
  }
  entityService: {
    implementation: any
    decorate: Function
    uploadFiles: Function
    wrapOptions: Function
    emitEvent: Function
    find: Function
    findPage: Function
    findWithRelationCounts: Function
    findOne: Function
    count: Function
    create: Function
    update: Function
    delete: Function
    deleteMany: Function
  }
  entityValidator: {
    validateEntityCreation: Function
    validateEntityUpdate: Function
  }
  controller(uid: string): any;
  service(uid: string): any;
  model(uid: string): any;
  policy(uid: string): any;
  plugin(uid: string): any;
  // middleware(uid: string): any;
  config: {
    get(uid: string, orElse?: any): any
  }
}

export interface ServerController {
  (ctx: StrapiAppContext): Promise<any>;
}

export interface ServerPolicy {
  (ctx: StrapiAppContext, next: () => void): Promise<any>;
}

export interface ServerMiddleware {
  defaults?: {
    [name: string]: { enabled: boolean } & Record<string, any>
  };
  load: {
    beforeInitialize?: () => void;
    initialize?: () => void;
  }
}

export interface ServerPluginInstance {
  get config(): any;
  get routes(): any;

  controller(uid: string): ServerController;
  service(uid: string): any;
  model(uid: string): any;
  policy(uid: string): ServerPolicy;
  middleware(uid: string): ServerMiddleware;
}
