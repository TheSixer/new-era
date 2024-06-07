import useTimeRangeCountDown from '@wmeimob/utils/src/hooks/useTimeRangeCountDown'
import classNames from 'classnames'
import { FC, memo } from 'react'
import styles from './index.module.less'

interface ITabListProps {
  /** 激活索引 */
  activeIndex: number
  /** 数据 */
  data: ITabListData[]
  /** 索引发生变化 */
  onChange(index: number): void
}

interface ITabListData {
  /** 标题 */
  showActivityTitle: string
  /** 开始时间 */
  startTime: string

  endTime: string
  [i: string]: any
}

const TabSubTitle = memo<Partial<ITabListData>>((props) => {
  const { startTime = '', endTime = '' } = props
  const { day, hour, minute, seconds, timeRangeState } = useTimeRangeCountDown<number>({ startTime, endTime, timeType: 'number' })
  const paratopeTime = (data: number) => (data < 10 ? `0${data}` : `${data}`)

  let text = ''
  if (timeRangeState === 'end') {
    text = '已结束'
  } else if (timeRangeState === 'notStart') {
    text = day > 0 ? `${day}天后开始` : `${paratopeTime(hour)}:${paratopeTime(minute)}:${paratopeTime(seconds)}开始`
  } else {
    text = day > 0 ? `${day}天后结束` : `${paratopeTime(hour)}:${paratopeTime(minute)}:${paratopeTime(seconds)}结束`
  }

  return <span className={styles.tabSubtTitleStyle}>{text}</span>
})

const Component: FC<ITabListProps> = (props) => {
  const { data = [], activeIndex, onChange } = props

  return (
    <div className={styles.tabListStyle}>
      <div className={styles.tabContent}>
        {data.map((item, index) => (
          <div
            key={item.showActivityTitle + `${index}`}
            className={classNames(styles.tabItem, index === activeIndex && styles.tabItem_active)}
            onClick={() => {
              if (index !== activeIndex && onChange) {
                onChange(index)
              }
            }}
          >
            <div>{item.showActivityTitle}</div>
            <div className={styles.subTitle}>
              <span className={styles.tabItem_text}>
                <TabSubTitle startTime={item.startTime} endTime={item.endTime} />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

Component.displayName = 'TabList'

const TabList = memo(Component)
export default TabList
