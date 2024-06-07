import { Radio, RadioGroupProps } from 'antd'
import { isNumber } from 'lodash-es'
import { FC, memo, useMemo } from 'react'
import styles from './index.module.less'

interface IButtonRadioWithTextItemProps extends Pick<RadioGroupProps, 'value' | 'onChange'> {
  /** 是否显示tip */
  showTip?: boolean
  /** 选项 */
  options: { label: string; value: any; tip?: string }[]
}

const { Group: RadioGroup } = Radio

const Component: FC<IButtonRadioWithTextItemProps> = (props) => {
  const { value, showTip = true, options = [], onChange } = props

  const tip = useMemo(() => {
    const result = options.find((item) => item.value === value)
    if (!result || !showTip) {
      return ''
    }

    return result.tip !== undefined ? result.tip : isNumber(result.value) ? `${result.value}px` : result.value
  }, [value, options, showTip])

  return (
    <div className={styles.buttonRadioWithTextItemStyle}>
      <span className={styles.text}>{tip}</span>
      <RadioGroup value={value} size="small" optionType="button" options={options} onChange={onChange} />
    </div>
  )
}

Component.displayName = 'ButtonRadioWithTextItem'

const ButtonRadioWithTextItem = memo(Component)
export default ButtonRadioWithTextItem
