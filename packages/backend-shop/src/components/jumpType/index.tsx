import { message, Tabs, Drawer, Button } from 'antd'
import { FC, memo, useEffect, useMemo, useState } from 'react'
import convertEnumMap from '@wmeimob/backend-pro/src/utils/convertEnumMap'
import { CustomLinkValue, JumpTypeProps } from './const'
import { EJumpType, MJumpType } from './enums/EJumpType'
import CustomLink from './customLink'
import styles from './index.module.less'
import SystemPage from './systemPage'
import { DeleteOutlined } from '@ant-design/icons'
import Decorations from './decorations'
import GoodCates from './goodCates'
import GoodsList from './goodsList'
import LiveList from './liveList'
import H5Link from './h5Link'
import JumpTypeValueComponet from './jumpTypeValue'
import { GoodsVO, MallConfPageOutputDto } from '@wmeimob/backend-api'
import { pick } from 'lodash'

const { TabPane } = Tabs

const initCate = () => ({ categoryName: '', categoryNo: '', level: 2 })

const Component: FC<JumpTypeProps> = (props) => {
  const { value = { type: EJumpType.None, content: {} }, include, clearable = true, onChange = () => {} } = props

  const [tabKey, setTabKey] = useState(EJumpType.SystemPage) // tabkey
  const [visible, setVisible] = useState(false)
  const [sysPageValue, setSysPageValue] = useState('')
  const [customValue, setCustomValue] = useState<CustomLinkValue>({})
  const [decorationValue, setDecorationValue] = useState<MallConfPageOutputDto | undefined>()
  const [cateValue, setCateValue] = useState<any>(initCate)
  const [goodDetail, setGoodDetail] = useState<Pick<GoodsVO, 'goodsName' | 'goodsNo'>>()
  const [livePage, setLivePage] = useState({})
  const [h5Value, setH5Value] = useState({})

  const tabPanes = useMemo(() => {
    const panes = convertEnumMap(MJumpType)
    return include ? panes.filter((it) => include.indexOf(it.value) !== -1) : panes
  }, [include])

  useEffect(() => {
    if (!visible) {
      setSysPageValue('')
      setCustomValue({})
      setDecorationValue(undefined)
      setCateValue(initCate)
      setGoodDetail({})
      setLivePage({})
      setH5Value({})
    }
  }, [visible])

  const handleShowModal = () => {
    const { type, content }: any = value
    const _type = Number(value.type)
    // 打开弹窗赋值
    const setValueFn =
      {
        [EJumpType.SystemPage]: () => setSysPageValue(content.path || ''),
        [EJumpType.CustomLink]: () => setCustomValue(content),
        [EJumpType.DecorationPage]: () => setDecorationValue(content),
        // [EJumpType.GoodCate]: () => setCateValue(content),
        // [EJumpType.GoodDetail]: () => setGoodDetail(content),
        // [EJumpType.LivePage]: () => setLivePage(content),
        [EJumpType.H5Link]: () => setH5Value(content)
      }[type] || (() => setSysPageValue(''))

    setValueFn()

    setTabKey(include?.length ? include[0] : _type === EJumpType.None ? EJumpType.SystemPage : _type)
    setVisible(true)
  }

  const handleModalOk = () => {
    let content: any = {}
    switch (tabKey) {
      case EJumpType.SystemPage:
        if (!sysPageValue) {
          return message.error('请选择链接')
        }
        content = { path: sysPageValue }
        break
      case EJumpType.CustomLink:
        content = customValue
        break
      case EJumpType.H5Link:
        content = h5Value
        break
      case EJumpType.DecorationPage:
        if (!decorationValue) {
          return message.error('请选择链接')
        }
        content = decorationValue
        break
      case EJumpType.GoodCate:
        if (!cateValue.categoryNo) {
          return message.error('请选择一个类目')
        }
        content = cateValue
        break
      case EJumpType.GoodDetail:
        if (!goodDetail?.goodsNo) {
          return message.error('请选择一个商品')
        }
        content = pick(goodDetail, ['goodsName', 'goodsNo'])
        break
      case EJumpType.LivePage:
        if (!livePage?.id) {
          return message.error('请选择一个直播页面')
        }
        content = pick(livePage, ['id', 'name', 'type'])
        break
    }

    onChange({ type: tabKey, content })
    setVisible(false)
  }

  return (
    <span>
      <span>
        {value.content && Object.keys(value.content).length ? (
          <span className={styles.linkText} onClick={handleShowModal}>
            <JumpTypeValueComponet jumpTypePrefix jumpValue={value} />

            {clearable && (
              <DeleteOutlined
                className={styles.linkText_remove}
                onClick={(ev) => {
                  ev.stopPropagation()
                  onChange({ type: EJumpType.None, content: {} })
                }}
              />
            )}
          </span>
        ) : (
          <span className={styles.linkText} onClick={handleShowModal}>
            选择链接
          </span>
        )}
      </span>

      <Drawer
        visible={visible}
        title="选择链接"
        onClose={() => setVisible(false)}
        width={996}
        extra={
          <Button type="primary" onClick={handleModalOk}>
            确定
          </Button>
        }
      >
        <Tabs activeKey={`${tabKey}`} onChange={(value) => setTabKey(parseInt(value))}>
          {tabPanes.map((item) => (
            <TabPane tab={item.label} key={`${item.value}`}>
              {{
                [EJumpType.SystemPage]: <SystemPage value={sysPageValue} onChange={setSysPageValue} />,
                [EJumpType.CustomLink]: <CustomLink value={customValue} onChange={setCustomValue} />,
                [EJumpType.DecorationPage]: <Decorations value={decorationValue} onChange={setDecorationValue} />,
                // [EJumpType.GoodCate]: <GoodCates value={cateValue} onChange={setCateValue} />,
                // [EJumpType.GoodDetail]: <GoodsList value={goodDetail} onChange={setGoodDetail} />,
                // [EJumpType.LivePage]: <LiveList value={livePage} onChange={setLivePage} />,
                [EJumpType.H5Link]: <H5Link value={h5Value} onChange={setH5Value} />
              }[item.value] || MJumpType[item.value]}
            </TabPane>
          ))}
        </Tabs>
      </Drawer>
    </span>
  )
}

Component.displayName = 'JumpType'

const JumpType = memo(Component)
export default JumpType
