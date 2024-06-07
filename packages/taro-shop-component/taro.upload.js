const ci = require('miniprogram-ci')
const minimist = require('minimist')
const package = require('./package.json')
const projectConfig = require('./project.config.json')

/**
 * 计算版本
 * @param {} version
 * @returns
 */
function caclVersion(version, type) {
  return version
    .split('.')
    .map((item, index) => {
      const it = Number(item)
      if (type === 'major') {
        return index == 0 ? it + 1 : 0
      } else if (type === 'minor') {
        return index === 0 ? it : index == 1 ? it + 1 : 0
      }
      return index === 2 ? it + 1 : it
    })
    .join('.')
}



async function exec() {
  let { version, weappVersionType = 'minor' } = minimist(process.argv.slice(2))
  const { appid, projectname } = projectConfig

  if (!version) {
    version = caclVersion(package.version, weappVersionType)
  }

  console.log(`---上传小程序--- ${projectname}`, `appid: ${appid}`, `版本: ${version}`)

  const project = new ci.Project({
    appid,
    type: 'miniProgram',
    projectPath: '.',
    privateKeyPath: `./private.${appid}.key`,
    ignores: ['node_modules/**/*'],
  })

  const uploadResult = await ci.upload({
    project,
    version,
    desc: '上传',
    setting: {},
    onProgressUpdate: console.log,
  })
  console.log(uploadResult)
}

exec()
