import styles from './index.module.less'
import MMNavigation from '@wmeimob/taro-design/src/components/navigation'
import CollectionItem from './components/collectionItem'
import MMPullToRefresh from '@wmeimob/taro-design/src/components/pull-to-refresh'
import useMMPullToRefresh from '@wmeimob/taro-design/src/components/pull-to-refresh/useMMPullToRefresh'
import { api } from '@wmeimob/taro-api'
import { PageContainer, useToast } from '@wmeimob/taro-design'
import { FC, memo } from 'react'
import MMEmpty from '@wmeimob/taro-design/src/components/empty'
import icon_empty from './icon_empty.png'
import { useDidShow } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { isNewIphone } from '@wmeimob/taro-design/src/components/utils'
import { isNoStatusBar } from '../../../config'

const Component: FC<any> = () => {
  const [toast] = useToast()
  const [info, pullToRefresh] = useMMPullToRefresh({
    initRequest: false,
    getData: (query) => api['/wechat/collection_GET'](query as any)
  })

  useDidShow(() => {
    pullToRefresh.onRefresh()
    var startX,startY;
    document.addEventListener("touchstart",function(e){
      startX = e.targetTouches[0].pageX;
      startY = e.targetTouches[0].pageY;
    });

    document.addEventListener("touchmove",function(e){
      var moveX = e.targetTouches[0].pageX;
      var moveY = e.targetTouches[0].pageY;
      if(Math.abs(moveX-startX)>Math.abs(moveY-startY)){
        e.preventDefault();
      }
    },{passive:false});
  })

  return (
    <PageContainer className={styles.myCollection} noPlace>
      <MMNavigation title="我的收藏" />

      <MMPullToRefresh
        {...pullToRefresh}
        empty={info.isEmpty && <MMEmpty src={icon_empty} imgStyle={{ width: 160, height: 160 }} text="暂未添加任何收藏~" fixed />}
        renderFooter={(isNewIphone) && <View className="spacingIphone" />}
      >
        <View style={{ height: 10 }} />
        {info.list.map((item, index) => (
          <CollectionItem
            data={item}
            key={item.relationalNo}
            onDelete={async () => {
              await api['/wechat/collection_DELETE']({ relationalNo: item.relationalNo! })
              info.deleteByIndex(index)
              toast?.success('删除成功')
              return true
            }}
          />
        ))}
      </MMPullToRefresh>
    </PageContainer>
  )
}

const MyCollection = memo(Component)
export default MyCollection
