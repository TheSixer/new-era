import Taro from '@tarojs/taro'
import { forwardRef, memo } from 'react'
import { ISwitchProps } from './const'
import FeildContainer from '../container'
import MMSwitch from '../../switch'
import useFeildRef from '../hooks/useFeildRef'
import { IFeildRef } from '../const'
// import styles from './index.module.less'

const Component = forwardRef<IFeildRef, ISwitchProps>((props, ref) => {
  const { checked, disabled, onChange, children, rules = [], required, ...containerProps } = props
  const { errorMsg, valid, showRequired } = useFeildRef({ rules, value: !!checked, required, ref })

  return (
    <FeildContainer
      {...containerProps}
      required={showRequired}
      errorMsg={errorMsg}
      renderProps={<MMSwitch checked={checked} disabled={disabled || props.readonly} onChange={onChange} />}
    >
      {children}
    </FeildContainer>
  )
})

const MMFeildSwitch = memo(Component)
MMFeildSwitch.displayName = 'MMFeildSwitch'
export default MMFeildSwitch
