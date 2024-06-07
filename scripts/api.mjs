/**
 * 使用方式
 *
 * pnpm api
 * 对选择的包执行 pnpm api 命令
 *
 * pnpm api 123
 * 1、对选择的包里的 swagger.config.private.js 的 apifox 路径 127.0.0.1:4523/export/openapi 末尾 id 替换为 123
 * 2、对选择的包执行 pnpm api 命令
 */

import fs from 'fs'
import path from 'path'
import inquirer from 'inquirer'
import child from 'child_process'

const [id] = process.argv.slice(2)

const swaggerPrivateFileName = 'swaggerApi.config.private.js'
const targetsPackage = ['backend-api', 'taro-api']

const hadApiPackages = getHadApiPackages()
  .filter((item) => targetsPackage.includes(item.packageName))
  .sort((a, b) => {
    // 首字母排序
    return a.packageName.charCodeAt(0) - b.packageName.charCodeAt(0)
  })

inquirer
  .prompt([
    {
      type: 'checkbox',
      message: '选择需要生成接口类型的包',
      name: 'selectedList',
      choices: hadApiPackages.map(({ packageName }) => ({ name: packageName }))
    }
  ])
  .then(({ selectedList }) => {
    const packages = getSelectedPackages(selectedList)

    if (id) {
      // 重写 apiFox 配置路径 id
      packages.forEach(({ packageName, pathname }) => {
        coverSwaggerConfigUrl(packageName, path.join(pathname, swaggerPrivateFileName), id)
      })

      console.log('\n ======================== \n')
    }

    // 依次执行 run api
    packages.forEach(async ({ packageName, pathname }) => {
      console.log(` 【生成 Api】 ${packageName} ==========`)
      console.log(' ')

      const log = child.execSync('npm run api', { cwd: pathname })

      console.log(log.toString())
    })
  })

function getSelectedPackages(packagesName = []) {
  return hadApiPackages.filter((item) => packagesName.includes(item.packageName))
}

function getHadApiPackages() {
  const targets = ['packages', 'components']
  const res = []

  targets.forEach((packageDirName) => {
    const name = path.join(process.cwd(), packageDirName)
    const dir = fs.readdirSync(name)

    dir.forEach((subName) => {
      const subDirName = path.join(name, subName)
      const isDir = fs.statSync(subDirName).isDirectory()

      if (!isDir) {
        return
      }

      const hadSwaggerPrivate = fs.readdirSync(subDirName).some((fileName) => fileName === swaggerPrivateFileName)

      hadSwaggerPrivate &&
        res.push({
          packageName: subName,
          pathname: subDirName
        })
    })
  })

  return res
}

function coverSwaggerConfigUrl(packageName = '', pathname = '', apiId = '') {
  const reg = /(http:\/\/127.0.0.1:4523\/export\/openapi\/)\d+/

  const data = fs.readFileSync(pathname)
  const res = data.toString().replace(reg, `$1${apiId}`)

  fs.writeFileSync(pathname, res)

  console.log(` 【已更新 ${packageName}】`)
}
