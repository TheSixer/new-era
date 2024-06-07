// https://umijs.org/config/
import { defineConfig } from 'umi'

export default defineConfig({
  plugins: [
    // https://github.com/zthxxx/react-dev-inspector
    'react-dev-inspector/plugins/umi/react-inspector'
  ],
  /**
   * 自动生成路由名称映射表
   *
   * 设置为true。则会根据config/routes中的路由表自动在src/routes.ts中生成路由映射键值对
   */
  autoRoute: true,
  // https://github.com/zthxxx/react-dev-inspector#inspector-loader-props
  inspectorConfig: {
    exclude: [],
    babelPlugins: [],
    babelOptions: {}
  }
})
