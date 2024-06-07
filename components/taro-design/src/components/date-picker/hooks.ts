import { useCallback, useState } from "react";
import { IMMDatePickerProps } from ".";
import { IMMDatePickerRangeProps } from "./indexRange";

export default function useMMDatePicker(props: Partial<IMMDatePickerProps>) {
  const { defaultValue = new Date() } = props;
  const [visible, setVisible] = useState(false);
  const [pickerValue, setPickerValue] = useState(defaultValue);
  const [value, setValueCache] = useState(defaultValue);

  const onChange = useCallback((data: Date) => {
    setValueCache(data);
  }, [value]);

  const onOk = useCallback(() => {
    setPickerValue(value);
    setVisible(false);
    props.onOk && props.onOk(value);
  }, [value]);

  const onCancel = useCallback(() => {
    setValueCache(pickerValue);
    setVisible(false);
  }, [value]);

  const setValue = useCallback((val: any) => {
    setPickerValue(val);
    setValueCache(val);
  }, [value]);

  console.log("value", value);
  return {
    pickerValue,
    visible,
    setValue,
    onChange,
    setVisible,
    onCancel,
    ...props,
    value,
    onOk
  }
}

export function useMMDatePickerRange(props: Partial<IMMDatePickerRangeProps> = {}) {
  const { defaultValue } = props;
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState<[Date, Date] | undefined>(defaultValue);

  const onChange = useCallback((data: [Date, Date]) => {
    setValue(data);
  }, [value]);

  const onOk = useCallback((value) => {
    setVisible(false);
    setValue(value)
    props.onOk && props.onOk(value as any);
  }, [value]);

  const onCancel = useCallback(() => {
    setVisible(false);
  }, [value]);

  return {
    value,
    visible,
    setValue,
    onChange,
    setVisible,
    onCancel,
    ...props,
    onOk
  }
}
