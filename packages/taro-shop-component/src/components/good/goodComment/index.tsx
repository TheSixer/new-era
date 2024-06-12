import Taro from '@tarojs/taro'
import { memo, useMemo, FC } from 'react'
import { View, Text, Image } from '@tarojs/components'
import { IGoodCommentProps } from './const'
import styles from './index.module.less'
import MMButton from '@wmeimob/taro-design/src/components/button'
import { api } from '@wmeimob/taro-api'
import defalutHeadImg from '../../../assets/images/public/defaultHeadImg.png'
import MMAvatar from '@wmeimob/taro-design/src/components/avatar'
import MMSpace from '@wmeimob/taro-design/src/components/space'
import MMImageList from '@wmeimob/taro-design/src/components/image-list'
import dayjs from 'dayjs'
import MMCard from '@wmeimob/taro-design/src/components/card'
import { useSetAtom } from 'jotai'
import { commentOrderAtom } from '../../../pages/order/store'
import { routeNames } from '../../../routes'
import { getResizeUrl } from '@wmeimob/tencent-cloud'

/**
 * 商品评论组件
 * @param props
 * @returns
 */
const Component: FC<IGoodCommentProps> = (props) => {
  const { data: item, onRefresh, hasAppendComment, hasHandleBtn, showGood = false } = props

  const setCommentOrderAtom = useSetAtom(commentOrderAtom)

  const appendDayCount = useMemo(() => {
    if (!item.addAt || !item.gmtCreated) return null

    // 只截取到【日】进行计算
    const diff = dayjs(item.addAt.slice(0, 10)).diff(dayjs(item.gmtCreated.slice(0, 10)), 'day')

    return diff
  }, [item])

  /** 是否可追评 需求：时效1年内可追评，且仅可追评 1 次 */
  const canAppendComment = useMemo(() => {
    if (!item.content || !item.gmtCreated) return false

    // 未对当前时间 dayjs() 做具体日期格式做处理(YYY-MM-DD)
    const diff = dayjs().diff(dayjs(item.gmtCreated.slice(0, 10)), 'day')
    const timeInclude = diff <= 365
    return timeInclude && !item.addContent
  }, [item])

  async function handleDel() {
    Taro.showModal({
      title: '提示',
      content: '是否删除评价？',
      async success(res) {
        if (res.confirm) {
          await api['/wechat/orders/comment/{id}_DELETE'](item.id!)
          onRefresh && onRefresh()
        }
      }
    })
  }

  function handleAppendComment() {
    setCommentOrderAtom({
      commentId: item.id,
      items: [
        {
          orderNo: item.orderNo,
          goodsNo: item.goodsNo,
          skuNo: item.skuNo,
          skuImg: item.skuImg,
          goodsName: item.goodsName
        }
      ]
    })
    Taro.navigateTo({ url: routeNames.orderCommentAdd })
  }

  return (
    <View className={styles.goodCommentStyle} style={props.style}>
      {/* 头部 */}
      <View className={styles.head}>
        {/* 头像 */}
        <MMAvatar src={item.isAnonym ? defalutHeadImg : item.headImg!} size={40} shape="circle" />

        <View className={styles.head_center}>
          <View className={styles.name}>{item.isAnonym ? '匿名评价' : item.nickName}</View>
          <View className={styles.head_center_bottom}>
            <Text>{dayjs(item.gmtCreated).format('YYYY.MM.DD HH:mm')}</Text>
          </View>
        </View>

        {/* 评分 */}
        {/* <View className={styles.head_right}>
          <MMStars value={item.goodsGrade} />
        </View> */}
      </View>

      <View className={styles.sku}>
        【<Text>规格:&nbsp; {item.goodsSpec}</Text>&nbsp;&nbsp;
        <Text>数量:&nbsp; {item.goodsCount}</Text>】
      </View>

      {/* 评论 */}
      <View className={styles.content}>{item.content}</View>

      {/* 评论图片 */}
      {item?.imgs && <MMImageList data={item?.imgs?.split(',')} className={styles.commentImgs} />}

      {/* 回复 */}
      {item.isReply && (
        <>
          <View className="spacing" />
          <MMCard title={<Text className={styles.reply_title}>商家回复:</Text>} size="small" className={styles.reply}>
            {item.replyContent}
          </MMCard>
        </>
      )}

      {/* 追评 */}
      {hasAppendComment && item.addContent && (
        <>
          <View className="spacing" />
          <View className={styles.appendCommnet}>
            <Text className={styles.append_title}>{appendDayCount}天后追评</Text>

            <Text>{item.addContent}</Text>
          </View>

          {item?.addImgs && <MMImageList data={item?.addImgs?.split(',')} className={styles.commentImgs} />}
        </>
      )}

      {/* 商家追评回复 */}
      {hasAppendComment && item.addIsReply && (
        <>
          <View className="spacing" />
          <MMCard title={<Text className={styles.reply_title}>商家回复:</Text>} size="small" className={styles.reply}>
            {item.addReplyContent}
          </MMCard>
        </>
      )}

      {/* 商品信息 */}
      {showGood && (
        <View className={styles.goodInfo}>
          <Image src={item.skuImg + getResizeUrl({ width: 50, height: 50 })} style={{ width: 50, height: 50 }} className={styles.goodInfo_img} />

          <View className={styles.goodName}>
            <View className="text-over-flow-2">{item.goodsName}</View>
          </View>
        </View>
      )}

      {/* 底部按钮组 */}
      {hasHandleBtn && (
        <>
          <View className="spacing" />
          <View className={styles.btnBox}>
            <MMSpace>
              <MMButton text="删除" onClick={() => handleDel()} type="default" size="tiny" style={{ width: 68 }} />
              {canAppendComment && <MMButton text="追评" onClick={handleAppendComment} type="default" size="tiny" style={{ width: 68 }} />}
            </MMSpace>
          </View>
        </>
      )}
    </View>
  )
}

const GoodComment = memo(Component)
export default GoodComment
