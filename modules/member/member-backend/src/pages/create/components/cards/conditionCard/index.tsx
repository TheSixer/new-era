/* eslint-disable max-params */
import { ProFormSelect, ProFormDependency, ProFormList, FormListActionType } from '@ant-design/pro-form'
import { OMemberLevelType, MMemberLevelType } from '@wmeimob-modules/member-data/src/enums/EMemberLevelType'
import { EMemberRangeType } from '@wmeimob-modules/member-data/src/enums/EMemberRangeType'
import { EMemberRightsType } from '@wmeimob-modules/member-data/src/enums/EMemberRightsType'
import ProFormInfo from '@wmeimob/backend-pro/src/components/form/proFormInfo'
import { Card, Divider, FormInstance } from 'antd'
import { FC, memo, useRef } from 'react'
import LevelCondition from '../../levelCondition'
import LevelSetting from '../../levelSetting'

interface IConditionCardProps {
  form: FormInstance<any>
}

const Component: FC<IConditionCardProps> = (props) => {
  const actionRef = useRef<FormListActionType<{ valueStart?: number; valueEnd?: number; rightsList: any[] }>>()
  /** 等级列表新增删除逻辑 */
  const actionGuard: any = {
    beforeAddRow: async (defaultValue, insertIndex, count) => {
      return new Promise((resolve) => {
        const list = actionRef.current!.getList()!

        const levelList = list
          .map((item, index) => {
            return index === list.length - 1 ? { ...item, valueEnd: undefined } : item
          })
          .concat([
            {
              valueStart: undefined,
              valueEnd: 99999999,
              rightsList: [{ rangeType: EMemberRangeType.AllGoods, rightsType: EMemberRightsType.GoodsDiscount, rightsGoodsList: [] }]
            }
          ])

        props.form.setFieldsValue({ levelList })
        resolve(false)
      })
    },
    beforeRemoveRow: async (index, count) => {
      return new Promise((resolve) => {
        const list = actionRef.current!.getList()!
        list.splice(index, 1) // 删除当前列

        let levelList: any[] = []
        // 只剩一列
        if (list.length === 1) {
          levelList = list.map((item) => ({ ...item, valueStart: 0, valueEnd: 99999999 }))
        } else {
          // 重组列表
          levelList = list.map((item, index, values) => {
            let { valueStart, valueEnd } = item
            // 第一条首数据为0
            if (index === 0) {
              return { ...item, valueStart: 0 }
            }

            valueStart = list[index - 1].valueEnd
            // 最后一条数据值为
            if (list.length - 1 === index) {
              valueEnd = 99999999
            }

            return { ...item, valueStart, valueEnd }
          })
        }

        props.form.setFieldsValue({ levelList })

        resolve(false)
      })
    }
  }

  return (
    <Card title="会员条件设置">
      <ProFormSelect label="等级条件" name="levelType" options={OMemberLevelType} allowClear={false} />

      <ProFormDependency name={['levelType']}>
        {({ levelType }) => {
          return (
            <>
              <div style={{ marginLeft: 120 }}>
                <ProFormList
                  name="levelList"
                  min={1}
                  copyIconProps={false}
                  creatorButtonProps={{ creatorButtonText: '添加等级', type: 'primary', ghost: true }}
                  actionRef={actionRef}
                  actionGuard={actionGuard}
                >
                  {(_m, index, _a, count) => <LevelCondition index={index} count={count} conditionLabel={MMemberLevelType[levelType]} />}
                </ProFormList>
              </div>

              <ProFormInfo
                wrapperCol={{ span: 24 }}
                fieldProps={{ type: 'secondary' }}
                info={
                  <div style={{ paddingLeft: 120 }}>
                    <div>各等级数值区间不得重合；下一等级的下限≥上一等级上限；</div>
                    <div>支持整数输入，输入范围支持[0，99999999]</div>
                  </div>
                }
              />

              <Divider />

              <ProFormList name="levelList" copyIconProps={false} deleteIconProps={false} creatorButtonProps={false}>
                {(meta, index) => (
                  <div key={meta.key} style={{ marginLeft: 120 }}>
                    <LevelSetting index={index} />
                  </div>
                )}
              </ProFormList>
            </>
          )
        }}
      </ProFormDependency>
    </Card>
  )
}

const ConditionCard = memo(Component)
export default ConditionCard
