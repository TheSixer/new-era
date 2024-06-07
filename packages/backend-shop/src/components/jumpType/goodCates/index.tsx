import { FC, memo, useEffect, useState } from 'react'
import styles from './index.module.less'
import { CateDataNode, IGoodCatesProps } from './const'
import { Tree } from 'antd'
import { api } from '~/request'
import { MenuTreeOutputDto } from '@wmeimob/backend-api'
import { ICoventTree } from '@wmeimob/utils/src/tree/types'
import { systemConfig } from '~/config'
const { config } = systemConfig

const Component: FC<IGoodCatesProps> = (props) => {
  const { value, onChange } = props
  const [list, setList] = useState<CateDataNode[]>([])

  useEffect(() => {
    getClassifyTree()
  }, [])

  async function getClassifyTree() {
    let treeData: ICoventTree<MenuTreeOutputDto>[] = []
    try {
      const { data = [] } = await api['/admin/mall/classify/tree_GET']()
      const treeData = recursionTree(data)
      setList(treeData)
    } catch (error) {}
    return treeData
  }

  function recursionTree(data: MenuTreeOutputDto[], level = 1) {
    return data.map((item) => {
      let { children = [], ...rest } = item

      const selectable = level === config.maxClassifyLevel // 默认只能选择最后一级
      if (children.length) {
        children = recursionTree(children, level + 1)
      }

      return {
        ...rest,
        title: item.name,
        key: item.id,
        level,
        selectable,
        isLeaf: selectable,
        children
      } as CateDataNode
    })
  }

  return (
    <Tree
      selectedKeys={value ? [value.categoryNo] : []}
      treeData={list}
      onSelect={(_keys, { selectedNodes }) => {
        const { title, key, level } = (selectedNodes[0] || {}) as CateDataNode
        onChange?.({ categoryNo: key as string, categoryName: title as string, level })
      }}
      className={styles.goodCatesStyle}
    />
  )
}

Component.displayName = 'GoodCates'

const GoodCates = memo(Component)
export default GoodCates
