/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-var */
/* eslint-disable id-length */
/* eslint-disable @typescript-eslint/prefer-for-of */
import { ReactNode } from 'react'
import { DataNode } from 'antd/es/tree'
import { MallConfMaterialGroupVo } from '../const'

/**
 * 根据group返回某个节点及父节点，转换为数组
 */
function flatTreeItem(treeData: MallConfMaterialGroupVo[], id: number): MallConfMaterialGroupVo[] | undefined {
  if (Array.isArray(treeData)) {
    for (let i = 0; i < treeData.length; i++) {
      const item = treeData[i]
      if (item.id === id) {
        return [item]
      } else if (item.children) {
        const flatItems = flatTreeItem(item.children, id)
        if (flatItems) {
          return [item!, ...flatItems]
        }
      }
    }
  }
}

/**
 * 根据group返回树形结构全路径title
 */
export function getTreeName(treeData: MallConfMaterialGroupVo[], id: number): string[] | undefined {
  const flatItems = flatTreeItem(treeData, id)
  return flatItems ? flatItems.map((item) => item.name!) : undefined
}

/**
 * 根据id找某个tree的详情
 */
export function findTreeItem(treeData: MallConfMaterialGroupVo[], id: number): MallConfMaterialGroupVo | undefined {
  if (Array.isArray(treeData)) {
    for (let i = 0; i < treeData.length; i++) {
      const item = treeData[i]
      if (item.id === id) {
        return item
      } else if (item.children) {
        const find = findTreeItem(item.children, id)
        if (find) {
          return find
        }
      }
    }
  }
}

/**
 * id是否存在tree中
 */
export function hasTreeItem(treeData: MallConfMaterialGroupVo[], id?: number | null) {
  return id && !!findTreeItem(treeData, id)
}

/**
 * 把group结构转换为antd树结构
 */
export function getTreeData(list: MallConfMaterialGroupVo[], render?: (value: MallConfMaterialGroupVo) => ReactNode): DataNode[] {
  if (!Array.isArray(list)) {
    return []
  }
  return list.map((item) => {
    return {
      title: render ? render(item) : item.name,
      key: item.id!,
      value: item.id!,
      _node: item,
      children: item.children ? getTreeData(item.children, render) : []
    }
  })
}

/**
 * 修改某个分组数量
 */
export function changeTreeNum(treeData: MallConfMaterialGroupVo[], id?: number | null, changeNum = 0) {
  if (id) {
    const flatItems = flatTreeItem(treeData, id)
    flatItems?.forEach((item) => {
      item.mateNum = Math.max(0, (item.mateNum || 0) + changeNum)
    })
  }
  return [...treeData]
}

/**
 * 下载文件并重命名(可跨域，简单文件流最好直接用a标签)
 */
export async function download(url: string, filename?: string) {
  function getBlob(url: string) {
    return new Promise<Blob>((resolve, reject) => {
      var xhr = new XMLHttpRequest()
      xhr.open('GET', url, true)
      xhr.responseType = 'blob'
      xhr.onload = () => {
        if (xhr.status === 200) {
          resolve(xhr.response)
        } else {
          reject()
        }
      }
      xhr.onerror = () => {
        reject()
      }
      xhr.send()
    })
  }

  const response = await getBlob(url)

  const link = document.createElement('a')
  link.href = window.URL.createObjectURL(response)
  link.download = filename || ''
  // fix Firefox
  link.style.display = 'none'
  document.body.appendChild(link)

  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(link.href)
}
