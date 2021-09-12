export interface AdminPluginConfig {
  register: (app: AdminAppInstance) => void
  bootstrap: (app: AdminAppInstance) => void
  registerTrads: (config: any) => Promise<any>
}
export interface AdminPlugin {
  name: string
  description: string
  pluginId: string
  pluginLogo: string
  apis: Record<string, any>
  icon: string
  initializer: (() => void | Promise<void>) | null
  injectionZones: Record<string, any>
  isReady: boolean | Promise<boolean>
  isRequired: boolean
  getInjectedComponents: (containerName: string, blockName: string) => any
  injectComponent: (containerName: string, blockName: string, compo: any) => void
}

// should be Plugin but need to be exported first
export interface AdminAppInstance {
  addComponents: (components: any | any[]) => void
  addCorePluginMenuLink: (link: any) => void
  addFields: (fields: any | any[]) => void
  addMenuLink: (link: any | any[]) => void
  addMiddlewares: (middlewares: any[]) => void
  addReducers: (reducers: Record<string, Function>) => void
  addSettingsLink: (sectionId: string, link: any) => void
  addSettingsLinks: (sectionId: string, links: any[]) => void
  bootstrap: () => Promise<void>
  bootstrapAdmin: () => Promise<void>
  createCustomConfigurations: () => Promise<void>
  createHook: (name: string) => void
  createSettingSection: (section: any, links: any[]) => void
  createStore: () => any
  getAdminInjectedComponents: (moduleName: string, containerName: string, blockName: string) => any
  getPlugin: (pluginId: string) => AdminPlugin
  initialize: () => Promise<void>
  injectContentManagerComponent: (containerName: string, blockName: string, component: any) => void
  injectAdminComponent: (containerName: string, blockName: string, component: any) => void
  loadAdminTrads: () => Promise<any>
  loadTrads: () => Promise<any>
  registerHook: (name: string, fn: Function) => Promise<any>
  registerPlugin: (pluginConf: AdminPluginConfig) => Promise<any>
  runHookSeries: (name: string, asynchronous?: boolean) => Promise<any>
  runHookWaterfall: (name: string, initialValue: any, asynchronous?: boolean, store?: any) => Promise<any>
  runHookParallel: (name: string) => Promise<any>
  render: () => any
}