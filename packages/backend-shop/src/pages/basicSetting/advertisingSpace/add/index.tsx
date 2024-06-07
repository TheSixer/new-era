import { FC, memo, useEffect } from 'react'
import { Card, Button, message } from 'antd'
import { OAdvertisingPosition } from '@wmeimob/shop-data/src/enums/EAdvertisingPosition'
import { useForm } from 'antd/es/form/Form'
import { api } from '~/request'
import { history } from 'umi'
import { EJumpType } from '~/components/jumpType/enums/EJumpType'
import { PageContainer } from '@ant-design/pro-layout'
import ProForm, { ProFormCheckbox, ProFormDigit, ProFormRadio } from '@ant-design/pro-form'
import ProFormLimitInput from '@wmeimob/backend-pro/src/components/form/proFormLimitInput'
import ProFormMaterial from '@wmeimob/backend-pages/src/components/form/proFormMaterial'
import ProFormJumpType from '~/components/proComponents/form/proFormJumpType'
import mmFormRule from '@wmeimob/form-rules'
import { systemConfig } from '~/config'
import { useSuperLock } from '@wmeimob/utils/src/hooks/useSuperLock'
const { advertiseConfig } = systemConfig

export interface IPageProps {}

const Component: FC<IPageProps> = () => {
  const [form] = useForm()
  const { id }: any = history.location.query || {}

  useEffect(() => {
    if (id) {
      api['/admin/mall/banner/get/{id}_GET'](id).then(({ data = {} }) => {
        const position = (data.position || '').split(',')
        const jumpType = data.urlType ? { type: data.urlType, content: JSON.parse(data.url!) } : {}

        form.setFieldsValue({
          name: data.name,
          imgUrl: data.imgUrl,
          position,
          jumpType,
          sort: data.sort,
          showStatus: data.showStatus
        })
      })
    }
  }, [])

  const [handleSaveClick] = useSuperLock(async (values) => {
    const { jumpType, position = [], ...rest } = values

    const data: any = {
      ...rest,
      position: position.join(',')
    }

    if (jumpType) {
      data.url = JSON.stringify(jumpType.content)
      data.urlType = jumpType.type
    }

    try {
      if (id) {
        data.id = id
        await api['/admin/mall/banner/update_PUT'](data)
      } else {
        await api['/admin/mall/banner/add_POST'](data)
      }
      message.success('保存成功')
      history.goBack()
    } catch (error) {
      message.success('保存失败')
    }
  })

  return (
    <PageContainer title={`${id ? '编辑' : '新增'}广告位`}>
      <Card>
        <ProForm
          initialValues={{
            showStatus: 0,
            jumpType: { type: EJumpType.None, content: {} }
          }}
          form={form}
          layout="horizontal"
          labelCol={{ style: { width: 100 } }}
          wrapperCol={{ span: 6 }}
          onFinish={handleSaveClick}
          submitter={{
            resetButtonProps: false,
            render: (props, doms) => {
              return [
                ...doms,
                <Button onClick={() => history.goBack()} key="edit">
                  返回
                </Button>
              ]
            }
          }}
        >
          <ProFormLimitInput label="广告名称" name="name" rules={mmFormRule.required} maxLength={20} />

          <ProFormMaterial label="广告图" name="imgUrl" rules={mmFormRule.required} fieldProps={{ measure: advertiseConfig.measure }} />

          <ProFormCheckbox.Group label="显示位置" name="position" rules={mmFormRule.required} options={OAdvertisingPosition} />

          <ProFormDigit label="排序" name="sort" rules={mmFormRule.required} fieldProps={{ precision: 0, min: 0, max: 9999 }} />

          <ProFormRadio.Group
            label="显示状态"
            name="showStatus"
            rules={mmFormRule.required}
            options={[
              { label: '显示', value: 1 },
              { label: '不显示', value: 0 }
            ]}
          />

          <ProFormJumpType label="跳转类型" name="jumpType" />
        </ProForm>
      </Card>
    </PageContainer>
  )
}

const AdvertisingSpaceAdd = memo(Component)
export default AdvertisingSpaceAdd
