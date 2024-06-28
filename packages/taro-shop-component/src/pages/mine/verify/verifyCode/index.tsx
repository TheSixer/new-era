import { FC, memo, useRef, useState } from 'react'
import styles from './index.module.less'
import MMNavigation from '@wmeimob/taro-design/src/components/navigation'
import { IVerifyProps } from './const'
import { View, Image, Text, Button } from '@tarojs/components'
import { MMFeild, MMForm, PageContainer, useToast } from '@wmeimob/taro-design'
import { IFeildProps } from '@wmeimob/taro-design/src/components/feild/const'
import { IMMFormInstance } from '@wmeimob/taro-design/src/components/form/const'
import Taro from '@tarojs/taro'
import MMButton from '@wmeimob/taro-design/src/components/button'
import { useSuperLock } from '@wmeimob/utils/src/hooks/useSuperLock'
import { api } from '@wmeimob/taro-api'
import LogoImg from '../../../auth/images/logo.png';
import getParamsUrl from '@wmeimob/taro-utils/src/getParamsUrl'
import { routeNames } from '../../../../routes'
import scanIcon from './icon_scan.svg'

const Components: FC<IVerifyProps> = () => {
  const [toast] = useToast()
  const [verifyCode, setVerifyCode] = useState('')
  const { fetchData } = useBasicService()

  const formRef = useRef<IMMFormInstance>(null)

  const [feildProps] = useState<Partial<IFeildProps>>({
    type: 'number',
    valueAlign: 'left',
    placeholder: '请输入',
    style: {
      paddingLeft: '30rpx',
      width: '100%',
      color: '#fff',
      border: '1px solid #767575',
      borderRadius: '20rpx',
      background: 'rgba(255,255,255,0.1)'
    }
  })

  const nameFeildProps = {
    rules: [
      {
        required: true,
        message: '请输入核销码'
      }
    ]
  }

  const jumpClick = (url?: string, params?: object) => {
    Taro.navigateTo({ url: getParamsUrl(url, params) })
  }

  const handleScan = (event: any) => {
    Taro.scanCode({
      onlyFromCamera: true,
      success: (res) => {
        if (!/^[a-zA-Z0-9]+$/.test(verifyCode)) return toast?.message('无效的核销码')
        toast?.loading()
        fetchData(res.result, (isSuccess) => {
          isSuccess && jumpClick(routeNames.mineVerifyDetail, { verifyCode: res.result })
          setVerifyCode('');
          toast?.hideLoading()
        })
      },
      fail: () => {
        toast?.message('扫码失败');
      }
    })
    event.stopPropagation()
  }

  /**
   * 点击确认
   *
   */
  const [handleSubmit, loading] = useSuperLock(async () => {
    if (!/^[a-zA-Z0-9]+$/.test(verifyCode)) return toast?.message('请输入正确的核销码')
    if (verifyCode) {
      toast?.loading()
      fetchData(verifyCode, (isSuccess) => {
        isSuccess && jumpClick(routeNames.mineVerifyDetail, { verifyCode })
        setVerifyCode('');
        toast?.hideLoading()
      })
    }
  })

  return (
    <PageContainer className={styles.prefectureStyle} noPlace>
      <MMNavigation title="活动核销" type="Transparent" />

      <View className={styles.container}>
        <Image className={styles.logo} src={LogoImg} mode='aspectFit' />

        <MMForm ref={formRef}>
          <View className={styles.form_item}>
            <MMFeild
              {...feildProps}
              {...nameFeildProps}
              className={styles.phone}
              type="custom"
              value={verifyCode}
              name="verifyCode"
              onChange={(code) => setVerifyCode(code)}
            />

            <Button className={styles.scan_btn} onClick={handleScan}>
              <Image className={styles.code_img} src={scanIcon} mode='aspectFit' />
            </Button>
          </View>
        </MMForm>

        <View className={styles.check_link}>
          <Text className={styles.check_link_text} onClick={() => jumpClick(routeNames.mineVerifyCheckList, {})}>核销记录</Text>
        </View>
      </View>

      <View className={styles.footer}>
        <MMButton disabled={!verifyCode || loading} loading={loading} block onClick={handleSubmit} className={styles.form_submit}>
          确认
        </MMButton>
      </View>
    </PageContainer>
  )
}

const SignUpPage = memo(Components)
export default SignUpPage

function useBasicService() {
  async function fetchData(verifyCode, callback?: (p?: boolean) => void) {
    try {
      await api['/wechat/activity/bookRecordDetail/check/{verifyCode}_GET']({
        verifyCode
      })
      callback?.(true);
    } catch (error) {
    }
    callback?.(false);
  }

  return { fetchData }
}
