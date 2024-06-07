import Taro from '@tarojs/taro'
import { memo, FC } from 'react'
import { View, Text, Image } from '@tarojs/components'
import { IHaveevalueProps } from './const'
import styles from './index.module.less'

const Component: FC<IHaveevalueProps> = props => {
  // const {} = props;
  const { item = {} } = props

  const onImage = (imgurl: any) => {
    const urllist = item.imgList.map(listdata => listdata.img)
    Taro.previewImage({ current: imgurl, urls: urllist })
  }

  const onImageAfter = (imgurl: any) => {
    const urllist = item.appendImgList.map(listdata => listdata.img)
    Taro.previewImage({ current: imgurl, urls: urllist })
  }

  return (
    <View className={styles.haveevalueStyle}>
      <View className={styles.centerbottom_have} key={item.id}>
        <View className={styles.havelist}>
          <View className={styles.havelist_t}>
            <Image className={styles.havelist_timg} src={item.headImg}>
              {' '}
            </Image>
            <View className={styles.havelist_tr}>
              <View className={styles.havelist_trtext}>{item.publishMemberNickname}</View>
              <View className={styles.havelist_trtime}>{item.gmtCreated}</View>
            </View>
          </View>
          <View
            className={styles.havelist_sku}
            style={{ display: '-webkit-box', WebkitLineClamp: 2, overflow: 'hidden', textOverflow: 'ellipsis', WebkitBoxOrient: 'vertical' }}
          >
            {item.goodsNum}件 [{item.goodsSpecNames}]
          </View>
          <View className={styles.havelist_aera}>{item.content}</View>
          <View className={styles.havelist_imglist}>
            {item.imgList &&
              item.imgList.length > 0 &&
              item.imgList.map(imgListdata => (
                <Image className={styles.imglist_img} key={imgListdata.img} src={imgListdata.img} mode="aspectFill" onClick={() => onImage(imgListdata.img)}>
                  {' '}
                </Image>
              ))}
          </View>
          {item.storeReplyContent && <View className={styles.havelist_sjhf}>商家回复：{item.storeReplyContent}</View>}
          {item.appendContent && (
            <View>
              <View className={styles.havelist_aftertime}>用户{item.timeDifference}天后追评</View>
              <View className={styles.havelist_aera}>{item.appendContent}</View>
            </View>
          )}
          <View className={styles.havelist_imglist}>
            {item.appendImgList &&
              item.appendImgList.length &&
              item.appendImgList.map(imgListdata => (
                <Image
                  className={styles.imglist_img}
                  key={imgListdata.img}
                  src={imgListdata.img}
                  mode="aspectFill"
                  onClick={() => onImageAfter(imgListdata.img)}
                />
              ))}
          </View>
          {item.storeAppendReplyContent && <View className={styles.havelist_sjhf}>商家回复：{item.storeAppendReplyContent}</View>}
          <View className={styles.havelist_goods}>
            <Image className={styles.goods_img} src={item.goodsCoverImg}>
              {' '}
            </Image>
            <View
              className={styles.goods_text}
              style={{ display: '-webkit-box', WebkitLineClamp: 1, overflow: 'hidden', textOverflow: 'ellipsis', WebkitBoxOrient: 'vertical' }}
            >
              {item.goodsName}
            </View>
          </View>
          {!item.appendContent && (
            <View className={styles.list_b}>
              <View
                className={styles.list_pl}
                // onClick={() =>
                //   Taro.navigateTo({
                //     url: routeNames.evaluatesAfterevaluate,
                //     params: { id: item.id, goodsCoverImg: item.goodsCoverImg, goodsName: item.goodsName }
                //   })
                // }
              >
                追评
              </View>
            </View>
          )}
        </View>
      </View>
    </View>
  )
}

const Haveevalue = memo(Component)
export default Haveevalue
