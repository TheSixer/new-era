import { PageContainer } from '@ant-design/pro-layout'
import PhoneDevice from '@wmeimob/backend-pro/src/components/phoneDevice'
import {
  DrayData,
  getDefaultModuleData,
  ModuleEditForm,
  ModuleSelectCard,
  ModuleView,
  StoreContext,
  useDragData,
  useStoreContextValue
} from '@wmeimob-modules/decoration-backend'
import { BasicModuleSignEnum } from '@wmeimob-modules/decoration-data'
import { Button, Card, Empty, message, Modal, Space, Spin } from 'antd'
import { FC, memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { upload } from '~/components/tencent-cloud'
import useQuery from '~/hooks/useQuery'
import { api } from '~/request'
import instance from '~/request/instance'
import UpdateDecorationModalForm from '../components/updateDecorationModalForm'
import useUpdateDecorationModalForm from '../components/updateDecorationModalForm/useUpdateDecorationModalForm'
import { useAliyunStorage } from './const'
import styles from './index.module.less'

interface IDecorationDetailProps {
}

function getDefaultData(): DrayData[] {
  return [getDefaultModuleData(BasicModuleSignEnum.Search)]
}

const Component: FC<IDecorationDetailProps> = (props) => {
  const [spinning, setSpinning] = useState(false)
  const [contextVaue, form] = useStoreContextValue({ upload })
  const [pageData, setPageData] = useState<any>({})

  const { modalProps, setVisible } = useUpdateDecorationModalForm()

  const [pageHeight, setPageHeight] = useState(300)
  const query = useQuery()
  const id = useMemo(() => query.get('id') as unknown as number, [query])
  const divRef = useRef<HTMLDivElement>(null)

  const {
    editIndex,
    editData,
    handleDelete,
    handleClickModuleItem,
    moduleData,
    setModuleData,
    handleModuleDragStart,
    handleModuleDragEnd,
    handleBodyDragEnter,
    handleBodyDragOver,
    handleBodyDragLeave,
    handleBodyDrop,
    handleModuleItemDragStart,
    handleModuleItemDragOver,
    handleModuleItemDragEnd
  } = useDragData()

  useEffect(() => {
    async function getData() {
      if (!id) {
        return
      }
      setSpinning(false)
      const { data }: any = await api['/admin/mall/page/detail_GET']({ id: id as any })
      setPageData(data)
      let content = data.content || ''

      if (/^http(s)?/.test(content)) {
        const { data } = await instance<any>({ url: content, skipInterceptor: true })
        setModuleData(data)
      } else {
        setModuleData(content ? JSON.parse(content) : getDefaultData())
      }

      setSpinning(false)
    }

    getData()
  }, [id])

  // 计算页面可用高度
  useEffect(() => {
    const { top } = divRef.current!.getBoundingClientRect()
    const pageHeight = window.innerHeight - top
    setPageHeight(pageHeight)
  }, [])

  const handleFormChange = useCallback(
    (changeData = {}) => {
      // console.log(changeData, 'changeData')
      setModuleData((pre) => {
        return pre.map((value, index) => {
          if (index === editIndex && value.data) {
            Object.keys(changeData).forEach((key) => {
              value.data[key] = changeData[key]
            })
          }
          return value
        })
      })
    },
    [editIndex]
  )

  const handleSaveClick = async () => {
    Modal.confirm({
      title: '确定替换并保存?', onOk: async () => {
        try {
          await form.validateFields()

          setSpinning(true)
          let content = ''
          if (useAliyunStorage) {
            const file = new File([JSON.stringify(moduleData)], '.json', { type: 'application/json' })
            const [result] = await upload([file])
            content = result as string
          } else {
            content = JSON.stringify(moduleData)
          }
          await api['/admin/mall/page/update_PUT']({ ...pageData, content })
          setSpinning(false)
          message.success('保存成功')
        } catch (error) {
          message.error('组件配置有误，请检查组件设置项')
        }
      }
    })
  }

  const handleModalFormFinish = async (value) => {
    try {
      const newData = { ...pageData, ...value }
      await api['/admin/mall/page/update_PUT'](newData)
      setVisible(false)
      setPageData(newData)
      message.success('修改成功')
    } catch (error) {
    }
  }

  const log = (a) => {
    console.log(a)
  }

  return (
    <PageContainer
      className={styles.decorationDetailStyle}
      title={false}
      content={
        <div className={styles.headerBar}>
          <span
            className={styles.headerBar_name}
            onClick={() => {
              modalProps.form.setFieldsValue({ name: pageData.name, title: pageData.title })
              setVisible(true)
            }}
          >
            {pageData.name}
          </span>
          <div>
            <Space>
              {/* <Button>预览</Button> */}
              <Button type='primary' onClick={handleSaveClick}>
                保存
              </Button>
            </Space>
          </div>
        </div>
      }
    >
      <div ref={divRef}>
        <Spin spinning={spinning}>
          <StoreContext.Provider value={contextVaue}>
            <div className={styles.content} style={{ height: pageHeight }}>
              <ModuleSelectCard onDragStart={handleModuleDragStart} onDragEnd={handleModuleDragEnd} />
              <div className={styles.phone}>
                <PhoneDevice>
                  <div
                    className={styles.phoneBody}
                    onDragEnter={handleBodyDragEnter}
                    onDragOver={handleBodyDragOver}
                    onDragLeave={handleBodyDragLeave}
                    onDrop={handleBodyDrop}
                  >
                    {moduleData!.map((md, index) => (
                      <div
                        key={md.id}
                        className={styles.item}
                        draggable={!md.undraggable}
                        onClick={async () => {
                          try {
                            if (index === editIndex) {
                              return
                            }
                            await form.validateFields()
                            form.resetFields()
                            handleClickModuleItem(index, md)
                          } catch (error) {
                            message.error('组件配置有误，请检查组件设置项')
                          }
                        }}
                        onDragStart={() => handleModuleItemDragStart(index)}
                        onDragOver={(ev) => handleModuleItemDragOver(ev, md, index)}
                        onDragEnd={() => handleModuleItemDragEnd()}
                      >
                        <ModuleView {...md} active={index === editIndex} onDelete={() => handleDelete(index)} />
                      </div>
                    ))}
                  </div>
                </PhoneDevice>
              </div>
              <Card title='组件设置' style={{ flex: 1 }} bodyStyle={{ height: `${pageHeight - 58}px`, overflow: 'auto' }}>
                {log(editData)}
                {editData ? (
                  <ModuleEditForm data={editData.data} type={editData.type} onChange={handleFormChange} />
                ) : (
                  <Empty description='点击左侧模块进行编辑' style={{ marginTop: 150 }} />
                )}
              </Card>
            </div>
          </StoreContext.Provider>
        </Spin>
      </div>
      <div />

      <UpdateDecorationModalForm {...modalProps} title='编辑' onFinish={handleModalFormFinish} />
    </PageContainer>
  )
}

Component.displayName = 'DecorationDetail'

const DecorationDetail = memo(Component)
export default DecorationDetail
