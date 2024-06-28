import { PageContainer } from '@ant-design/pro-layout'
import {
  CommentSetting,
  NewcomerCouponSetting,
  OrderPresentSetting,
  OrderSetting,
  PayAmountRateSetting,
  // RefundReasonsSetting,
  ScoreGlobalSetting,
  UserAgreement
} from '@wmeimob/backend-pages-shop/src/pages/shopSetting/setting'
import { EAgreementType } from '@wmeimob/shop-data/src/enums/EAgreementType'
import { Card, Space, Tabs } from 'antd'
import { FC, memo } from 'react'
import { history } from 'umi'
import { routeNames } from '~/routes'
import { ETabType, IPageProps, MTabType } from './const'
import { ETypeEnum } from '@wmeimob/backend-pages-shop/src/pages/shopSetting/setting/components/userAgreement/const'

const Component: FC<IPageProps> = (props) => {
  const disabled = false

  const tabs = [
    // 基础设置
    {
      key: ETabType.Basic,
      modules: (
        <>
          {/* <OrderSetting disabled={disabled} />
          <CommentSetting disabled={disabled} />
          <OrderPresentSetting disabled={disabled} />
          <NewcomerCouponSetting disabled={disabled} /> */}
          {/* <RefundReasonsSetting disabled={disabled} /> */}
          <UserAgreement
            key="user"
            type={EAgreementType.User}
            disabled={disabled}
            onShowLogClick={() => history.push({ pathname: routeNames.basicSettingSettingAgreementLogs, query: { type: EAgreementType.User as any } })}
          />
          <UserAgreement
            key="privacy"
            type={EAgreementType.Privacy}
            disabled={disabled}
            onShowLogClick={() => history.push({ pathname: routeNames.basicSettingSettingPrivacyLogs, query: { type: EAgreementType.Privacy as any } })}
          />
          <UserAgreement
            key="privacy"
            type={EAgreementType.Promise}
            disabled={disabled}
            onShowLogClick={() => history.push({ pathname: routeNames.basicSettingSettingPrivacyLogs, query: { type: EAgreementType.Promise as any } })}
          />
        </>
      )
    }

    // // 积分设置
    // {
    //   key: ETabType.Score,
    //   modules: (
    //     <>
    //       <ScoreGlobalSetting disabled={disabled} />
    //       <PayAmountRateSetting />
    //     </>
    //   )
    // }
  ]

  return (
    <PageContainer>
      <Card>
        <Tabs defaultActiveKey={ETabType.Basic} size="large" type="card">
          {tabs.map((tab) => (
            <Tabs.TabPane tab={MTabType[tab.key]} key={tab.key}>
              <Space direction="vertical" style={{ width: '100%' }}>
                {tab.modules}
              </Space>
            </Tabs.TabPane>
          ))}
        </Tabs>
      </Card>
    </PageContainer>
  )
}

Component.displayName = 'BasicSetting'

const BasicSetting = memo(Component)
export default BasicSetting
