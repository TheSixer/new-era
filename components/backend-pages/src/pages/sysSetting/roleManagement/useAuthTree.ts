import { api } from '@wmeimob/backend-api'
import { TreeResourceVo } from '@wmeimob/backend-api/src/request/data-contracts'
import { useEffect, useMemo, useState } from 'react'

const initCheckedMenus = () => ({ checked: [], halfChecked: [] } as { checked: number[]; halfChecked: number[] })

export default function useAuthTree(props: any) {
  const { data, visible, form } = props
  const [menusTree, setMenusTree] = useState<TreeResourceVo[]>([])
  const [checkedMenus, setCheckedMenus] = useState(initCheckedMenus)

  const treeData = useMemo(() => {
    function getTreeData(list) {
      return list.map((item) => {
        const { path, id, sortNum, type, title, code, parentId } = item
        return {
          parentId, // 父级资源ID，资源类型只能为菜单
          title, // 资源名称
          value: id, // id
          key: id, // key,must,唯一
          code, // 资源代码
          children: item.children ? getTreeData(item.children) : [], // 子节点
          path,
          sortNum,
          type
        }
      }).filter(({key}) => ![5, 10, 15, 16, 17, 18, 22, 23].includes(key))
    }
    return getTreeData(menusTree)
  }, [menusTree])

  useEffect(() => {
    async function init() {
      const { data: menuTree = [] } = await api['/admin/api/sysResource/tree_GET']({})
      setMenusTree(menuTree)
      if (data) {
        getRoleAuth(data.id, menuTree)
      }
    }
    if (visible) {
      init()
    } else {
      form.resetFields()
      setCheckedMenus(initCheckedMenus())
      setMenusTree([])
    }
  }, [data, visible])

  async function getRoleAuth(id: number, tree: TreeResourceVo[]) {
    api['/admin/api/sysRole/{id}_GET'](id).then(({ data = {} }) => {
      const { menuIds = [], buttonIds = [] } = data
      const [checked, halfChecked] = filterCheckedTreeMenuIds(menuIds.concat(buttonIds), tree)

      form.setFieldsValue(data)
      setCheckedMenus({ checked, halfChecked })
    })
  }

  function filterCheckedTreeMenuIds(currentIds: number[], tree: TreeResourceVo[]) {
    let menuIds = [...currentIds]
    let halfCheckedKeys: number[] = []
    tree.forEach((item) => {
      const { children = [], id } = item
      // 深度优先
      if (children.length) {
        const res = filterCheckedTreeMenuIds(menuIds, children)
        menuIds = res[0]
        halfCheckedKeys = halfCheckedKeys.concat(res[1])
      }
      // 如果id在里面并且有子级
      if (menuIds.indexOf(id!) !== -1 && !!children.length) {
        // 子级id是否都在里面。如果不在则是半选。要剔除
        const hasAllChildren = children.map((ch) => ch.id!).every((id) => menuIds.indexOf(id) !== -1)
        if (!hasAllChildren) {
          halfCheckedKeys.push(id!)
          menuIds = menuIds.filter((mid) => id !== mid)
        }
      }
    })
    return [menuIds, halfCheckedKeys]
  }

  const handleMenusCheck = async (checked: any, { halfCheckedKeys }: any) => {
    setCheckedMenus({ checked, halfChecked: halfCheckedKeys })
  }

  return {
    treeData,
    checkedMenus,
    handleMenusCheck
  }
}
