import { Checkbox, Select, Spin } from 'antd'
import { FC, memo, useEffect, useMemo, useState } from 'react'
import { useSkuService } from '../../store'

interface ISkuListProps {
  value?: any[]

  pid: any

  onChange?(data: any[]): void
}

const Component: FC<ISkuListProps> = (props) => {
  const { pid, ...checkProps } = props
  const { getSKu, skuListMap, setSkuListMap } = useSkuService()

  const [spinning, setSpinning] = useState(true)
  const options = useMemo(() => skuListMap[pid] || [], [pid, skuListMap])

  useEffect(() => {
    const fn = async () => {
      try {
        const list = await getSKu(pid)
        setSkuListMap((pre) => ({ ...pre, [pid]: list }))
      } catch (error) {}
      setSpinning(false)
    }
    fn()
  }, [])

  return (
    <Spin spinning={spinning}>
      <Select {...checkProps} mode="multiple" showSearch={false} options={options} />
    </Spin>
  )
}

Component.displayName = 'SkuList'

const SkuList = memo(Component)
export default SkuList
