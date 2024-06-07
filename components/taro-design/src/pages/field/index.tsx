import { CSSProperties, memo, useState } from 'react'
import { View } from '@tarojs/components'
import MMNavigation from '../../components/navigation'
import MMFeild from '../../components/feild'
import MMPopup from '../../components/popup'
import MMButton from '../../components/button'
import MMModal from '../../components/modal'

const titleStyle: CSSProperties = {
  fontSize: '18px',
  fontWeight: 'bold',
  paddingLeft: '15px',
  paddingBottom: '10px'
}

const Component = () => {
  return (
    <View>
      <MMNavigation>Field 输入框</MMNavigation>
      <NormalFeild />

      <NumberFeild />

      <CityFeild />
    </View>
  )
}

const FieldPage = memo(Component)
export default FieldPage

function NormalFeild() {
  const [text, setText] = useState('')

  return (
    <>
      <View className="spacing" />
      <MMFeild label="普通输入框" name="NormalFeild" value={text} onChange={setText} />
    </>
  )
}

function NumberFeild() {
  const [amount, setAmount] = useState('123')

  return (
    <>
      <View className="spacing" />
      <MMFeild
        label="退款金额"
        name="refundAmount"
        value={amount}
        type="digit"
        onChange={(value) => {
          setAmount(value)
        }}
      />
    </>
  )
}

/**
 * 城市选择
 *
 * @return {*}
 */
function CityFeild() {
  const [addressInfo, setAddressInfo] = useState({
    mobile: '',
    name: '',
    defaulted: false,
    address: '',
    coords: '',
    tag: undefined,
    addArr: []
  })

  const updateInputValue = (data) => setAddressInfo((pre) => ({ ...pre, ...data }))

  return (
    <>
      <View className="spacing" />
      <View style={titleStyle}>选择城市</View>
      <MMFeild.CityPicker label="城市选择" name="addArr" value={addressInfo.addArr} onChange={(addArr) => updateInputValue({ addArr })} />

      <MMFeild
        label="详细地址"
        labelStyle={{ width: 70 }}
        name="address"
        required={false}
        rules={[
          {
            required: true,
            validate(_r, value) {
              if (value.length < 4) {
                return Promise.reject(new Error('请输入正确的收货地址。长度大于4'))
              }
              return Promise.resolve(true)
            }
          }
        ]}
        value={addressInfo.address}
        placeholder="详细地址,例如:1号楼6层601"
        onChange={(val) => {
          updateInputValue({ address: val })
        }}
      />
    </>
  )
}
