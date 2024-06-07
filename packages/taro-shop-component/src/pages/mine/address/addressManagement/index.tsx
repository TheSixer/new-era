import Taro from '@tarojs/taro'
import { useRef, FC, memo, useEffect, useState } from 'react'
import { View } from '@tarojs/components'
import styles from './index.module.less'
import { IAddressInfo, IAddressManagementProps } from './const'
import MMNavigation from '@wmeimob/taro-design/src/components/navigation'
import MMFeild from '@wmeimob/taro-design/src/components/feild'
import { useAtom } from 'jotai'
import { addressAtom } from './store'
import MMButton from '@wmeimob/taro-design/src/components/button'
import MMFixFoot from '@wmeimob/taro-design/src/components/fix-foot'
import { api } from '@wmeimob/taro-api'
import MMForm from '@wmeimob/taro-design/src/components/form'
import { IMMFormInstance } from '@wmeimob/taro-design/src/components/form/const'
import { IFeildProps } from '@wmeimob/taro-design/src/components/feild/const'
import { PageContainer, useToast } from '@wmeimob/taro-design'
import { useSuperLock } from '@wmeimob/utils/src/hooks/useSuperLock'
import { isMobilePhone } from '@wmeimob/utils/src/validate'
import useWeixinAddressService from './useWeixinAddressService'

const weixinStyle = { width: 20, height: 20 }

const Component: FC<IAddressManagementProps> = () => {
  const [address, setAddress] = useAtom(addressAtom) // 地址状态

  const formRef = useRef<IMMFormInstance>(null)
  const { nameFeildProps, mobileFeildProps, cityFeildProps, addressFeildProps, updateInputValue, addressInfo } = useFormService()
  const [toast] = useToast()
  const { getWxAddress } = useWeixinAddressService() // 微信收货地址

  useEffect(() => {
    if (address.id) {
      updateInputValue({
        mobile: address.mobile,
        name: address.name,
        defaulted: address.defaulted,
        address: address.address,
        addArr: [
          { id: `${address.provinceId}`, text: address.province },
          { id: `${address.cityId}`, text: address.city },
          { id: `${address.districtId || ''}`, text: address.district } // 存在无区级的城市
        ].filter((item) => !!item.id)
      })
    }
  }, [])

  useEffect(() => {
    return () => {
      setAddress({}) // 清空状态数据
    }
  }, [])

  const [handleSave] = useSuperLock(async () => {
    try {
      const { addArr, ...rest } = await formRef.current!.validateFields()
      toast?.loading()
      const [province, city, district] = addArr

      const data: any = {
        ...rest,
        province: province.text,
        provinceId: province.id,
        city: city.text,
        cityId: city.id,
        district: district?.text || '',
        districtId: district?.id || '' // 存在无区级的城市
      }

      try {
        if (address.id) {
          data.id = address.id
          await api['/wechat/mall/address/update_POST'](data)
        } else {
          await api['/wechat/mall/address/create_POST'](data)
        }
        toast?.message(
          {
            message: address.id ? '更新成功' : '新增成功',
            mask: true
          },
          () => {
            Taro.navigateBack()
          }
        )
      } catch (error) {}
      toast?.hideLoading()
    } catch (error) {
      toast?.message(error)
    }
  })

  return (
    <PageContainer className={styles.addressManagementStyle}>
      <MMNavigation title={address.id ? '编辑收货地址' : '新增收货地址'} />
      <View style={{ marginTop: 10 }} />
      {/* {!address.id && (
        <MMCell
          icon={<Image src={weixin} style={weixinStyle} />}
          title="导入微信收货地址"
          arrow
          style={{ marginBottom: 10 }}
          onClick={async () => {
            const wxAddress = await getWxAddress()

            // 没选地址直接取消
            if (!Object.keys(wxAddress).length) return

            toast?.message('导入成功，请核对地址信息')
            updateInputValue(wxAddress)
          }}
        />
      )} */}

      <MMForm ref={formRef}>
        <MMFeild
          label="收件人"
          labelStyle={{ width: 70 }}
          name="name"
          value={addressInfo.name}
          required={false}
          valueAlign="left"
          border
          {...nameFeildProps}
          onChange={(name) => updateInputValue({ name })}
        />

        <MMFeild
          label="联系电话"
          labelStyle={{ width: 70 }}
          name="mobile"
          type="mobile"
          required={false}
          valueAlign="left"
          border
          value={addressInfo.mobile}
          {...mobileFeildProps}
          onChange={(mobile) => updateInputValue({ mobile })}
        />

        <MMFeild.CityPicker
          {...cityFeildProps}
          label="收货地区"
          labelStyle={{ width: 70 }}
          name="addArr"
          required={false}
          valueAlign="left"
          border
          value={addressInfo.addArr}
          placeholder="省市区"
          suffix
          onChange={(addArr) => {
            updateInputValue({ addArr })
          }}
        />

        <MMFeild
          {...addressFeildProps}
          label="详细地址"
          labelStyle={{ width: 70 }}
          name="address"
          required={false}
          valueAlign="left"
          value={addressInfo.address}
          placeholder="请输入详细地址"
          onChange={(val) => {
            updateInputValue({ address: val })
          }}
        />

        <View style={{ marginTop: 10 }} />

        <MMFeild.Switch
          label="设为默认地址"
          name="defaulted"
          checked={addressInfo.defaulted}
          onChange={(defaulted) => {
            updateInputValue({ defaulted })
          }}
        />
      </MMForm>

      <MMFixFoot>
        <MMButton block onClick={() => handleSave()}>
          保存
        </MMButton>
      </MMFixFoot>
    </PageContainer>
  )
}

const AddressManagement = memo(Component)
export default AddressManagement

/** 表单业务 */
function useFormService() {
  const [addressInfo, setAddressInfo] = useState<IAddressInfo>({
    mobile: '',
    name: '',
    defaulted: false,
    address: '',
    addArr: []
  })

  const [nameFeildProps] = useState<Partial<IFeildProps>>({
    fieldProps: {
      maxlength: 10
    },
    rules: [
      {
        required: true,
        validate(_r, value) {
          return Promise.resolve(true)
        }
      }
    ]
  })

  const [mobileFeildProps] = useState<Partial<IFeildProps>>({
    rules: [
      {
        required: true,
        validate(_r, value) {
          if (!isMobilePhone(value)) {
            return Promise.reject(new Error('请输入正确的手机号码'))
          }
          return Promise.resolve(true)
        }
      }
    ]
  })

  const [cityFeildProps] = useState<Partial<IFeildProps>>({
    rules: [
      {
        required: true,
        message: '请选择城市'
      }
    ]
  })

  const [addressFeildProps] = useState<Partial<IFeildProps>>({
    fieldProps: {
      maxlength: 200
    },
    rules: [
      {
        required: true,
        validate(_r, value) {
          if (value.length < 4) {
            return Promise.reject(new Error('请输入正确的收货地址。长度大于4'))
          }
          return Promise.resolve(true)
        }
      }
    ]
  })

  const updateInputValue = (data) => setAddressInfo((pre) => ({ ...pre, ...data }))

  return { nameFeildProps, mobileFeildProps, cityFeildProps, addressFeildProps, addressInfo, updateInputValue }
}
