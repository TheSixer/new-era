import { memo, useEffect, useMemo, useState, FC } from 'react'
import { Image, View } from '@tarojs/components'
import { IShopCartCellProps } from './const'
import styles from './index.module.less'
import MMCard from '@wmeimob/taro-design/src/components/card'
import MMCheckbox from '@wmeimob/taro-design/src/components/checkbox'
import GoodPrice from '../../../../../components/good/goodPrice'
import classNames from 'classnames'
import { getResizeUrl } from '@wmeimob/aliyun'
import MMStepper from '@wmeimob/taro-design/src/components/stepper'
import MMIconFont from '@wmeimob/taro-design/src/components/icon-font'
import MMIconFontName from '@wmeimob/taro-design/src/components/icon-font/const'
import MMSwipeCell from '@wmeimob/taro-design/src/components/swipeCell'
import { ISwipeCellButton } from '@wmeimob/taro-design/src/components/swipeCell/const'
import { routeNames } from '../../../../../routes'
import { navByLink } from '../../../../../components/pageModules/utils'
import { EJumpType } from '@wmeimob-modules/decoration-data/src/enums/EJumpType'

const Component: FC<IShopCartCellProps> = (props) => {
  const { data, invalid = false, disableSlide = false, onDel, onAddCollection } = props

  const { buyCounts = 0, skuStock = 0 } = data

  const [visible, setVisible] = useState(false)
  const gooImgStyle = useMemo(() => ({ width: 90, height: 90 }), [])

  const sliderButtons = useMemo<ISwipeCellButton[]>(
    () =>
      // eslint-disable-next-line no-nested-ternary
      disableSlide
        ? []
        : invalid
        ? [{ text: '删除', backgroundColor: styles.shopCarDotColor }]
        : [
            { text: '移入收藏', backgroundColor: '#FEA600' },
            { text: '删除', backgroundColor: styles.shopCarDotColor }
          ],
    [disableSlide, invalid]
  )

  useEffect(() => {
    setVisible(false)
  }, [disableSlide])

  const handleJumpDetail = (goodsNo) => {
    navByLink(EJumpType.GoodDetail, { goodsNo })
    // Taro.navigateTo({ url: routeNames.goodsGoodDetail, params: { goodsNo } })
  }

  const handleChangeStepper = (value: number) => {
    if (value !== 0) {
      props.onChangeStepper?.(value)
    }
  }

  return (
    <MMCard className={classNames(styles.shopCartCellStyle, invalid && styles.disabled)}>
      <MMSwipeCell
        visible={visible}
        sliderButtons={sliderButtons}
        disabled={disableSlide}
        beforeClose={async (value) => {
          if (value.text === '删除') {
            await onDel?.(data.skuNo!)
          } else {
            await onAddCollection?.(data.goodsNo!)
          }
          return true
        }}
        onVisibleChange={setVisible}
      >
        <View className={styles.content}>
          <MMCheckbox
            value={data.isChecked || data.isEdit}
            onChange={props.onCheckChange}
            renderUnCheck={invalid ? <View style={{ width: 18 }} /> : undefined}
          />
          <View className={styles.goodImg} style={gooImgStyle} onClick={() => handleJumpDetail(data.goodsNo)}>
            <Image src={data.skuImg + getResizeUrl(gooImgStyle)} style={gooImgStyle} />
            {invalid && <View className={styles.disabledTag}>已失效</View>}
          </View>

          <View className={styles.goodContent}>
            <View className={styles.topBox}>
              <View className={classNames(styles.goodName, 'text-over-flow-2')} onClick={() => handleJumpDetail(data.goodsNo)}>
                {data.goodsName}
              </View>

              {!invalid && (
                <View className={styles.goodSku_left} onClick={props.onSkuClick}>
                  <View className={styles.goodSku_text}>{data.specNames}</View>
                  <MMIconFont value={MMIconFontName.Down} size={8} color={styles.fontColorSecondary} />
                </View>
              )}
            </View>

            {buyCounts > skuStock && <View className={styles.goodFoot_tip}>仅剩{skuStock}件</View>}

            <View className={styles.goodFoot}>
              <GoodPrice color="#EE1722" value={data.skuPrice!} />
              <View className="spacing" />
              {!invalid && (
                <MMStepper
                  min={0}
                  max={skuStock}
                  value={buyCounts}
                  onChange={handleChangeStepper}
                  beforeChange={async (val) => {
                    if (val === 0 && onDel) {
                      return onDel(data.skuNo!)
                    }
                    return true
                  }}
                />
              )}
            </View>
          </View>
        </View>
      </MMSwipeCell>
    </MMCard>
  )
}

const ShopCartCell = memo(Component)
export default ShopCartCell
