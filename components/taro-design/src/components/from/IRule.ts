import { ReactElement } from "react";

export type RuleType = 'string' | 'number' | 'integer' | 'positiveInteger' | 'phone';

export default interface IRule {
  /**
   * 错误消息
   */
  message?: string | ReactElement;
  /**
   * 最小值
   */
  min?: number;
  /**
   * 最大值
   */
  max?: number;
  /**
   * 正则
   */
  pattern?: RegExp;
  /**
   * 是否必填
   */
  required?: boolean;
  /**
   * 数据转换
   */
  transform?: (value: any) => any;
  /**
   * 验证类型
   */
  type?: RuleType;
}
