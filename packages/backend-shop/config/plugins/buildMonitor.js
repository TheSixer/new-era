import process from 'process'

export default function buildMonitor(api) {

  api.onBuildComplete(({ err }) => {
    if (!err) {
      api.logger.info('build success')
      process.exit() // build成功后退出构建进程
    }
  });
}
