import { View } from '@tarojs/components'
import { EPageType, IPageModulesProps, PageContext } from './const'
import styles from './index.module.less'
import BasicModuleSearch from './basicModule/basicModuleSearch'
import BasicModuleSeparator from './basicModule/basicModuleSeparator'
import BasicModuleSlider from './basicModule/basicModuleSlider'
import { BasicModuleSignEnum } from '@wmeimob-modules/decoration-data'
import BasicModuleNavigation from './basicModule/basicModuleNavigation'
import BasicModuleTitle from './basicModule/basicModuleTitle'
import BasicModuleImage from './basicModule/basicModuleImage'
import BasicModuleSliderWithImage from './basicModule/basicModuleSliderWithImage'
import BasicModuleProduct from './basicModule/basicModuleProduct'
import ContentModuleVideo from './basicModule/contentModuleVideo'
import BasicModuleLivePlayer from './basicModule/basicModuleLivePlayer'
import ActivityModule from './basicModule/activityModule'
import { memo, useMemo, FC } from 'react'
import CouponModule from './basicModule/couponModule'
import { isH5 } from '../../config'
import RichTextModule from './basicModule/richTextModule'

const Component: FC<IPageModulesProps> = (props) => {
  const { data = [], pageType = EPageType.Default, pageParams = {}, flag = 0 } = props

  const contextValue = useMemo(() => ({ pageType, pageParams }), [props.pageType, props.pageParams, flag])
  return (
    <PageContext.Provider value={contextValue}>
      <View className={styles.pageModulesStyle}>
        {data.map((item, index) => {
          return (
            <View key={item.id + index}>
              {
                {
                  [BasicModuleSignEnum.Search]: <BasicModuleSearch {...item.data} />,
                  [BasicModuleSignEnum.Separator]: <BasicModuleSeparator {...item.data} />,
                  [BasicModuleSignEnum.Slider]: <BasicModuleSlider {...item.data} />,
                  [BasicModuleSignEnum.Navigation]: <BasicModuleNavigation {...item.data} />,
                  [BasicModuleSignEnum.Title]: <BasicModuleTitle {...item.data} />,
                  [BasicModuleSignEnum.Image]: <BasicModuleImage {...item.data} />,
                  [BasicModuleSignEnum.SliderWithImage]: <BasicModuleSliderWithImage {...item.data} />,
                  [BasicModuleSignEnum.Product]: <BasicModuleProduct {...item.data} />,
                  [BasicModuleSignEnum.Video]: <ContentModuleVideo {...item.data} />,
                  [BasicModuleSignEnum.LivePlayer]: !isH5 && <BasicModuleLivePlayer {...item.data} />,
                  [BasicModuleSignEnum.MarketingActivity]: <ActivityModule {...item.data} moduleType={item.type} />,
                  [BasicModuleSignEnum.PanicBuying]: <ActivityModule {...item.data} moduleType={item.type} />,
                  [BasicModuleSignEnum.PreSale]: <ActivityModule {...item.data} moduleType={item.type} />,
                  [BasicModuleSignEnum.FreeShipping]: <ActivityModule {...item.data} moduleType={item.type} />,
                  [BasicModuleSignEnum.GroupActivity]: <ActivityModule {...item.data} moduleType={item.type} />,
                  [BasicModuleSignEnum.Coupon]: <CouponModule {...item.data} />,
                  [BasicModuleSignEnum.RichText]: <RichTextModule {...item.data} />
                }[item.type]
              }
            </View>
          )
        })}
      </View>
    </PageContext.Provider>
  )
}

const PageModules = memo(Component)
export default PageModules
