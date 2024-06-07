/**
 * 获取文件大小字符串
 *
 * @export
 * @param {(number | string)} fileSize
 * @returns
 */
export function getFileSizeText(fileSize: number | string) {
  const size = Number(fileSize)
  if (size < 1024) {
    return size + 'b'
  } else if (size < 1024 * 1024) {
    return (size / 1024).toFixed(2) + 'kb'
  } else if (size < 1024 * 1024 * 1024) {
    return (size / 1024 / 1024).toFixed(2) + 'mb'
  }

  return (size / 1024 / 1024 / 1024).toFixed(2) + 'g'
}
