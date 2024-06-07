import config from '../../../config'

const { maxClassifyLevel } = config.systemConfig.config

/**
 * 设置分类值
 *
 * 将分散的分类合并成级联选择数据格式
 * @param param0
 * @returns
 */
export const setClassifyValues = ({ classifyPid2, classifyPid1, classifyId }: { classifyPid2?: number; classifyPid1?: number; classifyId?: number }) => {
  return maxClassifyLevel === 2 ? [classifyPid1!, classifyId!] : [classifyPid2!, classifyPid1!, classifyId!]
}

/**
 * 获取分类值
 *
 * 将级联选择数据格式转换成分散格式
 * @param param0
 * @returns
 */
export const getClassifyValues = (data: number[]) => {
  if (maxClassifyLevel === 2) {
    const [classifyPid1, classifyId] = data
    return { classifyPid2: undefined, classifyPid1, classifyId }
  }
  const [classifyPid2, classifyPid1, classifyId] = data
  return { classifyPid2, classifyPid1, classifyId }
}
