import { FC, memo } from 'react'
import { ProFormSelect, ProFormCascader, ProFormDigit, ProFormRadio } from '@ant-design/pro-form'
import ProFormInfo from '@wmeimob/backend-pro/src/components/form/proFormInfo'
import ProFormLimitInput from '@wmeimob/backend-pro/src/components/form/proFormLimitInput'
import { Form } from 'antd'
import ImageList from '../imageList'
import CoverVideo from '../coverVideo'
import { OGoodScore } from '../../../../../enums/good/EGoodScore'
import { getGlobalData } from '@wmeimob/backend-store'
import useStepOne from '../../hooks/useStepOne'

const { config } = getGlobalData('systemConfig')

const Component: FC = () => {
  const { getClassify, getExpress, classsifyRule } = useStepOne()

  return (
    <>
      <ProFormInfo label="商品编号" name="goodsNo" info="系统自动生成" />

      <ProFormLimitInput label="商品名称" name="goodsName" maxLength={20} rules={[{ required: true, message: '请输入商品名称' }]} />

      <ProFormCascader label="商品分类" name="classifyIds" request={getClassify} rules={classsifyRule} />

      <Form.Item label="封面视频" name="videoUrl" hidden={!config.enableGoodsDetailBannerVideo}>
        <CoverVideo maxDuration={20} maxSize={10} />
      </Form.Item>

      <Form.Item label="封面图片" name="coverImg" rules={[{ required: true, message: '请至少选择一张图片' }]}>
        <ImageList multiple={false} />
      </Form.Item>

      <Form.Item label="商品图片" name="bannerImgs" rules={[{ required: true, message: '请至少选择一张图片' }]}>
        <ImageList />
      </Form.Item>

      <ProFormSelect label="运费模板" name="expressTemplateId" request={getExpress} rules={[{ required: true, message: '请选择运费模板' }]} />

      <ProFormDigit label="排序值" name="sort" min={1} max={99999} fieldProps={{ precision: 0 }} />

      <ProFormRadio.Group label="使用积分" name="useScore" options={OGoodScore} rules={[{ required: true }]} hidden={!config.enableScore} />
    </>
  )
}

const StepOne = memo(Component)
export default StepOne
