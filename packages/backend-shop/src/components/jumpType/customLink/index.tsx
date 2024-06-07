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
      {/* <Descriptions {...descriptionsProps} title="H5页面" className={styles.desc}>
        <Descriptions.Item label="H5链接">
          <div>
            <Input value={value.h5 || ''} onInput={(ev) => onChange({ ...value, h5: ev.currentTarget.value || '' })} />
            <p className={styles.h5tip}>*H5链接将在微信公众号及非微信环境的渠道中生效。</p>
          </div>
        </Descriptions.Item>
      </Descriptions>
      <br /> */}
      <Descriptions {...descriptionsProps} title="小程序" className={styles.desc}>
        <Descriptions.Item label="APPID">
          <Input value={value.appId || ''} onInput={(ev) => onChange({ ...value, appId: ev.currentTarget.value || '' })} />
        </Descriptions.Item>
        <Descriptions.Item label="页面路径">
          <div>
            <Input value={value.path || ''} onInput={(ev) => onChange({ ...value, path: ev.currentTarget.value || '' })} />
            <p className={styles.h5tip}>AppID小程序仅在微信小程序中生效。</p>
          </div>
        </Descriptions.Item>
      </Descriptions>
    </div>
  )
}

Component.displayName = 'CustomLink'

const CustomLink = memo(Component)
export default CustomLink
