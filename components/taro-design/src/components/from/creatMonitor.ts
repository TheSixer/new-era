
/**
 * 监听
 *
 * @returns
 */
export default function creatMonitor<T extends (...args: any) => any = any>() {
  let listenerList: T[] = [];

  function add(fun: T) {
    listenerList.push(fun);
  }

  /**
   * 触发监听
   * @param parameter
   */
  function emit(...parameter: Parameters<T>) {
    return Promise.all(listenerList.map(fun => fun(...parameter as any)));
  }

  /**
   * 移除所有监听
   */
  function remove(fun: T) {
    listenerList = listenerList.filter(val => val === fun);
  }

  function removeAll() {
    listenerList = []
  }

  return {
    remove,
    removeAll,
    add,
    emit
  }
}
