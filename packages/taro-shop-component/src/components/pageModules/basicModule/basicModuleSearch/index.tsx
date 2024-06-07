import { routeNames } from '../../../../routes'
import { navByLink } from '../../utils'
import { EJumpType } from '@wmeimob-modules/decoration-data/src/enums/EJumpType'
import { DecorationModuleSearch } from '@wmeimob-modules/decoration-taro'
import { memo, useCallback, FC } from 'react'

/**
 *  搜索框组件
 *
 * @param {*} props
 * @return {*}
 */
const Component: FC<any> = (props) => {
  const handleNavClick = useCallback((keyword: string) => {
    navByLink(EJumpType.SystemPage, { path: routeNames.goodsSearch }, { keyword })
  }, [])

  return <DecorationModuleSearch {...props} onClick={handleNavClick} />
}

const BasicModuleSearch = memo(Component)
export default BasicModuleSearch
