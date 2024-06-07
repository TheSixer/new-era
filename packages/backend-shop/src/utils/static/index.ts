import { publicPath } from '~/config'

/**
 * 下载项目中静态文件
 * @param path
 */
export function downloadStaticFile(path: string) {
  window.open(publicPath + 'static/' + path)
}
