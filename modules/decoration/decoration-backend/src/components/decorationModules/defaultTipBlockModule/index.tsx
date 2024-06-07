import { FC, memo } from 'react'
import styles from './index.module.less'
import { IModuleInfo, BasicModuleSignEnum } from '@wmeimob-modules/decoration-data'

interface IDefaultTipBlockModuleProps {}

const Component: FC<IDefaultTipBlockModuleProps> = () => {
  return <div className={styles.defaultTipBlockModuleStyle}>放在此处</div>
}

Component.displayName = 'DefaultTipBlockModule'

const DefaultTipBlockModule = memo(Component)
export default DefaultTipBlockModule

export const moduleInfo: IModuleInfo = {
  type: BasicModuleSignEnum.DefaultTipBlock,
  cname: '占位提示符',
  icon: ''
}
