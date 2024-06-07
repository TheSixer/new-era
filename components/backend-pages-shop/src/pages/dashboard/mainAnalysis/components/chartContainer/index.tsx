import { forwardRef, memo, useEffect, useImperativeHandle, useRef } from 'react'
import styles from './index.module.less'
import { IChartContainerProps } from './const'
import * as echarts from 'echarts'

export type IChartContainerRef = Pick<echarts.ECharts, 'setOption'>

const Component = forwardRef<IChartContainerRef, IChartContainerProps>((props, ref) => {
  const chartRef = useRef<HTMLDivElement>(null)
  const echartsRef = useRef<echarts.ECharts>()

  useImperativeHandle(
    ref,
    () => ({
      setOption: (...args: any) => {
        echartsRef.current!.setOption(...args)
        echartsRef.current?.resize()
      }
    }),
    []
  )

  useEffect(() => {
    echartsRef.current = echarts.init(chartRef.current!)

    const listener = () => echartsRef.current?.resize()

    window.addEventListener('resize', listener)

    return () => {
      echartsRef.current?.dispose()
      window.removeEventListener('resize', listener)
    }
  }, [])

  return <div ref={chartRef} className={styles.chartContainerStyle} />
})

const ChartContainer = memo(Component)
export default ChartContainer
