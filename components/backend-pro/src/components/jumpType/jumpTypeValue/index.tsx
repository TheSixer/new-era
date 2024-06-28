import { FC, memo, useMemo } from 'react'
import styles from './index.module.less'
import { IJumpTypeValueProps } from './const'
import { EJumpType, MJumpType } from '../enums/EJumpType'
import { ESystemPage, MSystemPage } from '../enums/ESystemPage'

const Component: FC<IJumpTypeValueProps> = (props) => {
  const { jumpValue, jumpTypePrefix = false } = props

  const prefix = useMemo(() => (jumpTypePrefix ? MJumpType[jumpValue.type] + '-' : ''), [jumpTypePrefix, jumpValue])

  const content: any = useMemo(() => {
    return typeof jumpValue.content === 'string' ? JSON.parse(jumpValue.content) : jumpValue.content
  }, [jumpValue.content])

  const paseSysPath = (path = '') => {
    const key = Object.keys(ESystemPage).find((key) => ESystemPage[key] === path)
    const value = ESystemPage[key as any]
    return MSystemPage[value]
  }

  if (!jumpValue.type) {
    return '无'
  }

  return (
    <span className={styles.jumpTypeValueStyle}>
      {prefix +
        ({
          [EJumpType.SystemPage]: paseSysPath(content.path),
          [EJumpType.DecorationPage]: content.name,
          [EJumpType.CustomLink]: content.name,
          [EJumpType.H5Link]: content.path,
          [EJumpType.None]: '无'
          // [EJumpType.GoodCate]: content.categoryName,
          // [EJumpType.GoodDetail]: content.goodsName,
          // [EJumpType.LivePage]: content.goodsName
          // [EJumpType.ShopDetail]: content.storeName
        }[jumpValue.type] || '无')}
    </span>
  )
}

Component.displayName = 'JumpTypeValue'

const JumpTypeValue = memo(Component)
export default JumpTypeValue
