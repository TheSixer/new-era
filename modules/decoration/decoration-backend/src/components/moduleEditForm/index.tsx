import { FC, memo, useContext, useMemo } from 'react'
import { IModuleEditFormProps } from './const'
import StoreContext from '../store-context'

const Component: FC<IModuleEditFormProps> = (props) => {
  const { type } = props
  const { modules } = useContext(StoreContext)

  const Component = useMemo(() => {
    const module = modules.find(({ moduleInfo }) => moduleInfo && moduleInfo.type === type)
    return module?.moduleInfo.settingComponet ?? null
  }, [type, modules])

  return Component && <Component {...props} />
}

Component.displayName = 'ModuleEditForm'

const ModuleEditForm = memo(Component)
export default ModuleEditForm
