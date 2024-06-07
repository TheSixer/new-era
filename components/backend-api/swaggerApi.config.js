/**
 * swagger api接口生成配置文件
 *
 * 详细配置请查看 @wmeimob/swagger-api-templates/config.js
 * 这里的配置文件会与默认配置进行合并
 * 你可以在项目根目录下新建一个 swaggerApi.config.private.js文件。改文件不会被git追踪。便于多人开发
 */

module.exports = {
  templatesType: 'taro',
  apifoxOption: {
    projects: [{ name: '', url: 'http://127.0.0.1:4523/export/openapi?projectId=1310358&version=2.0' }]
  },
  /** 接口钩子函数 */
  apiHook: {
    /**
     * 当获取到所有接口地址时
     *
     * 你可以在这里定义一些接口过滤规则
     *
     */
    onPaths: (paths) => {
      return paths.filter((path) => /^\/admin/.test(path))
    }
  }
}
