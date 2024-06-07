import { forwardRef, memo, useImperativeHandle, useMemo, useRef, useState } from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import styles from './index.module.less'
import MMDialog from '@wmeimob/taro-design/src/components/dialog'
import { api } from '@wmeimob/taro-api'
import { IDialogProps } from '@wmeimob/taro-design/src/components/dialog/const'
import { useSuperLock } from '@wmeimob/utils/src/hooks/useSuperLock'
import { EAgreementType, MAgreementType } from '@wmeimob/shop-data/src/enums/EAgreementType'
import { routeNames } from '../../routes'
import { isH5, isWeapp } from '../../config'
import getParamsUrl from '@wmeimob/taro-utils/src/getParamsUrl'

/**
 * 用户协议更新弹窗
 */
interface IUserAgreementUpdateDialogProps {}

export interface IUserAgreementUpdateDialogRef {
  /**
   * 显示更新协议弹窗
   *
   * @description 如果没有未同意的则不会弹窗
   */
  showUpdateDialog: () => Promise<void>
}

const Component = forwardRef<IUserAgreementUpdateDialogRef, IUserAgreementUpdateDialogProps>((props, ref) => {
  const [agreementTypeList, setAgreementTypeList] = useState<EAgreementType[]>([])

  const useAgreementText = useMemo(() => {
    const text = `请阅读并同意平台${MAgreementType[EAgreementType.User]}和${MAgreementType[EAgreementType.Privacy]}后再使用${isWeapp ? '小程序' : '软件'}。`
    return text
  }, [agreementTypeList])

  function initDialogProps() {
    return { visible: false }
  }

  const [dialogProps, setDialogProps] = useState<IDialogProps>(initDialogProps)

  const resolveRef = useRef<any>()

  useImperativeHandle(ref, () => ({ showUpdateDialog }))

  /**
   * 显示协议更新弹窗
   * @param agreementType
   * @returns
   */
  async function showUpdateDialog() {
    console.log('showUpdateDialog')
    // 获取更新协议信息
    const { data: agreementTypeList = [] } = await api['/wechat/userAgreement/notAgreeAgreementTypeList_GET']()

    if (agreementTypeList.length) {
      setDialogProps({ visible: true })
      setAgreementTypeList(agreementTypeList)
      return new Promise<void>((resolve) => {
        resolveRef.current = resolve
      })
    }

    return Promise.resolve()
  }

  const [handleOk] = useSuperLock(async () => {
    await api['/wechat/userAgreement/userAgreeRecord/agree_PUT']({ agreementTypeList })
    setDialogProps(initDialogProps)
    resolveRef.current()
  })

  function handleCancel() {
    setDialogProps(initDialogProps)
    if (isH5) {
      Taro.redirectTo({ url: routeNames.noConsent })
    } else {
      Taro.exitMiniProgram()
    }
    resolveRef.current()
  }

  return (
    <View className={styles.userAgreementUpdateDialogStyle}>
      <MMDialog
        {...dialogProps}
        title="协议更新"
        okLoading={true}
        okText="同意"
        cancelText="拒绝"
        content={
          <View style={{ textAlign: 'left' }}>
            <View className={styles.mainText}>
              {useAgreementText}
            </View>
            <View style={{ marginTop: 15 }}>
              <View className={styles.linkContent}>
                <View
                  className={styles.linkText}
                  onClick={(ev) => {
                    ev.stopPropagation()
                    Taro.navigateTo({ url: routeNames.mineUserAgreement })
                  }}
                >
                  《{MAgreementType[EAgreementType.User]}》
                </View>
                <View>和</View>
                <View
                  className={styles.linkText}
                  onClick={(ev) => {
                    ev.stopPropagation()
                    Taro.navigateTo({ url: getParamsUrl(routeNames.mineUserAgreement, { type: EAgreementType.Privacy }) })
                  }}
                >
                  《{MAgreementType[EAgreementType.Privacy]}》
                </View>
              </View>
            </View>
          </View>
        }
        onOk={handleOk}
        onCancel={handleCancel}
      />
    </View>
  )
})

const UserAgreementUpdateDialog = memo(Component)
export default UserAgreementUpdateDialog
