import { useState } from "react"
import { MMCitysPickerProps } from ".";

export default function useCitysPicker(props?: Partial<MMCitysPickerProps>) {
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState<{
    id: string,
    text: string
  }[]>([]);

  function onOk(newValue: {
    id: string,
    text: string
  }[]) {
    setValue(newValue);
    setVisible(false);
  }

  function onCancel() {
    setVisible(false);
  }

  return {
    visible,
    onOk,
    onCancel,
    value,
    setValue,
    setVisible,
    ...props
  }
}
