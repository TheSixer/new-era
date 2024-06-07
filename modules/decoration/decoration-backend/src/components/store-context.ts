import { IModuleInfo } from '@wmeimob-modules/decoration-data'
import React, { ExoticComponent, useMemo } from 'react'
import { EModuleCategory } from '@wmeimob-modules/decoration-data/src/enums/EModuleCategory'
import { useForm } from 'antd/lib/form/Form'
import { FormInstance } from 'antd/es/form'

interface IModule {
  default: ExoticComponent<any>
  moduleInfo: IModuleInfo
}

export interface IStoreContextValue {
  modules: IModule[]
  logo: string
  name: string
  form: FormInstance<any>
  upload?(fileList: File[], options?: any): Promise<string[]>
  [i: string]: any
}

function creatInitContext() {
  const modules: IModule[] = []
  const $require = require['context']('./decorationModules', true, /^\.\/\w+\/index.[tj]sx?$/)
  // const $require2 = require['context']('../../../../../components/store/basicModule', true, /^\.\/\w+\/index.[tj]sx?$/);

  function generateModules(request, rmodules) {
    const module = rmodules(request) as IModule
    const { moduleInfo } = module
    if (moduleInfo) {
      const { category = EModuleCategory.Basic } = moduleInfo
      modules.push({ ...module, moduleInfo: { ...moduleInfo, category } })
    }
  }
  $require.keys().forEach((request) => generateModules(request, $require))
  // $require2.keys().forEach(request => generateModules(request, $require2))

  // console.log(modules, 'modules111')
  return {
    modules
  }
}

const initContext = creatInitContext()
export const initContextValue: Pick<IStoreContextValue, 'modules'> = initContext

const StoreContext = React.createContext<IStoreContextValue>(null as any)
export default StoreContext

type TUseStoreContextValueOptions = Partial<Pick<IStoreContextValue, 'upload'>>

export function useStoreContextValue(options: TUseStoreContextValueOptions) {
  /**
   * 编辑表单的form
   */
  const [form] = useForm()

  /**
   * 初始值
   */
  const initValue = useMemo(
    () => ({
      logo: '',
      name: '这是店铺名称',
      modules: initContext.modules,
      ...options,
      form
    }),
    [form, options]
  )

  return [initValue, form] as const
}
