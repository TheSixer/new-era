import { FC, forwardRef, memo, useImperativeHandle, useRef } from 'react'
import styles from './index.module.less'
import mmCurrenty from '@wmeimob/utils/src/mmCurrency'
import { Row, Col, Card, Typography } from 'antd'
import ChartContainer, { IChartContainerRef } from '../chartContainer'
import useAnalysisPdf from '../../useAnalysisPdf'

interface IPrintChartProps {
  saleAmount: number
  orderAmount: number
  userAmount: number
}

const Component = forwardRef<any, IPrintChartProps>((props, ref) => {
  const {} = props

  const saleAmountRef = useRef<IChartContainerRef>(null)
  const orderRef = useRef<IChartContainerRef>(null)
  const newUserRef = useRef<IChartContainerRef>(null)

  const { generate } = useAnalysisPdf()

  useImperativeHandle(
    ref,
    () => ({
      generate: (options: any[]) =>
        new Promise<void>((resolve) => {
          ;[saleAmountRef, orderRef, newUserRef].forEach((rr, index) => {
            rr.current!.setOption(options[index])
          })

          setTimeout(async () => {
            await generate(document.getElementById('domId')!)
            resolve()
          }, 1000)
        })
    }),
    []
  )

  return (
    <div className={styles.printChartStyle}>
      <div id="domId">
        <Row gutter={[10, 10]}>
          <Col span={24}>
            <Card title="营业额" extra={<Typography.Text strong>总计 {mmCurrenty(props.saleAmount)}</Typography.Text>}>
              <ChartContainer ref={saleAmountRef} />
            </Card>
          </Col>

          <Col span={24}>
            <Card title="成交订单量" extra={<Typography.Text strong>{props.orderAmount}单</Typography.Text>}>
              <ChartContainer ref={orderRef} />
            </Card>
          </Col>

          <Col span={24}>
            <Card title="新增用户数量" extra={<Typography.Text strong>{props.userAmount}人</Typography.Text>}>
              <ChartContainer ref={newUserRef} />
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  )
})

Component.displayName = 'PrintChart'

const PrintChart = memo(Component)
export default PrintChart
