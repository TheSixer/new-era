/* eslint-disable import/no-anonymous-default-export */
/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * -------------------------------
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */
export default {
  dev: {
    // '/admin/': {
    //   target: 'http://172.18.58.126:10001'
    // },
    // localhost:8000/api/** -> https://preview.pro.ant.design/api/**
    '/dev': {
      // 要代理的地址
      target: 'https://lyb-prot.f.wmeimob.com',
      // 配置了这个可以从 http 代理到 https
      // 依赖 origin 的功能可能需要这个，比如 cookie
      changeOrigin: true,
      pathRewrite: { '^/dev': '' }
    }
  },
  test: {
    '/api/': {
      target: 'https://proapi.azurewebsites.net',
      changeOrigin: true,
      pathRewrite: { '^': '' }
    }
  },
  pre: {
    '/api/': {
      target: 'your pre url',
      changeOrigin: true,
      pathRewrite: { '^': '' }
    }
  }
}
