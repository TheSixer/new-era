/* eslint-disable max-nested-callbacks */
import React, { createRef, forwardRef, memo, PropsWithChildren, useImperativeHandle, useRef } from 'react'
import { IFeildRef } from '../feild/const'
import { IFormProps, IMMFormInstance } from './const'

const Component = forwardRef<IMMFormInstance, PropsWithChildren<IFormProps>>((props, ref) => {
  const refMap = useRef<Record<string, any>>({})

  useImperativeHandle(ref, () => ({
    /** 校验所有的输入框 */
    validateFields: () => {
      // console.log(refMap.current)
      const validsPromise = Object.keys(refMap.current).map((key) => {
        const childRef = refMap.current[key].current as IFeildRef
        if (childRef) {
          return childRef.valid().then((cValue) => {
            return { [key]: cValue }
          })
        }
        return Promise.resolve({ [key]: undefined })
      })
      const values: Record<string, any> = {}
      return Promise.all(validsPromise).then((res) => {
        return res.reduce((result, obj) => ({ ...result, ...obj }), values)
      })
    }
  }))

  let childrenIndex = -1
  const newChildren = recursionChildren(props.children)

  /**
   * 递归子节点 找到所有的Feild组件并建立ref
   */
  function recursionChildren(childrens: React.ReactNode) {
    return React.Children.map(childrens, (child: any) => {
      if (/^MMFeild.*/.test(child?.type?.displayName)) {
        const chiildRef = child.ref || createRef()
        const { props: cprops = {} } = child
        if (cprops.name) {
          refMap.current = { ...refMap.current, [cprops.name]: chiildRef }
        }
        return React.cloneElement(child, { ref: chiildRef } )
      }

      if (child?.props?.children) {
        return React.cloneElement(child, { children : recursionChildren(child?.props?.children) } )
      }

      return child;
    })
  }

  return newChildren
})

const MMForm = memo(Component)
export default MMForm
