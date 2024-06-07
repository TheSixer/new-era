
/**
 ** 判断是否是有刘海屏的iPhone
 *
 * @export
 * @param {string} info 设备型号信息，Taro.getSystemInfoSync() | DeviceInfo.getDeviceId()(react-native-device-info库)
 * @param {number} width 设备宽度
 * @param {number} height 设备高度
 * @returns
 */
export function judgmentNewPhone(info: string, width: number, height: number) {
  let isNewPhone = /(iPhone( )?(X|11|12|13|14|15|16))|(unknown.*iPhone)/.test(info);
  if (isNewPhone) {
    isNewPhone = !(width === 375 && height === 667); // 判断是否为iphone SE,1334 x 750 像素分辨率
  }
  return isNewPhone;
}
