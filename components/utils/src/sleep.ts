/**
 * 睡眠函数
 *
 * 用于异步函数里面的延迟触发下一步
 *
 */

export function sleep(delay = 1000) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, delay)
  })
}
