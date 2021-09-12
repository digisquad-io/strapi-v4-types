import type {
  DefaultContext,
  DefaultState,
  ParameterizedContext,
  Request,
} from 'koa';
import type { ParsedUrlQuery } from 'querystring';

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

export interface StrapiInstance {
  plugin(uid: string): ServerPluginInstance;
  controller(uid: string): any;
  service(uid: string): any;
  model(uid: string): any;
  policy(uid: string): any;
  hook(uid: string): any;
  middleware(uid: string): any;
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
  get config(): string;
  get routes(): string;

  controller(uid: string): ServerController;
  service(uid: string): any;
  model(uid: string): any;
  policy(uid: string): ServerPolicy;
  middleware(uid: string): ServerMiddleware;
}
