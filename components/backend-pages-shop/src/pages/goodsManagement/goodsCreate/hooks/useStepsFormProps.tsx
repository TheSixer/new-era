import { SubmitterProps } from '@ant-design/pro-form'
import { Button, message } from 'antd'
import { IStepTwoFormDTO } from '../const'

interface IUseStepsFormPropsOption {
  /** 点击返回 */
  onBack(): void
}

/**
 * 表单配置
 *
 * @export
 * @return {*}
 */
export default function useStepsFormProps(option: IUseStepsFormPropsOption) {
  /** 表单提交 */
  const submitter: SubmitterProps = {
    render: (props) => {
      return {
        0: [
          <Button key="back" onClick={option.onBack}>
            返回
          </Button>,
          <Button key="next" type="primary" onClick={() => props.onSubmit?.()}>
            下一步
          </Button>
        ],
        1: [
          <Button key="pre" onClick={() => props.onPre?.()}>
            上一步
          </Button>,
          <Button key="next2" type="primary" onClick={() => props.onSubmit?.()}>
            下一步
          </Button>
        ],
        2: [
          <Button key="pre1" onClick={() => props.onPre?.()}>
            上一步
          </Button>,
          <Button key="submit" type="primary" onClick={() => props.onSubmit?.()}>
            提交
          </Button>
        ]
      }[props.step]
    }
  }

  /**
   * 处理第二步表单校验
   *
   * 判断数据合法性
   * @param formData
   * @returns
   */
  const handleStepTwoFormFinish = async (formData: IStepTwoFormDTO) => {
    const { goodsSkuList = [] } = formData
    if (!goodsSkuList.some((item) => item.enabled)) {
      message.warn('请至少启用一个sku')
      return false
    }
    return true
  }

  return {
    submitter,
    handleStepTwoFormFinish
  }
}
