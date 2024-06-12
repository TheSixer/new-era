import { View, Swiper, SwiperItem, Image } from '@tarojs/components'
import { EMemberLevel } from '@wmeimob-modules/member-data/src/enums/EMemberLevel'
import { getResizeUrl } from '@wmeimob/tencent-cloud'
import mmCurrenty from '@wmeimob/utils/src/mmCurrency'
import { FC, memo } from 'react'
import { ICurrentLevelInfo, ILevelList } from '../..'
import CornerMark from '../cornerMark'
import LockMask from '../lockMask'
import styles from './index.module.less'

interface ICardLevelSwiperProps {
  /** 当前激活的等级 */
  current: number

  /** 当前等级 */
  currentLevelInfo: ICurrentLevelInfo

  /** 当前等级列表 */
  levelList: ILevelList[]

  /** 用户头像 */
  avatarUrl: string

  /** 消费金额 */
  amount: number

  onSwiperChange(index: number): void
}

const avatarStyle = { width: 20, height: 20 }

const Component: FC<ICardLevelSwiperProps> = (props) => {
  const { current, levelList, currentLevelInfo, avatarUrl, amount } = props

  return (
    <View>
      <Swiper current={current} previousMargin="15" nextMargin="15" className={styles.swiper} onChange={(ev) => props.onSwiperChange(ev.detail.current)}>
        {levelList.map((level) => {
          const progress =
            level.levelStatus === EMemberLevel.Unlocked
              ? '100%'
              : level.levelStatus === EMemberLevel.UnLock
              ? '0%'
              : level.levelStatus === EMemberLevel.Current && !currentLevelInfo.nextAmount
              ? '100%'
              : `${currentLevelInfo.progress}%`
          return (
            <SwiperItem key={level.level} className={styles.swiper_item}>
              <View className={styles.swiper_item_wrapper}>
                <View className={styles.swiper_item_view} style={{ backgroundImage: `url(${level.bgUrl})` }}>
                  {/* 角标 */}
                  <CornerMark active={level.levelStatus} isFull={currentLevelInfo.isFull} />
                  {/* 锁遮罩 */}
                  {level.levelStatus === EMemberLevel.UnLock && <LockMask />}
                  {/* 当前等级信息 */}
                  {/* {level.levelStatus === EMemberLevel.Current && !!service.currentLevelInfo.nextAmount && ( */}
                  <View className={styles.cardTitle}>
                    <Image src={level.icon! + getResizeUrl({ width: 28, height: 28 })} style={{ width: 28, height: 28, marginRight: 5,flexShrink: 0 }} />
                    <View>{level.levelName}</View>
                  </View>

                  <View style={{ flex: 1 }} />
                  {/*level.levelStatus === EMemberLevel.Current &&*/}
                  {level.levelStatus === EMemberLevel.UnLock && !!level.levelUpMoney && (
                    <View className={styles.card_customInfo}>消费金额距离下一等级还差{mmCurrenty(level.levelUpMoney)}</View>
                  )}

                  {!currentLevelInfo.isFull && <View className={styles.card_progress}>
                    <View style={{ width: progress }} className={styles.card_progress_inner} />
                  </View>}

                  <View className={styles.card_user}>
                    {!!avatarUrl && <Image src={avatarUrl + getResizeUrl(avatarStyle)} style={avatarStyle} className={styles.card_user_avatar} />}
                    <View>消费金额: {amount}</View>
                  </View>
                  {/* )} */}
                </View>
              </View>
            </SwiperItem>
          )
        })}
      </Swiper>
    </View>
  )
}

const CardLevelSwiper = memo(Component)
export default CardLevelSwiper
