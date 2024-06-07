import Taro from '@tarojs/taro'
import { FC, memo, useState, useEffect } from 'react'
import { View } from '@tarojs/components'
import styles from './index.module.less'
import { ICommentAddProps, ICommentData, WORDS_LIMIT } from './const'
import MMNavigation from '@wmeimob/taro-design/src/components/navigation'
import MMStars from '@wmeimob/taro-design/src/components/stars'
import classnames from 'classnames'
import { MMStarsSize } from '@wmeimob/taro-design/src/components/stars/const'
import MMButton from '@wmeimob/taro-design/src/components/button'
import MMFixFoot from '@wmeimob/taro-design/src/components/fix-foot'
import { useAtom } from 'jotai'
import { commentOrderAtom } from '../store'
import { PageContainer, useToast } from '@wmeimob/taro-design'
import { useCheckUserStatus } from '../../../globalStore'
import { upload } from '../../../components/aliyun'
import CommentForm from './components/commentForm'
import { AddCommentsDTO, OrderCommentInputDto, api } from '@wmeimob/taro-api'
import start from './images/star.png'
import startActive from './images/star_active.png'
import { routeNames } from '../../../routes'

const Component: FC<ICommentAddProps> = () => {
  const [commentInfo, setCommentInfo] = useAtom(commentOrderAtom)
  const [toast] = useToast()
  const checkUserStatus = useCheckUserStatus()

  const [serviceAttitude, setServiceAttitude] = useState(5) // 服务态度
  const [logisticsService, setLogisticsService] = useState(5) // 物流服务
  const [commentData, setCommentData] = useState<ICommentData[]>([])

  /** 是否追评 */
  const isAppendMode = !!commentInfo?.commentId

  useEffect(() => {
    setCommentData(
      commentInfo!.items.map((item) => {
        return {
          ...item,
          anonymousStatus: 0,
          star: 5,
          imglist: [],
          content: ''
        }
      })
    )
  }, [])

  // 描述相符
  function handleDescChange(value: number, id: number) {
    const newComments = commentData.map((item) => ({ ...item, star: id === item.id ? value : item.star }))
    setCommentData(newComments)
  }

  // 匿名
  function handleAnonymous(id: number) {
    const newComments = commentData.map((item) => {
      let { anonymousStatus } = item
      if (id === item.id) {
        anonymousStatus = anonymousStatus === 0 ? 1 : 0
      }

      return { ...item, anonymousStatus }
    })
    setCommentData(newComments)
  }

  // 上传图片
  async function handleImgChange(value, id) {
    toast?.loading()
    const avatarUrl = await upload(value)
    const content = commentData.map((item) => {
      return { ...item, imglist: id === item.id ? avatarUrl : item.imglist }
    })
    setCommentData(content)
    toast?.hideLoading()
  }

  // 修改文本
  function handleInput(value: string, id: number) {
    const content = commentData.map((item) => {
      return { ...item, content: id === item.id ? value : item.content }
    })
    setCommentData(content)
  }

  // 评价发布
  async function releaseClick() {
    await checkUserStatus.check('当前用户无法评论')

    const goodsCommentLists = commentData.map((item) => {
      return {
        goodsGrade: item.star, // 商品评分
        anonym: !!item.anonymousStatus, // 是否匿名
        content: (item.content || '').trim(),
        imgs: item.imglist.join(','),
        orderItemId: item.id
      }
    })

    const allCommented = goodsCommentLists.every((value) => !!value.content)
    const wordsIncludeLimit = goodsCommentLists.every((value) => value.content.length <= WORDS_LIMIT)

    if (!allCommented) {
      toast?.message('评论内容不能为空哦！')
      return
    }

    if (!wordsIncludeLimit) {
      toast?.message(`评论内容字符不能超过${WORDS_LIMIT}`)
      return
    }

    // 常规添加评论
    const addCommentParams: OrderCommentInputDto = {
      orderNo: commentInfo?.orderNo,
      logisticsGrade: logisticsService,
      serviceGrade: serviceAttitude,
      goodsCommentList: goodsCommentLists
    }

    // 追评参数
    const [appendComment] = commentData
    const appendCommentParams: AddCommentsDTO = {
      commentsId: commentInfo?.commentId,
      content: appendComment.content,
      imgs: appendComment.imglist.join(',')
    }

    commentInfo!.commentId ? await api['/wechat/orders/addComment_POST'](appendCommentParams) : await api['/wechat/orders/comment_POST'](addCommentParams)

    toast?.success('提交成功', () => {
      Taro.redirectTo({ url: routeNames.committedStateCommentSuccess })
      setCommentInfo(null)
    })
  }

  return (
    <PageContainer noPlace className={styles.commentAddStyle}>
      <MMNavigation title="评价" />

      {/* 商品评价 */}
      {commentData.map((item) => (
        <CommentForm
          key={item.goodsNo}
          goodsName={item.goodsName!}
          goodsImg={item.skuImg!}
          star={item.star}
          comment={item.content}
          anonymous={!!item.anonymousStatus}
          imagesUrl={item.imglist}
          enableAnonymous={!isAppendMode}
          enableStar={!isAppendMode}
          onStarChange={(star) => handleDescChange(star, item.id!)}
          onCommentChange={(value) => handleInput(value, item.id!)}
          onImagesUrlChange={(imagesUrl) => handleImgChange(imagesUrl, item.id)}
          onAnonymousChange={() => handleAnonymous(item.id!)}
        />
      ))}

      {!isAppendMode && (
        <View className={styles.evaluate_store}>
          <View className={styles.store_describe}>
            <View className={styles.describe_text}>服务态度</View>
            <MMStars value={serviceAttitude} src={startActive} voidSrc={start} size={MMStarsSize.Big} onChange={(value) => setServiceAttitude(value)} />
          </View>

          <View className={classnames(styles.store_describe, styles.store_describe_wuliu)}>
            <View className={styles.describe_text}>物流服务</View>
            <MMStars value={logisticsService} src={startActive} voidSrc={start} size={MMStarsSize.Big} onChange={(value) => setLogisticsService(value)} />
          </View>
        </View>
      )}

      <MMFixFoot border>
        <MMButton block onClick={releaseClick}>
          发布
        </MMButton>
      </MMFixFoot>
    </PageContainer>
  )
}

const CommentAdd = memo(Component)
export default CommentAdd
