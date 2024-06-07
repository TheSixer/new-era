const path = require('path');
const minimist = require("minimist");

const argv = minimist(process.argv.slice(2));
const env = process.env.NODE_ENV || argv.env;
const { type } = argv;
const isDevelopment = env === "development";

const crossConfig = {
  miniCssExtractPluginOption: {
    // 忽略css文件引入顺序
    ignoreOrder: true
  },
  lessLoaderOption: {
    lessOptions: {
      javascriptEnabled: true,
      paths: [
        path.join(__dirname, "../src/modules"),
        path.join(__dirname, "../node_modules")
      ],
      globalVars: { env, type }
    }
  }
}

const config = {
  projectName: 'taro-design3',
  date: '2021-10-29',
  designWidth: 750,
  // deviceRatio: {
  //   640: 2.34 / 2,
  //   750: 1,
  //   828: 1.81 / 2
  // },
  deviceRatio: {
    '750': 1 / 2,
    '375': 1
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: [],
  defineConstants: {
    REACT_APP_ENV: JSON.stringify(process.env.REACT_APP_ENV)
  },
  copy: {
    patterns: [
    ],
    options: {
    }
  },
  alias: {
    '~': path.resolve(__dirname, '../', 'src')
  },
  framework: 'react',
  compiler: 'webpack5',
  mini: {
    ...crossConfig,
    postcss: {
      pxtransform: {
        enable: false,
        config: {

        }
      },
      url: {
        enable: true,
        config: {
          limit: 10240 // 设定转换尺寸上限
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
    postcss: {
      pxtransform: {
        enable: false,
        config: {

        }
      },
      autoprefixer: {
        enable: true,
        config: {
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
  }
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
