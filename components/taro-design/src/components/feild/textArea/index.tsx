import Taro from '@tarojs/taro'
import { forwardRef, memo } from 'react'
import { IMMFeildTextAreaProps } from './const'
import FeildContainer from '../container'
import useFeildRef from '../hooks/useFeildRef'
import { IFeildRef } from '../const'
import MMTextarea from '../../textarea'

/**
 *
 * Field 富文本输入框
 * @param props
 * @returns
 */
const Component = forwardRef<IFeildRef, IMMFeildTextAreaProps>((props, ref) => {
  const { value, rules = [], required, onChange, feildProps } = props

  const { errorMsg, setErrorMsg, valid, showRequired } = useFeildRef({
    rules,
    value,
    placeholder: '111',
    required,
    ref
  })

  function handleFocus(ev) {
    if (errorMsg) {
      setErrorMsg('')
    }
    feildProps?.onFocus?.(ev)
  }

  return (
    <FeildContainer
      {...props}
      required={showRequired}
      errorMsg={errorMsg}
      renderProps={<MMTextarea {...(feildProps as any)} value={value} onFocus={handleFocus} onChange={onChange} />}
    >
      {props.children}
    </FeildContainer>
  )
})

const MMFeildTextArea = memo(Component)
MMFeildTextArea.displayName = 'MMFeildTextArea'
export default MMFeildTextArea
