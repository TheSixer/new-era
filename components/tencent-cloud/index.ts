interface ISize {
  /** 宽度 */
  width?: number
  /** 高度 */
  height?: number
}

const aliyunOss = ''

// 几倍图
const multiple = 2

/**
 * 计算整数
 */
function trunc(nu: number) {
  return Math.trunc(nu) * multiple
}

/**
 * 组装图片链接
 *
 * @export
 * @param {string} url
 * @param {ISize} [size]
 * @return {*}
 */
export function assembleResizeUrl(url?: string, size?: ISize) {
  return url ? url + getResizeUrl(size) : ''
}

/**
 * 获取剪接图片后缀
 *
 * @export
 * @param {ISize} [{ width, height }={}]
 * @return {*}
 */
export function getResizeUrl({ width, height }: ISize = {}) {
  let url = `?x-oss-process=image/resize${width && height ? ',m_fill' : ''}`
  if (width) {
    url += `,w_${trunc(width)}`
  }
  if (height) {
    url += `,h_${trunc(height)}`
  }
  return url
}

/**
 * 获取视频第一帧图片
 *
 * @static
 * @param {{ width: number, height: number }} { width, height }
 * @returns
 * @memberof AliYun
 */
export function getVideoSnapshotUrl({ width, height }: ISize) {
  let url = `?x-oss-process=video/snapshot,t_7000,f_jpg`

  if (width) {
    url += `,w_${trunc(width)}`
  }
  if (height) {
    url += `,h_${trunc(height)}`
  }
  return url
}

function joinPath(...args: string[]) {
  return args.reduce((res, value, index) => {
    if (index === 0) {
      return value
    }
    return !/\/$/.test(res) && !/^\//.test(value) ? res + '/' + value : res + value
  }, '')
}

/**
 * 获取腾讯云图片
 *
 * @export
 * @param {string} name 图片地址
 * @param {number} [width] 图片宽度
 * @param {number} [height] 图片高度
 * @param {number} [dir] 图片目录
 * @return {*}
 */
export function getImage(name: string, width?: number, height?: number, dir = '/') {
  const basePath = /^http(s)?:/.test(name) ? name : joinPath(aliyunOss, dir, name)
  const resize = width || height ? getResizeUrl({ width, height }) : ''
  return basePath + resize
}
