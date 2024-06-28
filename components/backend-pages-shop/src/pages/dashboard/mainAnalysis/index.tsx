import { FC, memo, useEffect, useMemo, useRef, useState } from 'react'
import styles from './index.module.less'
import { PageContainer } from '@ant-design/pro-layout'
import { Button, Card, Col, Radio, RadioChangeEvent, Row, Select, Space, Spin, Typography } from 'antd'
import StatisticCard from './components/statisticCard'
import dayjs from 'dayjs'
import ChartContainer, { IChartContainerRef } from './components/chartContainer'
import { api } from '@wmeimob/backend-api'
import { StatisticsCountOutputDto } from '@wmeimob/backend-api/src/request/data-contracts'
import mmCurrenty from '@wmeimob/utils/src/mmCurrency'
import OrderDetails, { IOrderDetailsProps } from './components/orderDetails'
import PrintChart from './components/printChart'
import { OOrderChannelType } from '@wmeimob/shop-data/src/enums/order/EOrderChannelType'

interface IMainAnalysisProps extends IOrderDetailsProps {}

const Component: FC<IMainAnalysisProps> = (props) => {
  const { value, queryParams, quickConditions, handleChange, handleSelect, type } = useQuery()

  const [pageLoading, setPageLoading] = useState(false)
  const saleAmountChart = useSaleAmountChart(queryParams)
  const orderChart = useOrderChart(queryParams)
  const newUserChart = useNewUserChart(queryParams)

  const { summary } = usePageService()

  const printChartRef = useRef<any>()

  return (
    <PageContainer title={false} pageHeaderRender={false} className={styles.mainAnalysisStyle}>
      <Spin spinning={pageLoading}>
        <Space direction="vertical" size={10} style={{ width: '100%' }}>
          <StatisticCard.Group>
            <StatisticCard title="今日新增用户数" value={summary.userCount} />
            <StatisticCard title="今日营业额" value={mmCurrenty(summary.saleAmount)} />
            <StatisticCard title="今日成交订单量" value={`${summary.orderCount}单`} />
            <StatisticCard title="成交客单价" value={mmCurrenty(summary.perCustomerTransaction)} />
            <StatisticCard title="售后订单数" value={`${summary.refundOrderCount}单`} />
          </StatisticCard.Group>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography.Title level={4} style={{ marginBottom: 0 }}>
              统计图
            </Typography.Title>
            <Space>
              <Button
                type="primary"
                onClick={async () => {
                  setPageLoading(true)
                  try {
                    await printChartRef.current.generate([saleAmountChart.optionRef.current, orderChart.optionRef.current, newUserChart.optionRef.current])
                  } catch (error) {}
                  setPageLoading(false)
                }}
              >
                统计打印
              </Button>
              <div>订单渠道：</div>
              <Select size="middle" allowClear style={{ width: 200 }} value={type} options={OOrderChannelType} onChange={handleSelect} />
              <Radio.Group value={value} onChange={handleChange}>
                {quickConditions.map((item) => (
                  <Radio.Button key={item.value} value={item.value}>
                    {item.label}
                  </Radio.Button>
                ))}
              </Radio.Group>
            </Space>
          </div>

          <Row gutter={[10, 10]}>
            <Col span={12}>
              <Card title="营业额" extra={<Typography.Text strong>总计 {mmCurrenty(saleAmountChart.count)}</Typography.Text>}>
                <Spin spinning={saleAmountChart.loading}>
                  <ChartContainer ref={saleAmountChart.chartRef} />
                </Spin>
              </Card>
            </Col>

            <Col span={12}>
              <Card title="成交订单量" extra={<Typography.Text strong>{orderChart.count}单</Typography.Text>}>
                <Spin spinning={orderChart.loading}>
                  <ChartContainer ref={orderChart.chartRef} />
                </Spin>
              </Card>
            </Col>

            <Col span={12}>
              <Card title="新增用户数量" extra={<Typography.Text strong>{newUserChart.count}人</Typography.Text>}>
                <Spin spinning={newUserChart.loading}>
                  <ChartContainer ref={newUserChart.chartRef} />
                </Spin>
              </Card>
            </Col>
          </Row>

          <OrderDetails params={queryParams} onOrderDetail={props.onOrderDetail} />
        </Space>
      </Spin>

      <PrintChart ref={printChartRef} saleAmount={saleAmountChart.count} orderAmount={orderChart.count} userAmount={newUserChart.count} />
    </PageContainer>
  )
}

const MMMainAnalysisPage = memo(Component)
export default MMMainAnalysisPage

const commonChartOption = {
  tooltip: { trigger: 'axis' },
  grid: { top: 10, containLabel: true },
  xAxis: {
    type: 'category',
    axisLabel: {
      formatter(value) {
        return dayjs(value).format('MM/DD')
      }
    },
    boundaryGap: ['20%', '20%']
  },
  yAxis: { type: 'value', boundaryGap: [0, '100%'] },
  dataZoom: [
    { type: 'slider', start: 0, end: 100 },
    { type: 'inside', start: 0, end: 100 }
  ]
}

