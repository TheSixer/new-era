import Taro from '@tarojs/taro'
import { useAtomValue } from 'jotai'
import { useToast } from '@wmeimob/taro-design'
import { IAddressInfo } from './const'
import { optionCitysAtom } from './store'

/**
 * 获取微信地址
 * @returns
 */
export default function useWeixinAddressService() {
  const [toast] = useToast()

  const optionCitys = useAtomValue(optionCitysAtom)

  /**
   * 获取微信地址
   * 需真机调试
   * https://developers.weixin.qq.com/miniprogram/dev/api/open-api/address/wx.chooseAddress.html
   */
  async function getWxAddress() {
    let address: Partial<IAddressInfo> | undefined
    try {
      const res = await Taro.chooseAddress()
      const { provinceName, cityName, countyName, userName, telNumber, detailInfo } = res

      const addArr = getMostMatchAddress([provinceName, cityName, countyName])

      address = { ...address, name: userName, mobile: telNumber, address: detailInfo, addArr }
    } catch (error) {}

    return address
  }

  /**
   * 计算文本相似度并取匹配度最高的一个
   * @param names
   * @returns
   */
  function getMostMatchAddress(names: string[]) {
    toast?.loading()
    const resultString = names.join(',')
    const matchs = optionCitys
      .map(({ label, value }) => {
        return {
          label,
          value,
          match: levenshteinDistance(label, resultString)
        }
      })
      .sort((aa, bb) => bb.match - aa.match)
    toast?.hideLoading()
    const { label, value } = matchs[0]
    const texts = label.split(',')
    const ids = value.split(',')
    return ids.map((id, index) => ({ id, text: texts[index] }))
  }

  /**
   * Levenshtein算法
   * 计算文本相似度
   */
  function levenshteinDistance(text: string, compareText: string) {
    if (text.length === 0) return compareText.length
    if (compareText.length === 0) return text.length

    const matrix: any[] = []

    // increment along the first column of each row
    let ii
    for (ii = 0; ii <= compareText.length; ii++) {
      matrix[ii] = [ii]
    }

    // increment each column in the first row
    let jj
    for (jj = 0; jj <= text.length; jj++) {
      matrix[0][jj] = jj
    }

    // Fill in the rest of the matrix
    for (ii = 1; ii <= compareText.length; ii++) {
      for (jj = 1; jj <= text.length; jj++) {
        if (compareText.charAt(ii - 1) === text.charAt(jj - 1)) {
          matrix[ii][jj] = matrix[ii - 1][jj - 1]
        } else {
          matrix[ii][jj] = Math.min(
            matrix[ii - 1][jj - 1] + 1, // substitution
            Math.min(
              matrix[ii][jj - 1] + 1, // insertion
              matrix[ii - 1][jj] + 1
            )
          ) // deletion
        }
      }
    }

    return (10 - matrix[compareText.length][text.length]) / 10
  }

  return {
    getWxAddress,

    getMostMatchAddress
  }
}
