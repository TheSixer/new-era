import { PageContainer } from '@ant-design/pro-layout'
import ProTable, { ProColumns } from '@ant-design/pro-table'
import { MGoodScore } from '@wmeimob-modules/goods-data/src/enums/EGoodScore'
import { getVideoSnapshotUrl } from '@wmeimob/aliyun'
import { api } from '@wmeimob/backend-api'
import { GoodsSkuDTO, GoodsVO, MenuTreeOutputDto } from '@wmeimob/backend-api/src/request/data-contracts'
import PreviewList from '@wmeimob/backend-pro/src/components/previewList'
import convertToTree from '@wmeimob/utils/src/tree/convertToTree'
import { Button, Card, Cascader, Descriptions, Image } from 'antd'
import { FC, memo, useEffect, useMemo, useState } from 'react'
import useGoodSkuColumns from '../../hooks/useGoodSkuColumns'
import { setClassifyValues } from '../goodsClassify/const'
import styles from './index.module.less'

interface IMMGoodsDetailPageProps {
  service: ReturnType<typeof useService>

  /** 显示使用积分 */
  enableScore?: boolean
}

const Component: FC<IMMGoodsDetailPageProps> = (props) => {
  const { loading, detail, classifyTree, richText, classifyValues, columns } = props.service

  return (
    <PageContainer
      loading={loading}
      footer={[
        <Button key="back" type="primary" onClick={() => window.history.go(-1)}>
          返回
        </Button>
      ]}
    >
      {detail && (
        <>
          <Card title="基本信息" className={styles.card}>
            <Descriptions column={1} labelStyle={{ width: 100 }}>
              <Descriptions.Item label="商品编号">{detail.goodsNo}</Descriptions.Item>

              <Descriptions.Item label="商品名称">{detail.goodsName}</Descriptions.Item>

              <Descriptions.Item label="商品状态">{detail.shelved ? '上架' : '下架'}</Descriptions.Item>

              <Descriptions.Item label="商品分类">
                <Cascader value={classifyValues} options={classifyTree} disabled />
              </Descriptions.Item>

              <Descriptions.Item label="商品库存">{detail.stock}</Descriptions.Item>

              <Descriptions.Item label="实际销量">{detail.actualSales}</Descriptions.Item>

              {props.enableScore && <Descriptions.Item label="使用积分">{MGoodScore[detail.useScore ? 1 : 0]}</Descriptions.Item>}

              {!!detail.videoUrl && (
                <Descriptions.Item label="商品视频">
                  <Image
                    className={styles.video}
                    src={detail.videoUrl + getVideoSnapshotUrl({ width: 120 })}
                    preview={{ visible: false }}
                    onClick={() => window.open(detail.videoUrl)}
                  />
                </Descriptions.Item>
              )}

              <Descriptions.Item label="商品图片">
                <PreviewList firstBadge list={[detail.coverImg!].concat(detail.bannerImgPaths!.split(','))} />
              </Descriptions.Item>
            </Descriptions>
          </Card>

          <Card title="规格库存" className={styles.card}>
            <ProTable toolBarRender={false} search={false} columns={columns} dataSource={detail.goodsSkuDetailList || []} rowKey="specIds" pagination={false} />
          </Card>

          <Card title="商品介绍" className={styles.card}>
            <div className={styles.richText} dangerouslySetInnerHTML={{ __html: richText }} />
          </Card>
        </>
      )}
    </PageContainer>
  )
}

const MMGoodsDetailPage = memo(Component)
export default MMGoodsDetailPage

interface IUseServiceProps {
  /** 商品编号 */
  goodsNo: string
  /** 商品类型
   * 0 普通商品
   * 1 积分商品
   */
  goodsType?: number

  /** sku表格列 */
  columns: ProColumns<GoodsSkuDTO>[]
}
/**
 * 商品详情业务hook
 *
 * @export
 * @param {IMMGoodsDetailPageProps} props
 * @return {*}
 */
export function useService(props: IUseServiceProps) {
  const [loading, setLoading] = useState(false)

  const [detail, setDetail] = useState<GoodsVO>() // 商品详情

  const [richText, setRichText] = useState('') // 商品详情富文本

  const [classifyTree, setClassifyTree] = useState<MenuTreeOutputDto[]>([]) // 商品分类树

  const [skuColumns] = useGoodSkuColumns(detail || {}) // 商品sku表格列

  const classifyValues = useMemo(() => (detail ? setClassifyValues(detail) : []), [detail]) // 分类值

  const columns = useMemo(() => skuColumns.concat(props.columns), [skuColumns]) // 表格列

  // 获取商品详情数据
  useEffect(() => {
    getDetail()
  }, [])

  async function getDetail() {
    if (props.goodsNo) {
      setLoading(true)
      try {
        const { data = {} } = await api['/admin/goods/{no}_GET'](props.goodsNo)
        setDetail(data)
        getRichText(data.richId)
        getClassify()
      } catch (error) {}
      setLoading(false)
    }
  }

  // 获取富文本内容
  function getRichText(id?: number) {
    if (id) {
      api['/admin/richtext_GET']({ id }).then(({ data = '' }) => {
        setRichText(data)
      })
    }
  }

  // 获取分类
  function getClassify() {
    api['/admin/mall/classify/tree_GET']({ goodsType: props.goodsType }).then(({ data = [] }) => {
      setClassifyTree(convertToTree(data, { title: 'name', value: 'id' }))
    })
  }

  return {
    loading,
    detail,
    richText,
    classifyTree,
    classifyValues,
    columns
  }
}
