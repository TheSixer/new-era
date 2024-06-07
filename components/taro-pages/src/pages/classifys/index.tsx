import { View } from '@tarojs/components'
import { useDidShow } from '@tarojs/taro'
import { JsonResultListMenuTreeOutputDto, MenuTreeOutputDto } from '@wmeimob/taro-api/src/request/data-contracts'
import { PageContainer } from '@wmeimob/taro-design'
import MMNavigation from '@wmeimob/taro-design/src/components/navigation'
import convertToTree from '@wmeimob/utils/src/tree/convertToTree'
import { ICoventTree } from '@wmeimob/utils/src/tree/types'
import { FC, memo, ReactNode, useRef, useState } from 'react'
import MmCategorys, { IMmCategorysProps } from '../../components/mmCategorys'
import styles from './index.module.less'

interface IClassifysProps {
  /** 标题 */
  title?: string

  /** 业务 */
  service: ReturnType<typeof useService>

  /** 是否是tab页面 */
  isTab?: boolean

  tabBar?: ReactNode

  /** 点击分类 */
  onClick?: IMmCategorysProps['onClick']
}

const Component: FC<IClassifysProps> = (props) => {
  const { title = '分类', isTab = true, service } = props

  return (
    <PageContainer isTab={isTab} className={styles.classifysStyle}>
      <MMNavigation renderLeft={isTab} title={title} />

      <View style={{ flex: 1, minHeight: 0 }}>
        <MmCategorys data={service.classifies} onClick={props.onClick} />
      </View>

      {props.tabBar}
    </PageContainer>
  )
}

const PageClassifies = memo(Component)
export default PageClassifies

interface IUseCategorys {
  /** 初始是否请求 */
  initRequest?: boolean

  /** 请求 */
  request: (data?: any) => Promise<JsonResultListMenuTreeOutputDto>
}

/**
 * 分类管理hook
 * @param param0
 * @returns
 */
export function useService(option: IUseCategorys) {
  const { initRequest = true } = option

  const [classifies, setClassifies] = useState<ICoventTree<MenuTreeOutputDto>[]>([])
  const initRef = useRef(initRequest)

  useDidShow(() => {
    if (!initRef.current) {
      initRef.current = true
    } else {
      getData()
    }
  })

  async function getData() {
    const { data = [] } = await option.request()
    const cates = convertToTree(data, { title: 'name', value: 'id' })
    setClassifies(cates)
  }

  return {
    classifies,
    getData
  }
}
