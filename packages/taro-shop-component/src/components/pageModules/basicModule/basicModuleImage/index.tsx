import { useContext, FC } from 'react'
import { navByLink } from '../../utils'
import { PageContext } from '../../const'
import DecorationBasicModuleImage from '@wmeimob-modules/decoration-taro/src/components/basicModuleImage'
import { BasicModuleImageDTO } from '@wmeimob-modules/decoration-data'

interface IBasicModuleImageProps extends BasicModuleImageDTO {}

const Component: FC<IBasicModuleImageProps> = (props) => {
  const { pageType, pageParams } = useContext(PageContext)

  return (
    <DecorationBasicModuleImage
      {...props}
      onLinkJump={(link) => {
        navByLink(link.type, link.content, { pageType, pageParams })
      }}
    />
  )
}

const BasicModuleImage = Component
export default BasicModuleImage
