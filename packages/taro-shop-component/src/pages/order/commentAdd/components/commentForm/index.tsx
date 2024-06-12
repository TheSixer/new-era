import { memo, FC } from 'react'
import { ICommentFormProps } from './const'
import styles from './index.module.less'
import { View, Image, Textarea } from '@tarojs/components'
import { getResizeUrl } from '@wmeimob/tencent-cloud'
import MMCheckbox from '@wmeimob/taro-design/src/components/checkbox'
import MMImagePicker from '@wmeimob/taro-design/src/components/image-picker'
import MMStars from '@wmeimob/taro-design/src/components/stars'
import { MMStarsSize } from '@wmeimob/taro-design/src/components/stars/const'
import classNames from 'classnames'
import MMCard from '@wmeimob/taro-design/src/components/card'
import start from '../../images/star.png'
import startActive from '../../images/star_active.png'
import icon_checked from './icon_checked.png'
import { WORDS_LIMIT } from '../../const'

const Component: FC<ICommentFormProps> = (props) => {
  return (
    <MMCard className={styles.commentFormStyle}>
      <View className={styles.good_title}>
        <Image className={styles.good_img} src={props.goodsImg + getResizeUrl({ width: 45, height: 45 })} />
        <View className={classNames(styles.good_text, 'text-over-flow-2')}>{props.goodsName}</View>
      </View>

      {props.enableStar && (
        <View className={styles.describe}>
          <View className={styles.describe_text}>描述相符</View>
          <MMStars value={props.star} src={startActive} voidSrc={start} size={MMStarsSize.Big} onChange={props.onStarChange} />
        </View>
      )}

      <Textarea
        className={styles.good_textarea}
        placeholder="输入评价内容"
        value={props.comment}
        onInput={(event) => props.onCommentChange?.(event.detail.value)}
        maxlength={WORDS_LIMIT}
        placeholderStyle="fontSize: 14px;color: #CCCCCC;"
      />

      <View className="spacing" />

      <MMImagePicker value={props.imagesUrl} count={props.imagesCount} onChange={props.onImagesUrlChange} />

      <View className="spacing" />

      {props.enableAnonymous && (
        <MMCheckbox style={{ display: 'flex' }} value={props.anonymous!} onChange={props.onAnonymousChange}>
          匿名评价
        </MMCheckbox>
      )}
    </MMCard>
  )
}

Component.defaultProps = {
  imagesCount: 6
}

const CommentForm = memo(Component)
export default CommentForm
