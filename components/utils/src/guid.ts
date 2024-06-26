/**
 * 生成唯一标识符
 *
 * @export
 * @returns
 */
export function guid(short = false) {
  const split = short ? '' : '-'
  return S4() + S4() + split + S4() + split + S4() + split + S4() + split + S4() + S4() + S4()
}

function S4() {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
}
