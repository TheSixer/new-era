import ProList from '@ant-design/pro-list'
import { isChinaMobilePhone } from '@wmeimob/backend-pro/src/utils/validator'
import { Button, Input, message, Space, Typography, Upload } from 'antd'
import Excel from 'exceljs'
import { FC, memo, useEffect, useMemo, useRef, useState } from 'react'

interface IGrantMobileProps {
  value?: string[]

  onChange?(data: string[]): void

  /**
   * 模板下载
   */
  onTemplateDownload(): void
}

interface IDataSource {
  title: string
  valid: boolean
}

const Component: FC<IGrantMobileProps> = (props) => {
  const { value, onChange } = props

  const [addPhone, setAddPhone] = useState('')
  const isInit = useRef(true)
  const workbook = useRef(new Excel.Workbook())

  const [dataSource, setDataSource] = useState<IDataSource[]>([])

  const validMobile = useMemo(() => dataSource.filter((it) => it.valid).map((va) => va.title), [dataSource])
  const inValidLength = useMemo(() => dataSource.length - validMobile.length, [validMobile, dataSource])

  const handleBeforeUpload = (file) => {
    const reader = new FileReader()
    reader.onload = async (ev) => {
      const wb = await workbook.current.xlsx.load(reader.result! as any)
      const worksheet = wb.getWorksheet(1)
      const row = worksheet.getColumn(1)

      const set = new Set<string>()
      row.eachCell((cell, index) => {
        if (index !== 1) {
          set.add(`${cell.value}`)
        }
      })

      // 合并导入数据
      const values = [...set]
      const filterData = dataSource.filter((it) => values.indexOf(it.title) === -1)
      const concatData = values.map((title) => ({ title, valid: isChinaMobilePhone(title) })).concat(filterData)
      setDataSource(concatData)
    }
    reader.readAsArrayBuffer(file)

    return false
  }

  useEffect(() => {
    // 初始化不触发
    if (isInit.current) {
      isInit.current = false
    } else {
      onChange?.(validMobile)
    }
  }, [validMobile])

  return (
    <div>
      <Space>
        <Upload showUploadList={false} beforeUpload={handleBeforeUpload}>
          <Button type="primary">导入用户手机号</Button>
        </Upload>

        <Button type="text" onClick={() => props.onTemplateDownload()}>
          下载导入模板
        </Button>

        <Typography.Text type="secondary" style={{ fontSize: 12 }}>
          *通过用户手机号进行发放
        </Typography.Text>
      </Space>

      <ProList<IDataSource>
        toolBarRender={() => {
          return [
            <Input value={addPhone} key="phone" onInput={(ev) => setAddPhone(ev.currentTarget.value || '')} />,
            <Button
              key="add"
              type="primary"
              onClick={() => {
                if (isChinaMobilePhone(addPhone)) {
                  if (dataSource.some((it) => it.title === addPhone)) {
                    message.warn('手机号码已经在列表中')
                  } else {
                    setDataSource((pre) => [{ title: addPhone, valid: true }, ...pre])
                    setAddPhone('')
                    message.success('添加成功')
                  }
                } else {
                  message.error('手机号码格式错误')
                }
              }}
            >
              添加
            </Button>,
            <Button key="empty" onClick={() => setDataSource([])}>
              清空
            </Button>
          ]
        }}
        size="small"
        rowKey="title"
        grid={{ gutter: 16, column: 2 }}
        ghost
        itemCardProps={{
          size: 'small',
          ghost: true
        }}
        headerTitle={
          <Space>
            <span>已添加列表</span>
            <Typography.Text type="secondary" style={{ fontSize: 12 }}>
              已添加{dataSource.length}项目
            </Typography.Text>
            <Typography.Text type="secondary" style={{ fontSize: 12 }}>
              有效{validMobile.length}条
            </Typography.Text>
            <Typography.Text type="secondary" style={{ fontSize: 12 }}>
              无效{inValidLength}条
            </Typography.Text>
          </Space>
        }
        dataSource={dataSource}
        showActions="hover"
        showExtra="hover"
        metas={{
          title: {
            render: (dom, data) => (data.valid ? dom : <span style={{ color: 'red' }}>{dom}</span>)
          },
          actions: {
            render: (_text, _row, index) => [
              <a key="warning" onClick={() => setDataSource((pre) => pre.filter((_i, idx) => index !== idx))}>
                删除
              </a>
            ]
          }
        }}
      />
    </div>
  )
}

Component.displayName = 'GrantMobile'

const GrantMobile = memo(Component)
export default GrantMobile
