import { FC, memo, useContext, useMemo } from 'react'
import styles from './index.module.less'
import { Collapse, Card } from 'antd'
import { BasicModuleSignEnum, IModuleInfo } from '@wmeimob-modules/decoration-data'
import ModuleInfoCard from '../moduleInfoCard'
import StoreContext from '../store-context'
import { EModuleCategory } from '@wmeimob-modules/decoration-data/src/enums/EModuleCategory'

interface IPanelModule {
  title: string
  category: EModuleCategory
  modules: IModuleInfo[]
}

const { Panel } = Collapse

interface IModuleSelectCardProps {
  width?: number
  /**
   * 包含的组件。如果传递include。则忽略exclude
   */
  include?: BasicModuleSignEnum[]
  exclude?: BasicModuleSignEnum[]
  onDragStart: (type: BasicModuleSignEnum) => void
  onDragEnd?: () => void
}

const ignoreModules: BasicModuleSignEnum[] = [BasicModuleSignEnum.DefaultTipBlock]

const ModuleSelectCard: FC<IModuleSelectCardProps> = (props) => {
  const { width, exclude = [] } = props

  const { modules } = useContext(StoreContext)

  const panelModules = useMemo(() => {
    const panels: IPanelModule[] = [
      { title: '基础模块', category: EModuleCategory.Basic, modules: [] },
      { title: '内容营销', category: EModuleCategory.Content, modules: [] }
    ]

    modules.forEach(({ moduleInfo }) => {
      if (ignoreModules.indexOf(moduleInfo.type) !== -1) {
        return
      }
      panels.forEach((panel) => {
        if (panel.category === moduleInfo.category) {
          panel.modules.push(moduleInfo)
        }
      })
    })

    // console.log('panelModules', panels)
    return panels.filter((item) => !!item.modules.length)
  }, [exclude, props.include, modules])

  const defaultActiveKey = useMemo(() => panelModules.map((item) => item.title), [panelModules])

  // 如果没有任何组件。则不渲染此组件
  if (props.include && props.include.length === 0) {
    return null
  }

  return (
    <Card className={styles.moduleSelectCard} style={{ width }}>
      <Collapse defaultActiveKey={defaultActiveKey}>
        {panelModules.map((pm) => {
          return (
            <Panel header={pm.title} key={pm.title}>
              <div className={styles.modules}>
                {pm.modules.map((module) => (
                  <div
                    key={module.cname}
                    className={styles.moduleItem}
                    draggable="true"
                    onDragStart={() => props.onDragStart(module.type)}
                    onDragEnd={props.onDragEnd}
                  >
                    <ModuleInfoCard type={module.type} className={styles.basicModule} />
                  </div>
                ))}
              </div>
            </Panel>
          )
        })}
      </Collapse>
    </Card>
  )
}

ModuleSelectCard.defaultProps = {
  width: 260,
  exclude: [],
  onDragStart: () => {}
}

export default memo(ModuleSelectCard)
