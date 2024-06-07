/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const fs = require('fs')
const minimist = require('minimist')

const argv = minimist(process.argv.slice(2));
const env = process.env.NODE_ENV || argv.env;
const { type } = argv;
const { REACT_APP_ENV, TARO_ENV } = process.env
const IS_RN = TARO_ENV === 'rn'
const IS_H5 = TARO_ENV === 'h5'
const isDevelopment = env === 'development'

const crossConfig = {
  miniCssExtractPluginOption: {
    // 忽略css文件引入顺序
    ignoreOrder: true
  },
  lessLoaderOption: {
    lessOptions: {
      javascriptEnabled: true,
      paths: [path.join(__dirname, '../src/modules'), path.join(__dirname, '../node_modules')],
      globalVars: { env, type, yunoss: `'${process.env.TARO_APP_YUN_OSS}'` }
    }
  }
}

const outputRoot = `dist/${TARO_ENV}`

const config = {
  projectName: 'taro-shop-h5',
  date: '2023-3-8',
  designWidth: 375,
  deviceRatio: {
    '375': 1 / 2,
    '640': 2.34 / 2,
    '750': 1,
    '828': 1.81 / 2
  },
  sourceRoot: 'src',
  outputRoot,
  plugins: isDevelopment
    ? [
      /**
       * 是否启用自动路由
       * 会监听src/app.config.ts变化。自动生成src/routes.ts文件
       *
       * 移除插件或者设置autoRoute:false则关闭此功能
       */
      [path.resolve(__dirname, './plugins/autoRoute.js'), { autoRoute: true }]
    ]
    : [],
  defineConstants: {
    REACT_APP_ENV: JSON.stringify(REACT_APP_ENV),
    IS_H5,
    IS_WEAPP: TARO_ENV === 'weapp',
    IS_RN
  },
  copy: {
    patterns: IS_H5
      ? [
        { from: 'src/static/', to: outputRoot + '/static/' } // 指定需要 copy 的目录
      ]
      : [],
    options: {
    }
  },
  framework: 'react',
  compiler: 'webpack5',
  cache: {
    enable: false // Webpack 持久化缓存配置，建议开启。默认配置请参考：https://docs.taro.zone/docs/config-detail#cache
  },
  alias: {
    // '@wmeimob': path.resolve(__dirname, '../src/modules/@wmeimob'),
    '~': path.resolve(__dirname, '../', 'src')
  },
  mini: {
    ...crossConfig,
    postcss: {
      pxtransform: {
        enable: false,
        config: {}
      },
      url: {
        enable: true,
        config: {
          limit: 40000 // 设定转换尺寸上限
        }
      },
      cssModules: {
        enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  },
  h5: {
    ...crossConfig,
    publicPath: '/',
    staticDirectory: 'static',
    devServer: {
      host: 'localhost'
    },
    output: {
      filename: 'js/[name].[hash].js',
      chunkFilename: 'js/[name].[chunkhash].js'
    },
    // 图片大小限制
    imageUrlLoaderOption: {
      limit: 40000,
      name: 'static/images/[name].[hash].[ext]'
    },
    miniCssExtractPluginOption: {
      filename: 'css/[name].[hash].css',
      chunkFilename: 'css/[name].[chunkhash].css'
    },
    postcss: {
      pxtransform: {
        enable: false,
        config: {}
      },

      autoprefixer: {
        enable: true,
        config: {}
      },
      cssModules: {
        enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  },
  rn: {
    appName: 'taroDemo',
    postcss: {
      cssModules: {
        enable: false // 默认为 false，如需使用 css modules 功能，则设为 true
      }
    }
  }
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
