import { FC, memo, useEffect, useState } from 'react'
import { Row, Col, Pagination, Empty, Spin, message, Input } from 'antd'
import MaterialCard from '../../components/card'
import UploadButton from '../upload'
import { useConsumer } from '../context'
import styles from './index.module.less'
import useMaterialList from './usematerialList'
import { MallConfMaterialVo } from '../../const'

interface IProps {}

/**
 * 素材选择列表（和操作列表不能同时存在)
 */
const MaterialList: FC<IProps> = (props) => {
  const { state, dispatch } = useConsumer()
  const [searchName, setSearchName] = useState('')
  const { selectedLinks } = state

  const { loading, pageInfo, getList } = useMaterialList()

  async function handlePageChange(pageNum?: number) {
    if (!state.selectedGroup) {
      dispatch({ type: 'ChangeList', list: [] })
    } else {
      const name = searchName ? searchName : undefined
      const param: any = { pageNum, pageSize: pageInfo.pageSize, name, groupId: state.selectedGroup! }
      getList(param)
    }
  }

  function handleCheckedItem(item: MallConfMaterialVo) {
    if (selectedLinks.some((val) => val.id === item.id)) {
      dispatch({ type: 'SelectedLink', selected: selectedLinks.filter((val) => val.id !== item.id) })
    } else if (state.maxLinkCount === 1) {
      dispatch({ type: 'SelectedLink', selected: [item] })
    } else if (selectedLinks.length >= state.maxLinkCount) {
      message.warning(`最多选择${state.maxLinkCount}张!`)
    } else {
      dispatch({ type: 'SelectedLink', selected: [...selectedLinks, item] })
    }
  }

  useEffect(() => {
    searchName ? setSearchName('') : handlePageChange(1)
    handlePageChange(1)
  }, [state.selectedGroup])

  useEffect(() => {
    handlePageChange(1)
  }, [searchName])

  const isEmpty = state.list.length === 0

  return (
    <section className={styles.wrapper}>
      <Row>
        <Col span={18}>
          <Input.Search
            className={styles.search}
            loading={loading}
            allowClear
            placeholder="请输入素材名称"
            enterButton="搜索"
            maxLength={50}
            onSearch={(value) => setSearchName(value)}
          />
        </Col>
        <Col span={6} className={styles.right}>
          <UploadButton />
        </Col>
      </Row>
      <Spin spinning={loading}>
        <Row gutter={[4, 4]}>
          {state.list.map((item, index) => (
            <Col key={`${item.imgUrl}-${index}`} span={8} xl={6} xxl={4}>
              <MaterialCard
                value={item}
                checked={selectedLinks.some((val) => val.id === item.id)}
                onChange={() => handleCheckedItem(item)}
                disabledEdit
                disabledLink
                disabledDelete
                disabledDownload
              />
            </Col>
          ))}
          {isEmpty && (
            <Col span={24}>
              <Empty className={styles.empty} />
            </Col>
          )}
        </Row>
      </Spin>

      <div className={styles.pagination}>
        <Pagination {...pageInfo} onChange={handlePageChange} />
      </div>
    </section>
  )
}

export default memo(MaterialList)
