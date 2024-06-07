import { FC, memo } from 'react'
import styles from './index.module.less'
import { formProps, IMMGoodsCreatePageProps, IStepTwoFormDTO, TGoodData } from './const'
import { StepsForm } from '@ant-design/pro-form'
import { Card } from 'antd'
import { PageContainer } from '@ant-design/pro-layout'
import StepOne from './components/stepOne'
import { GoodsVO } from '@wmeimob/backend-api/src/request/data-contracts'
import StepTwo from './components/stepTwo'
import ProFormRichText from '@wmeimob/backend-pro/src/components/form/proFormRichText'
import { useGoodsCreateService } from './hooks/useGoodsCreateService'
import useStepsFormProps from './hooks/useStepsFormProps'

const Component: FC<IMMGoodsCreatePageProps> = (props) => {
  const { history, upload } = props

  const { submitter, handleStepTwoFormFinish } = useStepsFormProps({
    onBack: () => history.goBack()
  })

  const { loading, goodData, stepOneForm, stepTwoForm, stepThreeForm, handleStepTwoFormChange, saveGood } = useGoodsCreateService(props)

  return (
    <PageContainer className={styles.goodsDetailStyle} loading={loading}>
      <Card>
        <StepsForm<TGoodData> formProps={formProps} onFinish={saveGood} submitter={submitter}>
          <StepsForm.StepForm<GoodsVO> name="base" title="基础信息" form={stepOneForm} initialValues={goodData} wrapperCol={{ span: 8 }}>
            <StepOne />
          </StepsForm.StepForm>

          <StepsForm.StepForm<IStepTwoFormDTO>
            name="goodSku"
            title="商品规格"
            form={stepTwoForm}
            initialValues={goodData}
            onFinish={handleStepTwoFormFinish}
            onValuesChange={handleStepTwoFormChange}
          >
            <StepTwo />
          </StepsForm.StepForm>

          <StepsForm.StepForm name="goodDetail" title="商品详情" form={stepThreeForm} initialValues={goodData}>
            <ProFormRichText label="商品介绍" name="goodContet" rules={[{ required: true }]} upload={upload} />
          </StepsForm.StepForm>
        </StepsForm>
      </Card>
    </PageContainer>
  )
}

const MMGoodsCreatePage = memo(Component)
export default MMGoodsCreatePage
