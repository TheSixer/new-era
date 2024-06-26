import Taro from '@tarojs/taro'
import { useEffect } from 'react'

/**
 * 小程序版本更新检查
 *
 * @export
 * @param {boolean} [isWeapp=false]
 */
export default function useWeAppUpdate(isWeapp = false) {
  const updataSystem = () => {
    const updateManager = Taro.getUpdateManager()

    updateManager.onCheckForUpdate((res) => {
      // 请求完新版本信息的回调
      // console.log(res.hasUpdate)
    })

    updateManager.onUpdateReady(() => {
      Taro.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success(res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    })

    updateManager.onUpdateFailed(() => {
      // 新版本下载失败
    })
  }

  useEffect(() => {
    isWeapp && updataSystem()
  }, [])
}
