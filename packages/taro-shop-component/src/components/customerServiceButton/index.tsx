import Taro from '@tarojs/taro'
import { memo, FC } from 'react'
import { Button, View } from '@tarojs/components'
import { IMMCustomerServiceProps } from './const'
import { openCustomerService } from '../../config'

/**
 *
 * @param {*} props
 * @deprecated
 * @return {*}
 */
const Component: FC<IMMCustomerServiceProps> = (props) => {
  const { style = {}, className = '', onClick } = props

  const isH5 = process.env.TARO_ENV === 'h5'
  // console.log(isH5)
  return (
    <View>
      {openCustomerService ? (
        <Button style={style} className={className} onClick={() => (onClick ? onClick() : Taro.navigateTo({ url: '/pages/customerService/index' }))} />
      ) : (
        <Button style={style} className={className} open-type="contact" />
      )}
    </View>
  )
}

const MMCustomerServiceButton = memo(Component)
export default MMCustomerServiceButton
