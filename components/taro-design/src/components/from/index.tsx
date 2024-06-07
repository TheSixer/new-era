import React, { FC, forwardRef, memo } from 'react'
import IHFromProps from './IFromProps'
import useFromContext, { fromContext } from './useFromContext'

const MMFrom = forwardRef((props: IHFromProps & { children: any }, ref: React.ForwardedRef<ReturnType<typeof useFromContext>>) => {
  const { Provider } = fromContext
  const state = useFromContext(props, ref)

  return <Provider value={state}>{props.children}</Provider>
})

export default MMFrom
