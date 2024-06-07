import { useCallback, useState } from 'react'
import { IMMPickerProps } from '.';

export default function useMMPicker(props: Partial<IMMPickerProps>) {
  const { data = [] } = props;
  const [visible, setVisible] = useState(false);
  const [pickerValue, setPickerValue] = useState(props.value || []);
  const [value, setValueCache] = useState(pickerValue);

  const onCancel = useCallback(() => {
    setValueCache(pickerValue);
    setVisible(false);
  }, [value, data])

  const onChange = useCallback((val: any) => {
    setValueCache(val);
  }, [value, data])

  const setValue = useCallback((val: any) => {
    setPickerValue(val);
    setValueCache(val);
  }, [value, data]);

  const getDataByValue = useCallback(() => {
    return pickerValue.map((val, index) => {
      return data[index].find(da => da.id === val);
    })
  }, [value, data]);

  const onOk = useCallback(() => {
    if (value && data && value.length !== data.length) {
      setValueCache(data.map((val, index) => value[index] || val[0] && val[0].id))
      setPickerValue(data.map((val, index) => value[index] || val[0] && val[0].id))
    } else if ((!value || !value[0]) && data.length !== 0) {
      setValueCache(data.map(val => val[0] && val[0].id))
      setPickerValue(data.map(val => val[0] && val[0].id))
    } else {
      setValueCache(value)
      setPickerValue(value);
    }
    setVisible(false);
  }, [value, data]);

  return {
    data,
    visible,
    pickerValue,
    value,
    setVisible,
    setValue,
    onCancel,
    onChange,
    onOk,
    getDataByValue,
    ...props
  }
}
