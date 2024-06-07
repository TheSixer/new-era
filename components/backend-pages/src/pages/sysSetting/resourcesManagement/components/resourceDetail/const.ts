import { DataNode } from 'antd/lib/tree'

export interface IResourceDetailProps {}

export enum EDetailType {
  /** 展示详情 */
  Init,
  /** 新增 */
  Add,
  /** 编辑 */
  Edit
}

export enum EResourceChangeType {
  Add,

  Edit,

  Delete
}

export function getTreeInfoById(treeData: DataNode[], id: number): any {
  let result: DataNode | null = null
  treeData.every((node) => {
    const { children = [], key } = node
    if (key === id) {
      result = node
      return false
    }
    if (children.length) {
      result = getTreeInfoById(children, id)
      if (result) {
        return false
      }
    }
    return true
  })

  return result as DataNode | null
}
