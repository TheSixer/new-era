import Taro, { getCurrentInstance } from '@tarojs/taro'
import { memo, useMemo, FC } from 'react'
import { View } from '@tarojs/components'
import { IPageContainerProps } from './const'
import { isNewIphone } from '@wmeimob/taro-design/src/components/utils'
import MMToast from '@wmeimob/taro-design/src/components/toast'
import { toastAtom } from '../../globalStore'
import { useAtom } from 'jotai'
// import { IToastRef } from '@wmeimob/taro-design/src/components/toast/const'

/**
 * 通用页面容器
 *
 * 给页面添加安全底部
 */
const Component: FC<IPageContainerProps> = props => {
  const { noPlace = false, isTab = false, ...rest } = props

  const [_t, setToast] = useAtom(toastAtom)

  const memoToast = useMemo(() => {
    const path = getCurrentInstance().router?.path || ''
    return (
      <MMToast
        ref={ref => {
          setToast(pre => ({ ...pre, [path]: ref as any }))
        }}
      />
    )
  }, [])

  return (
    <View {...rest}>
      {props.children}

      {isTab && <View style={{ height: 50 }} />}
      {isNewIphone && !noPlace && <View className="spacingIphone" />}
      {memoToast}
    </View>
  )
}

const PageContainer = memo(Component)
export default PageContainer