/**
 * 总计数据
 * @returns
 */
function usePageService() {
  const [summary, setSummary] = useState<StatisticsCountOutputDto>({
    orderCount: 0, // 今日成交订单量
    perCustomerTransaction: 0 /** 成交客单价 */,
    refundOrderCount: 0, // 售后订单数
    saleAmount: 0 /** 今日营业额 */,
    userCount: 0 // 新增用户数
  })

  // useEffect(() => {
  //   getSummary()
  // }, [])

  async function getSummary() {
    const { data = {} } = await api['/admin/mall/statistics/statisticsInfo_GET']()
    setSummary((pre) => ({ ...pre, ...data }))
  }

  return { summary }
}

function useQuery() {
  const [value, setValue] = useState(7)
  const [type, setType] = useState(undefined)

  const [quickConditions] = useState(() => {
    const FORMAT = 'YYYY-MM-DD HH:mm:ss'
    const now = dayjs().endOf('day')
    return [
      {
        label: '最近一周',
        value: 7,
        times: [now.subtract(6, 'day').startOf('day').format(FORMAT), now.format(FORMAT)]
      },
      {
        label: '最近30天',
        value: 30,
        times: [now.subtract(1, 'month').startOf('day').format(FORMAT), now.format(FORMAT)]
      },
      {
        label: '最近三个月',
        value: 90,
        times: [now.subtract(3, 'month').startOf('day').format(FORMAT), now.format(FORMAT)]
      }
    ]
  })

  const queryParams = useMemo(() => {
    const { times } = quickConditions.find((item) => item.value === value)!
    return {
      beginTime: times[0],
      endTime: times[1],
      orderChannelType: type
    }
  }, [value, quickConditions, type])

  const handleChange = (event: RadioChangeEvent) => {
    const value = event.target.value
    setValue(value)
  }

  const handleSelect = setType

  return {
    value,
    type,
    queryParams,
    quickConditions,
    handleChange,
    handleSelect
  }
}

/** 营业额 */
function useSaleAmountChart(params: any) {
  const chartRef = useRef<IChartContainerRef>(null)
  const optionRef = useRef<any>({})
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(false)

  // useEffect(() => {
  //   getData(params)
  // }, [params])

  async function getData(params) {
    setLoading(true)
    try {
      const { data = {} } = await api['/admin/mall/statistics/graphSaleAmountStatistics_GET'](params)
      const { count = 0, series = [] } = data

      const seriesData: any[][] = series.map((item) => {
        return [item.label, item.value]
      })

      setCount(count)
      optionRef.current = {
        ...commonChartOption,
        series: [
          {
            name: '营业额',
            type: 'line',
            data: seriesData,
            color: '#51d351'
          }
        ]
      }
      chartRef.current!.setOption(optionRef.current)
    } catch (error) {}
    setLoading(false)
  }

  return {
    loading,
    count,
    chartRef,
    optionRef
  }
}

/** 成交订单量 */
function useOrderChart(params) {
  const chartRef = useRef<IChartContainerRef>(null)
  const optionRef = useRef<any>({})
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(false)

  // useEffect(() => {
  //   getData(params)
  // }, [params])

  async function getData(params) {
    setLoading(true)
    try {
      const { data = {} } = await api['/admin/mall/statistics/graphOrderCountStatistics_GET'](params)
      const { count = 0, series = [] } = data

      const seriesData: any[][] = series.map((item) => {
        return [item.label, item.value]
      })

      setCount(count)

      optionRef.current = {
        ...commonChartOption,
        series: [
          {
            name: '成交订单量',
            type: 'bar',
            data: seriesData,
            barWidth: 10,
            color: '#409eff'
            // data: data
          }
        ]
      }
      chartRef.current!.setOption(optionRef.current)
    } catch (error) {}
    setLoading(false)
  }

  return {
    loading,
    count,
    chartRef,
    optionRef
  }
}

/** 新增用户数量 */
function useNewUserChart(params: any) {
  const chartRef = useRef<IChartContainerRef>(null)
  const optionRef = useRef<any>({})
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(false)

  // useEffect(() => {
  //   getData(params)
  // }, [params])

  async function getData(params) {
    setLoading(true)
    try {
      const { data = {} } = await api['/admin/mall/statistics/graphUserCountStatistics_GET'](params)
      const { count = 0, series = [] } = data

      const seriesData: any[][] = series.map((item) => {
        return [item.label, item.value]
      })

      setCount(count)
      optionRef.current = {
        ...commonChartOption,
        series: [
          {
            name: '新增用户数量',
            type: 'bar',
            data: seriesData,
            barWidth: 8,
            color: '#ff7a8c'
          }
        ]
      }
      chartRef.current!.setOption(optionRef.current)
    } catch (error) {}
    setLoading(false)
  }

  return {
    loading,
    count,
    chartRef,
    optionRef
  }
}
