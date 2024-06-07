import { PageContainer } from '@ant-design/pro-layout'
import { EMemberRangeType } from '@wmeimob-modules/member-data/src/enums/EMemberRangeType'
import { EMemberRightsType } from '@wmeimob-modules/member-data/src/enums/EMemberRightsType'
import { api, MemCardDto, MemCardRightsDto, MemCardSaveDto } from '@wmeimob/backend-api'
import { getGlobalData } from '@wmeimob/backend-store'
import { useSuperLock } from '@wmeimob/utils/src/hooks/useSuperLock'
import { mmDivide, mmTimes } from '@wmeimob/utils/src/mmCurrency'
import { Button, message, Space, Tabs } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { FC, memo, useEffect, useState } from 'react'
import MutiLevelCardForm from './components/mutiLevelCardForm'
import MutiLevelDetail from './components/mutiLevelDetail'
import SingleLevelCardForm from './components/singleLevelCardForm'
import SingleLevelDetail from './components/singleLevelDetail'
import styles from './index.module.less'
import { TaskContext } from './store'

interface ICreateProps {
  upload: any
  service: ReturnType<typeof useService>
}

const Component: FC<ICreateProps> = (props) => {
  const { service, upload } = props
  const { cards, form } = service
  const [contextValue] = useState({ upload: getGlobalData('upload') })

  return (
    <PageContainer loading={service.loading} className={styles.createStyle}>
      <TaskContext.Provider value={contextValue}>
        <Tabs
          type="card"
          activeKey={service.activeKey}
          onTabClick={service.handleTabClick}
          tabBarExtraContent={
            !service.isEdit ? (
              <Button type="primary" onClick={() => service.handleEdit()}>
                编辑
              </Button>
            ) : (
              <Space>
                <Button type="primary" loading={service.saveLoading} onClick={() => service.handleSave()}>
                  保存
                </Button>
                <Button onClick={() => service.onCanel()}>取消</Button>
              </Space>
            )
          }
        >
          {cards.length > 1 &&
            cards.map((card, index) => {
              return <Tabs.TabPane key={card.tabKey} tab={card.tabName} />
            })}
        </Tabs>

        {service.activeKey === 'muti' ? (
          service.isEdit ? (
            <MutiLevelCardForm form={form} upload={upload} />
          ) : (
            <MutiLevelDetail data={service.card} />
          )
        ) : service.isEdit ? (
          <SingleLevelCardForm form={form} upload={upload} />
        ) : (
          <SingleLevelDetail data={service.card} />
        )}
      </TaskContext.Provider>
    </PageContainer>
  )
}

const PageMemberCreate = memo(Component)
export default PageMemberCreate

