import { guid } from '@wmeimob/utils/src/guid'
import { mergeFunction } from '@wmeimob/utils/src/mergeFunction'

/**
 * React Native 上传方法
 *
 * @INFO Taro RN可以直接使用taro.ts进行上传
 */
export default class AliYunReactNative {
  private getOssToken: () => Promise<any>

  constructor(config: { getOssToken: () => Promise<any> }) {
    this.getOssToken = mergeFunction(config.getOssToken)
  }

  /**
   * 上传文件
   * @param {string[]} fileList
   */
  async upload(fileList: string[]) {
    if (fileList.length === 0) {
      return []
    }

    const {
      content: { accessKeyId, signature, policy, dir, host, cdnDomain }
    } = await this.getOssToken()

    return Promise.all(
      fileList.map(
        (file) =>
          new Promise<string>((resolve) => {
            // 如果是oss地址 忽略上传 直接返回
            if (new RegExp(`^(${host}|${cdnDomain})`).test(file)) {
              resolve(file)
              return
            }

            const formKey = `${dir}${guid()}${file.slice(file.lastIndexOf('.'))}`

            const formData = new FormData()
            formData.append('signature', signature)
            formData.append('OSSAccessKeyId', accessKeyId)
            formData.append('policy', policy)
            formData.append('key', formKey)
            formData.append('success_action_status', '200')
            formData.append('file', {
              uri: file,
              type: 'multipart/form-data',
              name: file
            } as any)

            fetch(host, {
              method: 'POST',
              headers: { 'Content-Type': 'multipart/form-data' },
              body: formData
            }).then(() => resolve(`${cdnDomain || host}/${formKey}`))
          })
      )
    )
  }
}
