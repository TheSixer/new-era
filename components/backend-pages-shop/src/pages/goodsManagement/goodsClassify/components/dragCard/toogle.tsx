import { FC, useLayoutEffect, useState } from 'react'
import { message, Switch } from 'antd'
import { SwitchProps } from 'antd/es/switch'
import { useSuperLock } from '@wmeimob/utils/src/hooks/useSuperLock'
import styles from './index.module.less'

interface IProps extends Pick<SwitchProps, 'checked' | 'disabled'> {
  id: number
  onChange?: (checked: boolean) => void
}

const ToogleSwitch: FC<IProps> = (props) => {
  const [checked, setChecked] = useState(props.checked)

  const [handleChange, changeLoading] = useSuperLock(async (showStatus) => {
    // await api['/admin/admin/MallGoodsGroup/updateStatus_POST']({ id: props.id, showStatus: Number(showStatus) })
    setChecked((value) => !value)
    message.success('状态修改成功')
    props.onChange?.(showStatus)
  })

  useLayoutEffect(() => {
    setChecked(props.checked)
  }, [props.checked])

  return (
    <Switch
      className={styles.switchItem}
      disabled={props.disabled}
      checked={checked}
      loading={changeLoading}
      onChange={handleChange}
      unCheckedChildren="隐藏"
      checkedChildren="显示"
    />
  )
}

export default ToogleSwitch
