// https://umijs.org/config/
import { defineConfig } from 'umi'
import path, { join } from 'path'
import zhCN from 'antd/lib/locale/zh_CN'
import defaultSettings from './defaultSettings'
import proxy from './proxy'
import routes from './routes'

const { REACT_APP_ENV, API_URL, PUBLIC_PATH } = process.env

const publicPath = PUBLIC_PATH || '/'

const src = path.resolve(__dirname, '../src')

export default defineConfig({
  plugins: [path.resolve(__dirname, './plugins/buildMonitor.js')],
  accessCodes: {
    routeInject: REACT_APP_ENV !== 'dev',
    exclude: ['home', 'login', 'user-setting', 'user-notices', 'sysSetting-resourcesManagement'],
    sql: true
  },
  // base: publicPath,
  publicPath,
  hash: true,
  // https://v3.umijs.org/zh-CN/plugins/plugin-locale#import-from-umi
  locale: {},
  history: {
    type: 'hash'
  },
  define: {
    REACT_APP_ENV: REACT_APP_ENV || false,
    API_URL,
    PUBLIC_PATH: publicPath
  },
  dva: {
    hmr: true
  },
  alias: {
    '~': src
  },
  layout: {
    // https://umijs.org/zh-CN/plugins/plugin-layout
    // locale: true,
    siderWidth: 208,
    ...defaultSettings
  },
  dynamicImport: {
    loading: '@ant-design/pro-layout/es/PageLoading'
  },
  targets: {
    ie: 11
  },
  // umi routes: https://umijs.org/docs/routing
  routes,
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'root-entry-name': 'variable'
  },
  // esbuild is father build tools
  // https://umijs.org/plugins/plugin-esbuild
  esbuild: {},
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/'
  },
  // Fast Refresh 热更新
  fastRefresh: {},
  openAPI: [
    {
      requestLibPath: "import { request } from 'umi'",
      // 或者使用在线的版本
      // schemaPath: "https://gw.alipayobjects.com/os/antfincdn/M%24jrzTTYJN/oneapi.json"
      schemaPath: join(__dirname, 'oneapi.json'),
      mock: false
    },
    {
      requestLibPath: "import { request } from 'umi'",
      schemaPath: 'https://gw.alipayobjects.com/os/antfincdn/CA1dOm%2631B/openapi.json',
      projectName: 'swagger'
    }
  ],
  nodeModulesTransform: {
    type: 'none'
  },
  // mfsu: {},
  access: {
    strictMode: false
  },
  webpack5: {},
  exportStatic: {},
  chainWebpack(config, { env, webpack, createCSSRule }) {
    // config.resolve.alias.set('@wmeimob', path.resolve(__dirname, '../src/modules/@wmeimob'))
    // 将pacakges纳入编译
    config.module
      .rule('js')
      .include.add(path.resolve(__dirname, '../../'))
      .add(path.resolve(__dirname, '../../../components'))
      .add(path.resolve(__dirname, '../../../modules'))
      .end()

    config.resolve.modules.prepend(src).end()

    // fs.writeFileSync(path.join(__dirname, './outpt.json'), config.toString())
  }
})
