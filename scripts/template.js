/**
 * 模板脚本
 *
 * 运行命令 node scripts/template.js --scope=basic
 *
 * scope 模板作用域
 *  -- basic  基础模板
 *  -- shop   商城模板
 *  -- shop-waimai   商城外卖模板
 */

const fs = require('fs')
const path = require('path')

// 读取作用域参数
const [, , scopeStr = ''] = process.argv
const [, scope = 'basic'] = scopeStr.split('=')
// console.log(process.argv, 'scope', scope);

const pkgNameSet = new Set()
// 确定模板并收集依赖
/**
 * 1.读取模板文件夹中的package.json
 * 2.获取所有依赖包并去重
 */
const templateDir = {
  basic: ['@wmeimob/backend-template', '@wmeimob/taro-template'],
  shop: ['@wmeimob/backend-shop', '@wmeimob/taro-shop-component'],
  'shop-waimai': ['@wmeimob/backend-shop-waimai', '@wmeimob/taro-shop-waimai'],
}[scope]

// 工作区目录
const wrokspaces = ['packages', 'components'].concat(
  fs.readdirSync(path.resolve(__dirname, '../modules')).map(dir => path.join('modules/', dir))
)
// 所有模块路径
// 例如 ['/path/to/mm-frontend/packages/backend-shop']
const modulesPaths = wrokspaces.map(ws => path.resolve(__dirname, '../', ws))
  .reduce((result, item) => {
    const dirPaths = fs.readdirSync(item)
      .map(dir => path.resolve(item, dir))
    return result.concat(dirPaths)
  }, [])

//
/**
 * 构建包依赖树 对象格式
 * {
 * "@wmeimob/request": {
 *    "modulesPath": "/mm-frontend/components/request",
 *    "dependencies": {},
 *    "devDependencies": {}
 * },
 * }
 */
const modulesMap = modulesPaths.reduce((object, modulesPath) => {
  const packagePath = path.resolve(modulesPath, './package.json')
  if (fs.existsSync(packagePath)) {
    const { name, dependencies = {}, devDependencies = {} } = JSON.parse(fs.readFileSync(packagePath).toString()) || {}
    object[name] = {
      modulesPath,
      dependencies,
      devDependencies
    }
  }
  return object
}, {})

// fs.writeFileSync(path.resolve(__dirname, './out.json'), JSON.stringify(modulesMap, null, 2))
// console.log(modulesPaths, 'modulesPaths');


// 去重并合并出最终需要保留的包
// 例如 ["@wmeimob-modules/decoration-backend",...]
const allValidPacks = [...new Set(recursionDependencis(templateDir))].concat(templateDir).concat(['eslint-config-wmeimob'])
// fs.writeFileSync(path.resolve(__dirname, './allValidPacks.json'), JSON.stringify(allValidPacks, null, 2))

// 需要保留的包路径
const validDirs = allValidPacks.map(pack => modulesMap[pack].modulesPath)
// console.log(validDirs)

// 删除无用包
modulesPaths.forEach((dirPath) => {
  if (validDirs.indexOf(dirPath) === -1) {
    console.log(`删除 ${dirPath}`);
    let stat = fs.statSync(dirPath)
    stat.isFile() ? fs.rmSync(dirPath) : removeDir(dirPath)
  }
})
console.log('项目清理完毕');

// 递归收集工作区依赖
function recursionDependencis(packages) {
  return packages.reduce((result, package) => {
    const { dependencies = {}, devDependencies = {} } = modulesMap[package] || {}
    const scopeNameReg = /^@wmeimob\/|^@wmeimob-modules\//
    const types = ['@types/backend-extend-types', '@types/taro-extend-types']

    // 收集工作区包
    const wrokspacePacks = []
    Object.keys({ ...dependencies, ...devDependencies }).forEach(dependenciePack => {
      if (scopeNameReg.test(dependenciePack) || types.includes(dependenciePack)) {
        wrokspacePacks.push(dependenciePack)
      }
    })
    // 合并数组
    result = result.concat(wrokspacePacks)
    // 递归合并
    result = result.concat(recursionDependencis(wrokspacePacks))
    return result
  }, [])
}

/**
 * 删除文件夹
 * @param {*} dir
 */
function removeDir(dir) {
  let files = fs.readdirSync(dir)
  for (var i = 0; i < files.length; i++) {
    let newPath = path.join(dir, files[i]);
    let stat = fs.statSync(newPath)
    if (stat.isDirectory()) {
      //如果是文件夹就递归下去
      removeDir(newPath);
    } else {
      //删除文件
      fs.unlinkSync(newPath);
    }
  }
  fs.rmdirSync(dir)//如果文件夹是空的，就将自己删除掉
}


