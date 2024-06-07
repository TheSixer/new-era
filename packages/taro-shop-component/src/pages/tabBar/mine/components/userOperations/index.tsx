import Taro from '@tarojs/taro'
import { memo, FC } from 'react'
import { Image } from '@tarojs/components'
import { IUserOperationsProps } from './const'
import { useService } from '@wmeimob-modules/member-taro/src/pages/cards'
import styles from './index.module.less'
import MMCell from '@wmeimob/taro-design/src/components/cell'
import icon_youhuiquan from '../../images/icon_youhuiquan.png'
import icon_shoucang from '../../images/icon_shoucang.png'
import icon_kefu from '../../images/icon_kefu.png'
import icon_protocal from '../../images/icon_protocal.png'
import icon_member from '../../images/icon_member.png'
import icon_youhuima from '../../images/icon_youhuima.png'
import icon_yinsi from '../../images/icon_yinsi.png'

import { routeNames } from '../../../../../routes'
import { ICellProps } from '@wmeimob/taro-design/src/components/cell/const'
import MMCellGroup from '@wmeimob/taro-design/src/components/cell/cell-group'
import useGlobalStore from '../../../../../globalStore'
import MMCustomerServiceButton from '../../../../../components/customerServiceButton'
import getParamsUrl from '@wmeimob/taro-utils/src/getParamsUrl'

const iconStyle = { width: 22, height: 22 }

const Component: FC<IUserOperationsProps> = (props) => {
  const { user } = useGlobalStore()

  const { cards = [], unOpenCards = [] } = useService()

  const jumpClick = (url?: string, params?: object) => {
    if (!user.mobile) {
      Taro.navigateTo({ url: routeNames.auth })
    } else if (url) {
      Taro.navigateTo({ url: getParamsUrl(url, params) })
    }
  }

  const cellProps: ICellProps = {
    border: true,
    arrow: true,
    size: 'large',
    style: { padding: '0 15px' }
  }

  return (
    <MMCellGroup className={styles.userOperationsStyle}>
      {(!!cards.length || !!unOpenCards.length) && (
        <MMCell
          {...cellProps}
          title='我的会员'
          icon={<Image src={icon_member} style={iconStyle} />}
          onClick={() => jumpClick(routeNames.memberCards)}
          border={false}
        />
      )}
      <MMCell
        {...cellProps}
        title='我的优惠券'
        icon={<Image src={icon_youhuiquan} style={iconStyle} />}
        onClick={() => jumpClick(routeNames.couponsList)}
        border={false}
      />

      <MMCell
        {...cellProps}
        title='我的收藏'
        icon={<Image src={icon_shoucang} style={iconStyle} />}
        onClick={() => jumpClick(routeNames.mineMyCollection)}
        border={false}
      />

      <MMCell {...cellProps} title='联系客服' icon={<Image src={icon_kefu} style={iconStyle} />} border={false}>
        <MMCustomerServiceButton className={styles.contactButton} />
        {/*<Button className={styles.contactButton} open-type="contact" />*/}
      </MMCell>

      <MMCell
        {...cellProps}
        title='用户协议'
        icon={<Image src={icon_protocal} style={iconStyle} />}
        onClick={() => jumpClick(routeNames.mineUserAgreement)}
        border={false}
      />

      <MMCell
        {...cellProps}
        title='隐私政策'
        icon={<Image src={icon_yinsi} style={iconStyle} />}
        onClick={() => jumpClick(routeNames.mineUserAgreement, { type: 3 })}
        border={false}
      />

      <MMCell
        {...cellProps}
        title='优惠码兑换'
        icon={<Image src={icon_youhuima} style={iconStyle} />}
        onClick={() => jumpClick(routeNames.couponsCouponCodeExchange)}
        border={false}
      />
    </MMCellGroup>
  )
}

const UserOperations = memo(Component)
export default UserOperations
