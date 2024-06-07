/**
 * 函数在未运行完成前 锁死
 *
 * @export
 * @template T
 * @param {T} fun
 * @returns
 */
export function lock<T extends (...args: any) => any>(fun: T) {
  let runing = false

  const fn = async (...args: Parameters<T>) => {
    if (!runing) {
      runing = true
      try {
        const data = await fun.apply(this, args)
        runing = false
        return data
      } catch (error) {
        runing = false
        throw error
      }
    }
  }

  return fn
}
