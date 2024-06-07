import { useContext, FC, memo } from 'react'
import { navByLink } from '../utils'
import { PageContext } from '../const'
import { DecorationHotZone, IHotZoneProps } from '@wmeimob-modules/decoration-taro'
import { IHotZoneValue } from '@wmeimob-modules/decoration-data'

interface Props extends Pick<IHotZoneProps, 'data' | 'mode'> {}

const Component: FC<Props> = (props) => {
  const { pageType, pageParams } = useContext(PageContext)

  const navClick = (item: IHotZoneValue) => {
    navByLink(item.link.type, item.link.content, { pageType, pageParams })
  }

  return <DecorationHotZone {...props} onClick={navClick} />
}

const HotZone = memo(Component)
export default HotZone
