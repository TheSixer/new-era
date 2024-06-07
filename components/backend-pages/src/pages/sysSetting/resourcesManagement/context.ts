import { api } from '@wmeimob/backend-api'
import { TreeResourceVo } from '@wmeimob/backend-api/src/request/data-contracts'
import { useEffect, useMemo, useState } from 'react'
import { createContainer } from 'unstated-next'
import { EResourceType } from './const'

function filterMenuTree(data: TreeResourceVo[]) {
  return data.filter((item) => {
    const { children = [], type } = item
    item.children = filterMenuTree(children)
    return type !== EResourceType.Operation
  })
}

function convertMenuTree(data: TreeResourceVo[]) {
  return data.map((item) => {
    const { id, title } = item
    return {
      title,
      key: id, // 给Tree组件使用
      value: id, // 给TreeSelect使用
      children: convertMenuTree(item.children || []),
      item
    }
  })
}

function extraMenuTree(data: TreeResourceVo[], operationMap: Record<number, TreeResourceVo[]> = {}) {
  const newData: TreeResourceVo[] = []
  data.forEach(({ children = [], id, ...rest }) => {
    // 如果儿子里面存在操作权限直接不要
    if (children.some((child) => child.type === EResourceType.Operation)) {
      operationMap[id!] = children
    } else {
      const result = extraMenuTree(children, operationMap)
      children = result.children
      operationMap = result.operationMap
    }

    if (rest.type === EResourceType.Menu) {
      newData.push({ ...rest, id, children })
    }
  })
  return {
    operationMap,
    children: newData
  }
}

function getCodeFromTree(data: TreeResourceVo[], codes: string[] = []) {
  return data.reduce((res, item) => {
    const { code, children = [] } = item
    if (children.length) {
      res = getCodeFromTree(children, res)
    }
    res.push(code!)
    return res
  }, codes)
}

function useContainer() {
  const [connector] = useState('-')
  const [menuTree, setMenuTree] = useState<TreeResourceVo[]>([]) // 菜单树
  const [editData, setEditData] = useState<TreeResourceVo>() // 当前编辑的数据
  const [tooltips] = useState({
    code: '资源权限CODE。请保证全局唯一',
    sortNum: '排序值越大菜单位置越靠上',
    visible: '是否显示在菜单栏中。关闭则只作为页面权限。不显示在菜单栏中',
    path: '配置菜单跳转地址。用于配置第三方跳转链接。系统内链接不需要手动配置'
  })

  // 权限树
  const treeData = useMemo(() => convertMenuTree(menuTree), [menuTree])

  // 当前所有权限code
  const allCodes = useMemo(() => getCodeFromTree(menuTree), [menuTree])

  // 提取非操作权限树
  const extraTree = useMemo(() => {
    const data = filterMenuTree(menuTree)
    return convertMenuTree(data)
  }, [menuTree])

  const queryAllData = async () => {
    const { data = [] } = await api['/admin/api/sysResource/tree_GET']({})
    setMenuTree(data || [])
  }

  useEffect(() => {
    queryAllData()
  }, [])

  return {
    connector,
    queryAllData,
    menuTree,
    editData,
    treeData,
    allCodes,
    extraTree,
    setEditData,
    setMenuTree,
    tooltips
  }
}

const ResourceManagementContext = createContainer(useContainer)

export default ResourceManagementContext
