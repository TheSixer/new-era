import IRule from "./IRule";

export default interface IHFromItemProps {

  /**
   * 数据key
   */
  dataIndex: string | (string | number)[]

  /**
   * 数据验证规则
   */
  rule?: IRule[]

  /**
   * 名称
   */
  name?: string,
}
