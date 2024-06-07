/* eslint-disable id-length */
/* eslint-disable @typescript-eslint/no-var-requires */
const chokidar = require('chokidar');
const path = require('path')
const fs = require('fs')
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;

let watcher;

function parentIsExportDefaultDeclaration(node) {
  if (!node.parentPath) {
    return false;
  }
  if (node.parentPath.type === 'ExportDefaultDeclaration') {
    return true;
  }
  return parentIsExportDefaultDeclaration(node.parentPath)
}

function generateRoute(config, sourcePath) {
  const { pages, subPackages = [] } = config

  let routes = pages.map(item => '/' + item)

  const { list = [] } = config.tabBar || {}

  const tabBar = config.tabBar?.list?.map(item => ({ url: '/' + item.pagePath })) || []

  routes = routes.concat(
    subPackages.reduce((count, item) => {
      return count.concat((item.pages || []).map(page => path.join('/', item.root, page).replace(/\\/g, '/')))
    }, [])
  )

  const routeNames = routes.reduce((obj, route) => {
    const routeName = route
      .split('/')
      .filter(item => !!item)
      .filter((item, index, array) => index !== 0 && index !== array.length - 1)
      .reduce((count, item, index) => {
        const name = item.replace(/-([a-z])/g, (m, p) => p.toUpperCase())
        return index === 0 ? count + name : count + name.replace(/^./, m => m.toUpperCase())
      }, '')

    obj[routeName] = route

    return obj
  }, {})

  // console.log(routes, routeNames)

  let text = `
/**
 * 页面路由映射.
 * 请不要在此文件添加任何代码。因为生成后会全量覆盖
 * 运行 npm run route 或者 yarn route 自动生成
 */
`
  text += 'export const routeNames = ' + JSON.stringify(routeNames, undefined, 2).replace(/"(.+)":/g, `$1:`).replace(/: "(.+)"/g, `: '$1'`)
  text += '\n\n'
  if (tabBar.length) {
    text += `export const tabbar = ` + JSON.stringify(tabBar, undefined, 2).replace(/"(.+)":/g, `$1:`).replace(/: "(.+)"/g, `: '$1'`)
  }

  fs.writeFileSync(path.join(sourcePath, './routes.ts'), text)
}

function handleGen(paths) {
  return new Promise((resolve, reject) => {
    const { sourcePath } = paths
    const code = fs.readFileSync(path.join(sourcePath, './app.config.ts')).toString()
    const ast = parser.parse(code, {
      sourceType: "module",
      plugins: [
        // enable jsx and flow syntax
        "jsx",
        "typescript"
      ]
    });

    let flag = true

    traverse(ast, {
      ObjectExpression(nodePath) {
        const { node } = nodePath
        if (parentIsExportDefaultDeclaration(nodePath) && flag) {
          const config = eval(`(${code.slice(node.start, node.end)})`)
          flag = false
          generateRoute(config, sourcePath)
          console.log('已重新生成routes.ts');
          resolve()
        }
      }
    })
  })

}


export default (ctx, options) => {
  const { paths } = ctx
  const { sourcePath } = paths
  const { autoRoute = true } = options

  // 注册命令
  ctx.registerCommand({
    name: 'autoRoute',
    fn() {
      return handleGen(paths);
    }
  })

  if (!autoRoute) { return }

  // plugin 主体
  if (watcher) {
    watcher.close();
  }
  watcher = chokidar
    .watch(path.join(sourcePath, './app.config.ts'), { ignoreInitial: true })
    .on('change', () => {
      handleGen(paths);
    })
    .on('add', () => {
      handleGen(paths);
    })
    .on('unlink', () => {
      handleGen(paths);
    });


  ctx.onBuildFinish(() => {
    console.log('已启用autoRoute')
  })



}
