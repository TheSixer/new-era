import { ImageLinkDataDTO } from '@wmeimob-modules/decoration-data'
import { EJumpLinkMode } from '@wmeimob-modules/decoration-data/src/enums/EJumpLinkMode'
import { EJumpType } from '@wmeimob-modules/decoration-data/src/enums/EJumpType'
import { FC, memo, useMemo } from 'react'
import HotZoneModal from '../../hot-zone'
// FIXME: 这里引用了外部的东西
import JumpType from '~/components/jumpType'

interface IJumpModeSelectProps {
  value?: ImageLinkDataDTO

  onChange?: any
}

const Component: FC<IJumpModeSelectProps> = (props) => {
  // 通过解构定义defaultProps
  const {
    value = {
      jumpMode: EJumpLinkMode.Link,
      url: '',
      link: {
        type: EJumpType.None,
        content: ''
      },
      hotZones: []
    },
    onChange
  } = props

  const jumpValue = useMemo(() => {
    const { link } = props.value!
    return { type: link.type, content: link.content ? JSON.parse(link.content) : {} }
  }, [props.value?.link])

  return (
    <div>
      {value.jumpMode === EJumpLinkMode.Link ? (
        <JumpType value={jumpValue} onChange={(link) => onChange({ ...value, link: { type: link.type, content: JSON.stringify(link.content) } })} />
      ) : (
        <HotZoneModal value={value.hotZones || []} img={value.url} onChange={(hotZones) => onChange({ ...value, hotZones })} />
      )}
    </div>
  )
}

Component.displayName = 'JumpModeSelect'

const JumpModeSelect = memo(Component)
export default JumpModeSelect
