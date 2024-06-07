import { Col, Row } from 'antd'
import classNames from 'classnames'
import { FC, memo, useMemo } from 'react'
import { IBasicActivityGood } from '@wmeimob-modules/decoration-data'
import styles from './index.module.less'

interface IGoodsCheckListProps<T = IBasicActivityGood> {
  value: T[]
  data: T[]
  onChange(data: T[]): void
}

const Component: FC<IGoodsCheckListProps> = (props) => {
  const { value = [], data = [], onChange } = props

  const ids = useMemo(() => value.map((item) => item.id), [value])
  const handleClick = (item: IBasicActivityGood) => {
    if (ids.includes(item.id)) {
      onChange(value.filter((da) => da.id !== item.id))
    } else {
      onChange(value.concat(item))
    }
  }

  return (
    <div className={styles.goodsCheckListStyle}>
      <Row>
        {data.map((item) => (
          <Col span={6} key={item.id} onClick={() => handleClick(item)}>
            <div className={classNames(styles.card, ids.indexOf(item.id) !== -1 && styles.card_active)}>
              <div className={styles.cover} style={{ backgroundImage: `url(${item.coverImg})` }} />
              <div className={styles.content}>
                <div className="textOverflow2">{item.goodsName}</div>
                <div> ¥{item.price}</div>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  )
}

Component.displayName = 'GoodsCheckList'

const GoodsCheckList = memo(Component)
export default GoodsCheckList
