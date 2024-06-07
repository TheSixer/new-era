import { SwitchProps } from "antd";

type Value = number | string | boolean;

export interface ISwitchProProps extends Omit<SwitchProps, 'checked' | 'defaultChecked' | 'onChange'> {
  checked?: Value;
  
  defaultChecked?:Value;
  /** 选中时的值，当使用类似 1 和 0 来判断是否选中时会很有用	 */
  trueValue?: Value;
  /** 没有选中时的值，当使用类似 1 和 0 来判断是否选中时会很有用 */
  falseValue?: Value;
  /** 覆写change */
  onChange?(value: Value, event: MouseEvent): void;
}
