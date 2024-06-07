/**
 * 合并函数调用，防止在一定时间内重复调用。
 * @param fn 要合并调用的函数。
 * @param time 最小间隔时间，默认为200ms。
 * @returns 返回一个封装函数，该函数具有记忆功能，确保在上一次调用未完成之前不会启动新的调用。
 */
export function mergeFunction<ReturnValue = any>(fn: (...args: any[]) => any, time = 200) {
  let st // 定时器标识
  let resloveHandler: any // 解决Promise的处理函数
  let returnPromise: Promise<ReturnValue> | undefined // 缓存的Promise对象，防止重复创建

  // 返回一个具有记忆功能的封装函数
  return function (...args: any[]) {
    // 如果没有缓存的Promise，创建一个新的
    if (!returnPromise) {
      returnPromise = new Promise((resolve) => {
        resloveHandler = resolve // 保存resolve函数以待后用
      })
    }

    // 清除之前的定时器，避免干扰
    st && clearTimeout(st)
    st = setTimeout(() => {
      // 当间隔时间过后，调用原函数，并解决Promise
      resloveHandler(fn.apply(this as any, args))
      returnPromise = undefined // 清除缓存的Promise，以便下一次调用
    }, time)

    return returnPromise // 返回缓存的或新创建的Promise
  }
}
