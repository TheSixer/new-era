import { guid } from '@wmeimob/utils/src/guid'
import { mergeFunction } from '@wmeimob/utils/src/mergeFunction'
import COS from 'cos-js-sdk-v5'

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
      data: { bucket, region, dir, host, cdnDomain, credentials }
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
            const { tmpSecretId, tmpSecretKey, sessionToken } = credentials
            const formKey = `${dir}${guid()}${file.slice(file.lastIndexOf('.'))}`

            const cos = new COS({
              SecretId: tmpSecretId,
              SecretKey: tmpSecretKey,
              XCosSecurityToken: sessionToken
            })

            cos.uploadFile({
              Bucket: bucket,
              Region: region,
              Key: formKey,
              Body: file,
              onProgress (progressData) {
                // eslint-disable-next-line no-console
                console.log(JSON.stringify(progressData));
              }
            }, (err) => {
              if (err) {
                // eslint-disable-next-line no-console
                console.log('Upload failed!');
              } else {
                resolve(`${cdnDomain || host}/${formKey}`)
              }
            });
          })

      )
    )
  }
}
