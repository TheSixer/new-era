import { api } from '@wmeimob/backend-api'
import { getGlobalData } from '@wmeimob/backend-store'
import convertToTree from '@wmeimob/utils/src/tree/convertToTree'
import { Rule } from 'antd/lib/form'

/**
 * 步骤一表单
 * @returns
 */
export default function useStepOne() {
  const { config } = getGlobalData('systemConfig')

  const classsifyRule: Rule[] = [
    {
      required: true,
      validator(_, value) {
        if (!value.length) {
          return Promise.reject(new Error('请选择商品分类'))
        } else if (value.length < config.maxClassifyLevel) {
          return Promise.reject(new Error(`商品只能绑定到第${config.maxClassifyLevel}级分类`))
        }
        return Promise.resolve(true)
      }
    }
  ]
  /** 获取分类 */
  async function getClassify() {
    const { data = [] } = await api['/admin/mall/classify/tree_GET']({})
    const treeData = convertToTree(data, { title: 'name', value: 'id' })
    return treeData
  }

  /** 获取积分商品分类 */
  async function getIntergralClassify() {
    const { data = [] } = await api['/admin/mall/classify/tree_GET']({ goodsType: 1 })
    const treeData = convertToTree(data, { title: 'name', value: 'id' })
    return treeData
  }

  // 获取运费模板
  async function getExpress() {
    const { data = {} } = await api['/admin/mall/express/query_GET']({ pageNum: 1, pageSize: 1000 })
    return (data.list || []).map((it) => ({ label: it.name, value: it.id }))
  }

  return {
    classsifyRule,
    getClassify,
    getIntergralClassify,
    getExpress
  }
}
