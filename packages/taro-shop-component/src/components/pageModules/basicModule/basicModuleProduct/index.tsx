import { View } from '@tarojs/components'
import { getModuleProductDefaultProps, IBasicModuleProductProps } from './const'
import styles from './index.module.less'
import useComponentStyle from '@wmeimob-modules/decoration-taro/src/hooks/useComponentStyle'
import { memo, useState, useMemo, useEffect, FC } from 'react'
import { navByLink } from '../../utils'
import { EJumpType } from '@wmeimob-modules/decoration-data/src/enums/EJumpType'
import { api } from '@wmeimob/taro-api'
import { EProductDataType } from '@wmeimob-modules/decoration-data/src/enums/EProductDataType'
import MasonryList from '../../../masonryList'
import { systemConfig } from '../../../../config'
const { config } = systemConfig

const { maxClassifyLevel } = config

const Component: FC<IBasicModuleProductProps> = (props) => {
  const { componentStyle } = props
  const { style, css } = useComponentStyle(componentStyle)
  const { goodsData } = useModuleProduct(props)

  const paddingBottom = useMemo(() => {
    const pb: any = css.paddingBottom || 0
    return parseInt(pb, 10) - 10 + 'px'
  }, [css.paddingBottom])

  const handleClick = (item) => {
    navByLink(EJumpType.GoodDetail, { goodsNo: item.goodsNo })
  }

  return (
    <View className={styles.basicModuleProductStyle} style={{ ...style, paddingBottom }}>
      <MasonryList data={goodsData} onClick={handleClick} />
    </View>
  )
}

Component.defaultProps = getModuleProductDefaultProps()

const BasicModuleProduct = memo(Component)
export default BasicModuleProduct

function useModuleProduct(props: IBasicModuleProductProps) {
  const { type, goods = [], classify = [], sort, pageSize } = props
  const [goodsData, setGoodsData] = useState<any[]>([])

  useEffect(() => {
    if (type === EProductDataType.All) {
      api['/wechat/goods_POST']({
        selectSortType: sort,
        pageSize,
        classifyId: maxClassifyLevel === 2 ? classify[1] : classify[2],
        classifyPid1: maxClassifyLevel === 2 ? classify[0] : classify[1],
        classifyPid2: maxClassifyLevel === 2 ? undefined : classify[0]
      }).then(({ data = {} }) => {
        const { list = [] } = data
        setGoodsData(list)
      })
    } else {
      const goodNos = goods.map((item) => item.goodsNo)
      if (goodNos.length) {
        api['/wechat/goods/listByNos_POST']({ goodNos, pageSize: 1000 }).then(({ data = {} }) => {
          const { list = [] } = data
          setGoodsData(list)
        })
      }
    }
  }, [])

  return {
    goodsData
  }
}
