import { View } from '@tarojs/components'
import { getCurrentInstance, getWindowInfo } from '@tarojs/taro'
import ContainerDialog from '../../components/dialog/ContainerDialog'
import MMToast from '../../components/toast'
import { isNewIphone } from '../../components/utils'
import { CSSProperties, FC, memo, PropsWithChildren, useEffect, useMemo } from 'react'
import { setDialog, setToast, useDialog, useToast } from './const'
import { getGlobalData } from '@wmeimob/taro-global-data'

interface IPageContainerProps {
  /**
   * 是否需要垫高
   */
  noPlace?: boolean

  /**
   * 是否是tab页
   *
   * 设置为tab页面。会额外提供一个tabbar的高度
   */
  isTab?: boolean

  className?: string

  style?: CSSProperties | string
}

/**
 * 通用页面容器
 *
 * 给页面添加安全底部
 */
const Component: FC<PropsWithChildren<IPageContainerProps>> = (props) => {
  const { noPlace = false, isTab = false, ...rest } = props

  const memoToast = useMemo(() => {
    const path = getCurrentInstance().router?.path || ''
    return <MMToast ref={(ref) => setToast(path, ref as any)} />
  }, [])

  const memoDialog = useMemo(() => {
    const path = getCurrentInstance().router?.path || ''
    return <ContainerDialog ref={(ref) => setDialog(path, ref as any)} />
  }, [])

  const isWeapp = getGlobalData('isWeapp')
    useEffect(()=>{
      // alert(document.getElementsByClassName("taro_tabbar_page")[0].clientHeight)
    },[])
  return (
    <View {...rest} >
      {props.children}

      {(isTab&&isWeapp) && <View style={{ height: 50 }} />}

      {isNewIphone && !noPlace && <View className="spacingIphone" />}

      {memoToast}

      {memoDialog}
    </View>
  )
}

const PageContainer = memo(Component)
export default PageContainer

export { useDialog, useToast }
