import mock from 'mockjs'

/**
 * 生成表格数据
 * @param list
 * @param data
 * @returns
 */
export function mockPageData(list: any[] | Record<string, any>, data: Record<string, any> = {}) {
  const res: any = {
    code: 0,
    msg: 'OK',
    data: {
      pageNum: 1,
      total: 30,
      pages: 1,
      ...data
    }
  }
  if (list instanceof Array) {
    res.data.list = list
  } else {
    res.data = { ...res.data, ...list }
  }

  return mock.mock(res)
}

/**
 * flat 树状数据
 * @param data
 * @param result
 * @returns
 */
export function flatTreeData(data: any[] = [], result: any = []) {
  return data.reduce((total, item) => {
    const { children = [], ...rest } = item
    total.push(rest)
    if (children.length) {
      total = flatTreeData(children, total)
    }
    return total
  }, result)
}
