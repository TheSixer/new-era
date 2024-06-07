export default interface IHFromProps {
  /**
   * 默认值
   */
  defaultValue?: { [key: string]: any }

  /**
   * 提交时
   */
  onSubmit?: (values: any) => void
}