export function useService() {
  const [loading, setLoading] = useState(false)
  // 当前激活的tab
  const [activeKey, setActiveKey] = useState('muti')
  // 最多提供两种类型的会员卡
  const [cards, setCards] = useState<(MemCardDto & { tabKey: string; tabName: string })[]>([])

  const [card, setCard] = useState<MemCardDto>({}) // 会员卡详情
  const [isEdit, setIsEdit] = useState(false)
  const [form] = useForm()

  // 初始化查询存在的会员卡。并查询第一张卡详情
  useEffect(() => {
    setLoading(true)
    api['/admin/mall/memberCard_GET']({}).then(({ data = {} }) => {
      const { list = [] } = data

      const newList: any[] = [
        { tabKey: 'muti', tabName: '多等级会员卡' },
        { tabKey: 'single', tabName: '单等级会员卡' }
      ]
      list.slice(0, 2).forEach((item) => {
        const index = item.upgrade ? 0 : 1
        newList[index] = { ...item, ...newList[index] }
      })
      setCards(newList.filter((it) => !!it.id))
    })
  }, [])

  // 获取会员卡详情
  useEffect(() => {
    getCardDetail()
  }, [activeKey, cards])

  /** 点击tab切换 */
  const handleTabClick = (key: string) => {
    if (isEdit) {
      message.info('请先保存当前的内容')
    } else {
      setActiveKey(key)
    }
  }

  // 点击编辑
  const handleEdit = () => {
    setIsEdit(true)
    setTimeout(() => {
      form.setFieldsValue(card)
    })
  }

  // 查询会员卡详情
  async function getCardDetail() {
    const { id } = cards.find((card) => card.tabKey === activeKey) || {}
    if (!id) {
      return
    }
    setLoading(true)
    const { data = {} } = await api['/admin/mall/memberCard/{id}_GET'](id)

    setCard(converForFormValues(data))
    setLoading(false)
  }

  /**
   * 转换表单数据。用于适配表单与详情
   * @param data
   */
  function converForFormValues(data: MemCardDto) {
    let { levelList = [] } = data

    levelList = levelList.map((level, index) => {
      let { rightsList = [], ...rest } = level

      // 处理折扣
      rightsList = rightsList.map((right) => {
        return { ...right, discount: mmTimes(right.discount || 0, 10, { precision: 3 }) }
      })
      return { ...rest, rightsList }
    })

    return { ...data, levelList }
  }

  /**
   * 保存表单
   */
  const [handleSave, saveLoading] = useSuperLock(async () => {
    try {
      const value = await form.validateFields()
      const { level, id, ...rest } = value
      let { levelList } = rest

      // 设置权益
      levelList = levelList.map((item, index) => {
        let { rightsList = [], ...rest } = item

        rightsList = rightsList.map((right: MemCardRightsDto) => {
          const { rangeType, rightsGoodsList } = right
          return {
            ...right,
            rightsType: EMemberRightsType.GoodsDiscount, // 当前只有一个权益，暂时写死
            // 处理折扣
            discount: mmDivide(right.discount, 10, { precision: 3 }),
            // 处理权益商品
            rightsGoodsList: rangeType === EMemberRangeType.AllGoods ? [] : rightsGoodsList
          }
        })
        return { ...rest, level: index + 1, rightsList }
      })

      const saveData: MemCardSaveDto = { ...rest, levelList }

      if (!extraFormValid(saveData)) {
        return
      }

      try {
        await api['/admin/mall/memberCard/{id}_PUT'](id, saveData)
        message.success('保存成功')
        setIsEdit(false)
        getCardDetail()
      } catch (error) {
        message.success('保存失败')
      }
    } catch (error) {
      message.error('必填项未填')
    }
  })

  /**
   * 表单额外验证
   */
  function extraFormValid(formValues: MemCardSaveDto) {
    // 验证等级条件
    const { levelList = [] } = formValues
    const valueEnds = levelList.map((it) => it.valueEnd || 0)
    const valueEndStr = valueEnds.join(',')
    const valueEndsSort = valueEnds.sort((aa, bb) => aa - bb)
    const valueEndsSortStr = valueEndsSort.join(',')

    if (valueEndsSortStr !== valueEndStr) {
      message.error('会员条件设置错误,下一等级金额不能小于上一等级')
      return false
    }

    // 存在同级相同值
    const hadSame = new Set(valueEndsSort).size !== valueEndsSort.length

    if (hadSame) {
      message.error('会员条件设置错误,同一等级金额不能相等')
      return false
    }

    // 验证权益折扣
    // TODO: 后期权益模块独立后。此处不在需要
    const discounts = levelList.map(({ rightsList = [] }) => {
      return rightsList[0]?.discount || 0
    })
    const discountsStr = discounts.join(',')
    const discountsSortStr = discounts.sort((aa, bb) => bb - aa).join(',')
    if (discountsStr !== discountsSortStr) {
      message.error('会员权益折扣设置错误,下一等级金额不能大于上一等级')
      return false
    }

    // 验证权益商品配置.如果是部分商品。需要选择商品
    // TODO: 后期权益模块独立后。此处不在需要
    const isValidGoods = levelList.every(({ rightsList = [] }) => {
      const { rangeType, rightsGoodsList = [] } = rightsList[0] || {}
      return (rangeType === EMemberRangeType.PartGoods && !!rightsGoodsList.length) || rangeType === EMemberRangeType.AllGoods
    })
    if (!isValidGoods) {
      message.error('请设置折扣商品')
      return false
    }

    return true
  }

  return {
    loading,
    activeKey,
    setActiveKey,
    handleSave,
    onCanel: () => {
      setIsEdit(false)
    },
    saveLoading,
    isEdit,
    cards,
    card,
    form,
    getCardDetail,
    handleTabClick,
    handleEdit
  }
}
