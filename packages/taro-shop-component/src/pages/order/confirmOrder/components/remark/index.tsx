import Taro from '@tarojs/taro'
import { memo, FC } from 'react'
import { IRemarkProps } from './const'
import MMFeild from '@wmeimob/taro-design/src/components/feild'
import { useAtom, useAtomValue } from 'jotai'
import { disableInputAtom, remarkAtom } from '../../store'
import MMCell from '@wmeimob/taro-design/src/components/cell'
import styles from './index.module.less'
import { View } from '@tarojs/components'

const Component: FC<IRemarkProps> = () => {
  const [remark, setRemark] = useAtom(remarkAtom)
  const disabled = useAtomValue(disableInputAtom)

  return (
    <MMCell title={<View>订单备注</View>}>
      <MMFeild value={remark} onChange={(ev) => setRemark(ev)} noStyle fieldProps={{ maxlength: 50, placeholderClass: styles.input, disabled, placeholder: '输入内容' }} />
    </MMCell>
  )
}

const Remark = memo(Component)
export default Remark
