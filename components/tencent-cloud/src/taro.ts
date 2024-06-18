import { guid } from '@wmeimob/utils/src/guid'
import { mergeFunction } from '@wmeimob/utils/src/mergeFunction'
import Taro from '@tarojs/taro'

export default class AliYunTaro {
  private getOssToken: () => Promise<any>

  constructor(config: { getOssToken: () => Promise<any> }) {
    this.getOssToken = mergeFunction(config.getOssToken)
  }

  /**
   * 上传文件
   *
   * @param {string[]} fileList
   */
  upload = async (fileList: string[]) => {
    if (fileList.length === 0) {
      return []
    }

    const {
      data: { bucket, region, dir, host, cdnDomain, credentials }
    } = await this.getOssToken()

    return Promise.all(
      fileList.map(
        (file) =>
          new Promise((resolve) => {
            // 如果是oss地址 忽略上传 直接返回
            if (new RegExp(`^(${host}|${cdnDomain})`).test(file)) {
              resolve(file)
              return
            }
            const { tmpSecretId, tmpSecretKey, sessionToken } = credentials

            let formKey = ''
            if (process.env.TARO_ENV === 'h5') {
              formKey = `${dir}${guid()}`
            } else if (process.env.TARO_ENV === 'weapp') {
              formKey = `${dir}${guid()}.${file.substr(file.lastIndexOf('.') + 1)}`
            }

            const formData = {
              SecretId: tmpSecretId,
              Bucket: bucket,
              Region: region,
              SecretKey: tmpSecretKey,
              XCosSecurityToken: sessionToken,
              // key: "${filename}",
              Key: formKey,
              success_action_status: 200
            }
            Taro.uploadFile({
              url: host,
              filePath: file,
              name: 'file',
              withCredentials: false,
              formData,
              success() {
                resolve(`${cdnDomain || host}/${formData.Key}`)
              }
            })
          })
      )
    ) as Promise<string[]>
  }
}
