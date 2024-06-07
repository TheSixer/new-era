import { useRouter } from '@tarojs/taro'
import { FC, memo, useMemo } from 'react'
import useGlobalStore from '../../../globalStore'
import MineInfoChangePage, { useService, EAlterType } from '@wmeimob/taro-pages/src/pages/mine/mineInfoChange'

const Component: FC = () => {
  const { params } = useRouter()
  const { user } = useGlobalStore()

  const alterType = useMemo<EAlterType>(() => (params.type as any) ?? EAlterType.Name, [params.type])

  const service = useService({ alterType, user })

  return <MineInfoChangePage service={service} />
}

const Alter = memo(Component)
export default Alter
