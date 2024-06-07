import { Input, Descriptions, DescriptionsProps } from 'antd'
import { FC, memo } from 'react'
import { CustomLinkProps } from './const'
import styles from './index.module.less'

const Component: FC<CustomLinkProps> = (props) => {
  const { value, onChange } = props

  const descriptionsProps: DescriptionsProps = {
    column: 1,
    size: 'small',
    labelStyle: {
      width: 80,
      paddingRight: '8px',
      justifyContent: 'flex-end'
    },
    contentStyle: { maxWidth: 450 }
  }

  return (
    <div className={styles.component}>
      <Descriptions {...descriptionsProps} title="H5链接" className={styles.desc}>
        <Descriptions.Item label="页面地址">
          <div>
            <Input value={value.path || ''} onInput={(ev) => onChange({ ...value, path: ev.currentTarget.value || '' })} />
            <p className={styles.h5tip}>*小程序需要到公众号平台增加业务域名</p>
          </div>
        </Descriptions.Item>
      </Descriptions>
    </div>
  )
}

Component.displayName = 'H5Link'

const H5Link = memo(Component)
export default H5Link
