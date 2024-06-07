import { createContext, useImperativeHandle, useRef, useState } from 'react'
import IFromKey from './IFromKey'
import { Map } from 'immutable'
import creatMonitor from './creatMonitor'
import IFromProps from './IFromProps'

export const fromContext = createContext<ReturnType<typeof useFromContext>>(undefined as any)

export default function useFromContext(props: IFromProps, ref: React.ForwardedRef<ReturnType<any>>) {
  const [values = {}, setValues] = useState<{
    [key: string]: any
  }>(props?.defaultValue as any)

  const monitor = useRef(creatMonitor())

  function setValue(key: IFromKey, value: any) {
    let newData = Map(values)

    if (Array.isArray(key)) {
      newData = newData.updateIn(key, (_val) => value)
    } else {
      newData = newData.set(key, value)
    }

    setValues(newData.toJS())
  }

  function getValue(key: IFromKey) {
    if (Array.isArray(key)) {
      return Map(values).getIn(key)
    }
    return values[key]
  }

  async function handleSubmit() {
    const messages = await monitor.current.emit()

    if (!messages.find((value) => value)) {
      props?.onSubmit?.(values)
      return values
    }
    throw messages.filter((value) => !!value).join(',')
  }

  const contextValue = {
    monitor,
    values,
    getValue,
    handleSubmit,
    setValues,
    setValue
  }

  useImperativeHandle(ref, () => contextValue, [contextValue])
  return contextValue
}
