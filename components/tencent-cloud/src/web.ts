import { guid } from '@wmeimob/utils/src/guid'
import { IUplodaOptions } from './config'
import { mergeFunction } from '@wmeimob/utils/src/mergeFunction'
import COS from 'cos-js-sdk-v5'

/**
 * web端使用form表单形式上传文件
 */
export default class TencentCloudWeb {
  private getOssToken: () => Promise<any>

  constructor(config: { getOssToken: () => Promise<any> }) {
    this.getOssToken = mergeFunction(config.getOssToken)
  }

  /**
   * 上传文件
   * @param {string[]} fileList
   */
  upload = async (fileList: File[], options: IUplodaOptions = {}) => {
    const {
      data: { bucket, region, dir, host, cdnDomain, credentials }
    } = await this.getOssToken()

    return Promise.all(
      fileList.map(
        (file) =>
          new Promise<string>((resolve) => {
            // 如果是oss地址 忽略上传 直接返回
            if (new RegExp(`^(${host}|${cdnDomain})`).test(file.name)) {
              resolve(file.name)
              return
            }
            const { tmpSecretId, tmpSecretKey, sessionToken } = credentials
            
            const { name } = file

            const suffixIndex = name.lastIndexOf('.')
            const fileName = name.slice(0, suffixIndex)
            const extname = name.slice(suffixIndex + 1)

            const setFileName = options.setFileName || (() => '')
            const nFileName = setFileName(fileName)
            let key = dir
            if (nFileName) {
              key += nFileName
              if (nFileName.lastIndexOf('/') !== nFileName.length - 1) {
                key += '-'
              }
            }
            key += `${guid()}.${extname}`

            const cos = new COS({
              SecretId: tmpSecretId,
              SecretKey: tmpSecretKey,
              XCosSecurityToken: sessionToken
            })

            cos.uploadFile({
              Bucket: bucket,
              Region: region,
              Key: key,
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
                resolve(`${cdnDomain || host}/${key}`)
              }
            });
          })

      )
    )
  }
}
