import { FC, memo } from 'react'
import styles from './index.module.less'
import { ISeparatorModuleProps, getDefaultProps } from './const'
import useComponentStyle from '../../../hooks/useComponentStyle'
import { IModuleInfo, BasicModuleSignEnum } from '@wmeimob-modules/decoration-data'
import settingComponet from './settingComponet'

const Component: FC<ISeparatorModuleProps> = (props) => {
  const { height, lineHeight = 0, borderStyle, componentStyle } = props
  const { style } = useComponentStyle(componentStyle)

  return (
    <div className={styles.separatorModuleStyle} style={style}>
      <div className={styles.content} style={{ height: `${height}px` }}>
        {!!lineHeight && <div className={styles.line} style={{ borderTopWidth: `${lineHeight}px`, borderStyle }} />}
      </div>
    </div>
  )
}

Component.displayName = 'SeparatorModule'
Component.defaultProps = getDefaultProps()

const SeparatorModule = memo(Component)
export default SeparatorModule

export const moduleInfo: IModuleInfo = {
  type: BasicModuleSignEnum.Separator,
  cname: '占位分隔',
  icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALQAAABkCAYAAAAv8xodAAAAAXNSR0IArs4c6QAAA+FJREFUeAHt3b9qFEEcB/DZS1RQFEnQqNhY2SvYWChYiE/gG/gGilpYWAj6CPY+g6RQ/FMrWFqoCDYGY1DEQo+sc6QJ5zo4x+Zu5vJJ5e3szs5+ft8cy52bXwh+CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgd0g0NR8kevr6yeHv4cPQmgutm17vOZrmcnam/ChaZvHe/Yt3l5aWvo2kzX0fNJqAz0K8+9fwzfRY6lnk103XROat0ePHTnTNM3P2i9+UOsFbL0zC3Mf9WtDe3pt7cv1Puaa9RzVBnp0mzFrvHk6f7xlmwvPagPtnrnfX6emDSf6nXE2s1Ub6NlwOWvpAgJdeoWsL0tAoLO47Fy6gECXXiHryxIQ6CwuO5cuINClV8j6sgQEOovLzqULCHTpFbK+LAGBzuKyc+kCAl16hawvS0Cgs7jsXLqAQJdeIevLEhDoLC47ly5Qb6CbsFY6bmXr+1zZejuXW22g46NDLzuvyMaJBJomzIVntYEOg7034iNDPyaqnoPGBT4u7Fm4P76xxtfVBnpl5fD7wUJzNj4P91iwJ47e1/jO/OhAs//c8vLy94lnKejAah+S3W4Yn14ZbGxsHNy+zb/TAtGsnZcQp6/UKAECBAgQIECAAAECBAjsGoFiP+V4svrsSqzCwzaEk+PViB/TxT/2E16HxcWrly6dfzc+Pnr9dPXFrc3Q3gyhPTQ+7vid9xs3n9brkj+H7gzzCCZ+4jSqyNkwHN7tgnq++vzUZti81xVmx++8X1dNprWt5EBPy8B55kig5EBfi/dDn7qsR7cM8RvCV/GW407X+IXLFz4MwuB2/Pt3nd9+OX5n/bpqYhsBAgQIECBAgAABAgQIECBAgECOQLHfFP7PReiC9T9KiX10wUrgTHlIF6z+wHXB6s9y4pl0wZqY7q8DdcH6i2QWG3TB6lM9/v+Yi33ON6u5Sv7qO2kSC6BzbFIob1AXrDwvexOYikC179BT0XGS6gQEurqSWXBKQKBTOsaqExDo6kpmwSkBgU7pGKtOQKCrK5kFpwQEOqVjrDoBga6uZBacEhDolI6x6gQEurqSWXBKQKBTOsaqExDo6kpmwSmBegOtC1aqrpOM6YI1iVpfx+iC1Zfk1jy6YPXrmT+bLlj5Zv8+Qhesf9tMZ0QXrF6cdcHqhbHnSeLTK7pgZZpGM12wMs3sToAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgcoF/gA92UpLN1MZ0QAAAABJRU5ErkJggg==',
  getDefaultProps,
  settingComponet
}
