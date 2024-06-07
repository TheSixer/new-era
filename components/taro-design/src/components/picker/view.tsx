/**
 * @name MMPicker 选择器
 */
import { memo } from 'react'
import { PickerView, PickerViewColumn, View } from '@tarojs/components';
import { guid } from '../utils';

export interface IMMPickerProps {

  /**
   * 数据
   *
   * @type {{ value: string; text: string }[][]}
   * @memberof MMPickerProps
   */
  data?: { id: string; text: string }[][];

  /**
   * 当前值
   *
   * @type {string[]}
   * @memberof MMPickerProps
   */
  value?: string[];

  /**
   * 选择改变
   *
   * @memberof MMPickerProps
   */
  onChange?: (value: string[]) => void


}


const Component: FC<IMMPickerProps> = (props) => {
  const { value: propsValue = [], data = [] } = props;

  function getValue() {
    const { value = [], data = [] } = props;
    return value.map((val, index) => {
      return data[index] && data[index].findIndex(dataVal => dataVal.id === val);
    })
  }

  function handleChange(value, event) {
    const { data = [] } = props;
    const newValue = value.target.value.map((val, index) => data[index][val] ? data[index][val].id : data[0].id);
    if (newValue.find((value, index) => propsValue[index] !== value)) {
      props.onChange!(newValue);
    }
  }


  return <PickerView indicatorStyle='height: 40Px;' style='width: 100%; height: 200PX;' value={getValue()} onChange={handleChange} >
    {data.map((value) => <PickerViewColumn key={guid()} >
      {value.map(item => {
        return (
          <View style={{ display: "flex", alignItems: 'center', justifyContent: "center" }} key={item.id}>{item.text}</View>
        );
      })}
    </PickerViewColumn>)}
  </PickerView>;
};

Component.options = {
  addGlobalClass: true
}
const MMPickerView = memo(Component);
export default MMPickerView;
