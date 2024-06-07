type Fun = () => any

/**
 * 特殊节流函数
 * 相比较于普通节流函数。最后一次触发事件后也还会执行一次事件处理函数
 * @param fn 包裹函数
 * @param threshold 间隔时间 默认200ms
 * @returns
 */
export function throttleLast(fn: Fun, threshold = 200) {
  let timer = null
  let startTime = Date.now()

  return function (...args) {
    const remaining = threshold - (Date.now() - startTime)
    clearTimeout(timer)
    if (remaining <= 0) {
      // eslint-disable-next-line @typescript-eslint/no-invalid-this
      fn.apply(this, args)
      startTime = Date.now()
    } else {
      timer = setTimeout(fn, remaining)
    }
  }
}
