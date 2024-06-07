type Fun = () => any

/**
 * 节流函数
 * @param fn 包裹函数
 * @param threshold 间隔时间 默认200ms
 * @param scope this作用域
 * @returns
 */
export function throttle(fn: Fun, threshold = 200, scope?: any) {
  let prev = Date.now()
  return function (...args) {
    const now = Date.now()
    if (now - prev > threshold) {
      prev = now
      // eslint-disable-next-line @typescript-eslint/no-invalid-this
      fn.apply(scope || this, args)
    }
  }
}
