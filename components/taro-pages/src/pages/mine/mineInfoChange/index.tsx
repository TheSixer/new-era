import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { api } from '@wmeimob/taro-api'
import { MemberOutputDto } from '@wmeimob/taro-api/src/request/data-contracts'
import { PageContainer, useToast } from '@wmeimob/taro-design'
import MMButton from '@wmeimob/taro-design/src/components/button'
import MMFeild from '@wmeimob/taro-design/src/components/feild'
import MMForm from '@wmeimob/taro-design/src/components/form'
import { IMMFormInstance } from '@wmeimob/taro-design/src/components/form/const'
import MMNavigation from '@wmeimob/taro-design/src/components/navigation'
import { useSuperLock } from '@wmeimob/utils/src/hooks/useSuperLock'
import { FC, memo, useRef, useState } from 'react'
import ChangePhone from './components/changePhone'
import styles from './index.module.less'
import { MMButtonType } from '@wmeimob/taro-design/src/components/button/const'

interface IMineInfoChangeProps {
  service: ReturnType<typeof useService>
}

const Component: FC<IMineInfoChangeProps> = (props) => {
  const { editInfo, setEditInfo, alterType, formRef, loading, handleSave, handleGetCode } = props.service

  const title = { [EAlterType.Name]: '变更昵称', [EAlterType.Phone]: '修改手机号' }[alterType]

  return (
    <PageContainer className={styles.mineInfoChangeStyle} noPlace>
      <MMNavigation title={title} />

      {/* 修改昵称 */}
      {alterType === EAlterType.Name && (
        <MMForm ref={formRef}>
          <MMFeild
            name="nickName"
            value={editInfo.nickName || ''}
            valueAlign="left"
            placeholder="请输入昵称"
            fieldProps={{ type: 'nickname' }}
            allowClear
            onChange={(nickName) => setEditInfo((pre) => ({ ...pre, nickName }))}
            rules={[
              {
                validate(_r, value) {
                  if (!value?.trim()) {
                    return Promise.reject(new Error('请输入昵称'))
                  } else if (value.length > 50 || value.length < 2) {
                    return Promise.reject(new Error('只能输入2~50个字符'))
                  } else if (!/^[a-zA-Z\d\u4e00-\u9fa5]+$/.test(value)) {
                    return Promise.reject(new Error('不能包含特殊符号'))
                  }
                  return Promise.resolve(true)
                }
              }
            ]}
          />
        </MMForm>
      )}

      {/* 修改手机号 */}
      {alterType === EAlterType.Phone && <ChangePhone ref={formRef} currentPhone={editInfo.mobile || ''} onGetCode={handleGetCode} />}

      <View className={styles.footBtn}>
        <MMButton loading={loading} block onClick={handleSave} style={{ width: 155 }}>
          确定
        </MMButton>
      </View>
    </PageContainer>
  )
}

const MineInfoChangePage = memo(Component)
export default MineInfoChangePage

/**
 * 修改类型
 */
export enum EAlterType {
  /** 名称 */
  Name = 'name',

  /** 手机号 */
  Phone = 'phone'
}

interface IUseServiceOption {
  /** 修改类型 */
  alterType: EAlterType
  /** 当前用户信息 */
  user?: MemberOutputDto
}

export function useService(option: IUseServiceOption) {
  const { alterType } = option

  const [toast] = useToast()

  const formRef = useRef<IMMFormInstance>(null)

  // 编辑信息对象
  const [editInfo, setEditInfo] = useState<MemberOutputDto>({ ...option.user })

  /**
   * 点击获取手机验证码
   */
  const handleGetCode = async (mobile: string) => {
    if (!mobile) {
      toast?.message('请输入正确的手机号')
      throw new Error('')
    }
    await api['/wechat/api/sms/sendCode_GET']({ mobile })
    Taro.showToast({ title: '验证码已发送' })
  }

  /**
   * 点击确定修改
   *
   */
  const [handleSave, loading] = useSuperLock(async () => {
    try {
      const values = await formRef.current!.validateFields()
      try {
        if (alterType === EAlterType.Name) {
          await api['/wechat/web/member/saveUserInfo_PUT'](values)
        }
        if (alterType === EAlterType.Phone) {
          await api['/wechat/web/member/updateMobile_PUT']({
            mobile: values.newPhone,
            code: values.currentCode
          })
        }
        toast?.success({ message: '更新成功', duration: 1000 }, () => {
          Taro.navigateBack()
        })
      } catch (error) {}
    } catch (error) {
      console.log(error)
      toast?.message(error)
    }
  })

  return {
    alterType,
    formRef,
    loading,
    editInfo,
    setEditInfo,
    handleSave,
    handleGetCode
  }
}
