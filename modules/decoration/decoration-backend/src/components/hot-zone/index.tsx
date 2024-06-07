import { Row, Col, Modal, Button } from 'antd'
import React, { memo, useEffect, useState } from 'react'
import styles from './index.module.less'
import HotZone from '../hotZone'
import { EditOutlined, InfoCircleFilled } from '@ant-design/icons'
import { IHotZoneValue } from '@wmeimob-modules/decoration-data'
import classNames from 'classnames'
// FIXME: 这里引用了外部的内容
import JumpType from '~/components/jumpType'

interface IProps {
  value: IHotZoneValue[]
  img?: string
  onChange: (value: IHotZoneValue[]) => void
}

const Component: React.FC<React.PropsWithChildren<IProps>> = (props) => {
  const [visible, setVisible] = useState<boolean>(false)
  const [value, setValue] = useState<IHotZoneValue[]>([])

  function onOk() {
    props.onChange(value)
    setVisible(false)
  }

  useEffect(() => {
    setValue([...(props.value || [])])
  }, [props.value])

  const modalFooter = (
    <div>
      <span className={classNames('textTip', styles.tip)}>
        <InfoCircleFilled className={styles.tip_icon} />
        双击图片添加热区
      </span>
      <Button onClick={() => setVisible(false)}>取消</Button>
      <Button type="primary" onClick={onOk}>
        确定
      </Button>
    </div>
  )

  return (
    <>
      <span onClick={() => setVisible(true)} className={styles.text}>
        {value.length ? (
          <span>已设置{value.length}个热区</span>
        ) : (
          <span>
            添加热区
            <EditOutlined />
          </span>
        )}
      </span>
      <Modal title="设置热区" width={760} visible={visible} destroyOnClose footer={modalFooter} closable={false}>
        <Row>
          <Col span={16}>
            <HotZone value={value} img={props.img || ''} deleteable={false} onChange={(value) => setValue(value)} />
          </Col>
          <Col span={8}>
            <div className={styles.customCard}>
              {value.map((item, index) => {
                const {
                  link: { type, content }
                } = item
                let linkContent: any = {}
                if (content) {
                  if (typeof content === 'string') {
                    linkContent = JSON.parse(content)
                  } else {
                    linkContent = content
                  }
                }
                const value = { type, content: linkContent }
                return (
                  <div key={item.id} className={styles.linkItem}>
                    <span className={styles.linkItem_num}>{index + 1}.</span>
                    <span className={styles.linkItem_jump}>
                      <JumpType
                        value={value}
                        clearable={false}
                        onChange={(link) =>
                          setValue((pre) =>
                            pre.map((it) => (it.id === item.id ? { ...it, link: { type: link.type, content: JSON.stringify(link.content) } } : it))
                          )
                        }
                      />
                    </span>
                    <span className={styles.linkItem_del} onClick={() => setValue((pre) => pre.filter((it, idx) => idx !== index))}>
                      删除
                    </span>
                  </div>
                )
              })}
            </div>
          </Col>
        </Row>
      </Modal>
    </>
  )
}

Component.defaultProps = {}

const HotZoneModal = memo(Component)
export default HotZoneModal
