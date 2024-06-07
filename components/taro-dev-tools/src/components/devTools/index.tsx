import { ScrollView, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import MMButton from '@wmeimob/taro-design/src/components/button'
import MMPopup from '@wmeimob/taro-design/src/components/popup'
import MMRadio from '@wmeimob/taro-design/src/components/radio'
import MMSpace from '@wmeimob/taro-design/src/components/space'
import MMTabs from '@wmeimob/taro-design/src/components/tabs'
import MMCell from '@wmeimob/taro-design/src/components/cell'
import MMCellGroup from '@wmeimob/taro-design/src/components/cell/cell-group'
import { FC, memo, useEffect, useState } from 'react'
import { DEV_TOOLS_API_STORAGE_KEY, IDevToolsProps } from './const'
import styles from './index.module.less'

enum ETabKey {
  SwitchApi,
  Storage
}

const tabs = [
  { key: ETabKey.SwitchApi, title: '切换API' },
  { key: ETabKey.Storage, title: '缓存' }
]

const tabsData = tabs.map(({ title }) => title)

const Component: FC<IDevToolsProps> = (props) => {
  const [visible, setVisible] = useState(false)
  const [tabIndex, setTabIndex] = useState(0)

  const { handleClearApiUrl, renderApiSwitcher } = useApiUrlSwitch(props)

  const { handleClearAllStorage, renderStorages } = useStorageManagement(visible && tabIndex === 1)

  function handleClearToken() {
    Taro.removeStorageSync('token')
    Taro.showToast({ icon: 'none', title: '已清除,请杀进程重启' })
  }

  return (
    <>
      <MMButton className={styles.button} type="warning" size="tiny" onClick={() => setVisible((prev) => !prev)}>
        开发调试
      </MMButton>

      <MMPopup style={{ zIndex: 99999999999 }} contentStyle={{ height: '70vh', overflowY: 'hidden' }} visible={visible} onClose={() => setVisible(false)}>
        <View className={styles.container}>
          <MMTabs data={tabsData} selectedIndex={tabIndex} onChange={setTabIndex} />
          <View className="spacing" />
          <View className="spacing" />

          <ScrollView scrollY style={{ flex: 1, overflow: 'hidden' }}>
            {tabIndex === 0 && (
              <>
                <MMSpace>
                  <MMButton size="tiny" ghost onClick={handleClearApiUrl}>
                    清除 apiUrl
                  </MMButton>
                  <MMButton size="tiny" ghost onClick={handleClearToken}>
                    清除 token
                  </MMButton>
                </MMSpace>
                <View className="spacing" />
                {renderApiSwitcher()}
              </>
            )}

            {tabIndex === 1 && (
              <>
                <MMButton size="tiny" ghost onClick={handleClearAllStorage}>
                  清除所有
                </MMButton>
                <View className="spacing" />
                {renderStorages()}
              </>
            )}
          </ScrollView>
        </View>
      </MMPopup>
    </>
  )
}

const MMDevTools = memo(Component)
export default MMDevTools

/** api 切换 */
function useApiUrlSwitch({ apiOptions }: IDevToolsProps) {
  const [currentApiUrl, setCurrentApiUrl] = useState(() => Taro.getStorageSync(DEV_TOOLS_API_STORAGE_KEY))

  function handleApiChange(url) {
    setCurrentApiUrl(url)
    Taro.removeStorageSync('token')
    Taro.setStorageSync(DEV_TOOLS_API_STORAGE_KEY, url)
    Taro.showToast({ icon: 'none', title: '已切换,请杀进程重启' })
  }

  function handleClearApiUrl() {
    setCurrentApiUrl('')
    Taro.removeStorageSync('token')
    Taro.removeStorageSync(DEV_TOOLS_API_STORAGE_KEY)
    Taro.showToast({ icon: 'none', title: '已清除,请杀进程重启' })
  }

  function renderApiSwitcher() {
    if (!apiOptions?.length) {
      return null
    }

    return (
      <MMRadio.Group value={currentApiUrl} direction="vertical" onChange={handleApiChange}>
        {apiOptions.map((url, idx) => (
          <MMRadio value={url} key={idx}>
            {url}
          </MMRadio>
        ))}
      </MMRadio.Group>
    )
  }

  return {
    handleClearApiUrl,
    renderApiSwitcher
  }
}

/** 缓存管理 */
function useStorageManagement(visible: boolean) {
  const [storages, setStorages] = useState<{ key: string; data: any }[]>([])

  useEffect(() => {
    visible && getAllStorage()
  }, [visible])

  async function getAllStorage() {
    const { keys } = Taro.getStorageInfoSync()
    const list = await Promise.all(
      keys.map(async (key) => {
        const data = await Taro.getStorage({ key })
        return { key, data: JSON.stringify(data.data) }
      })
    )

    setStorages(list)
  }

  function handleClearAllStorage() {
    Taro.clearStorage()
    setStorages([])
  }

  function renderStorages() {
    return (
      <MMCellGroup>
        {storages.map((item) => (
          <MMCell
            border
            title={<View style={{ width: 100, fontSize: 10, background: '#eee', wordBreak: 'break-all' }}>{item.key}</View>}
            key={item.key}
            titleAlign="baseline"
            valueAlign="left"
            onClick={() => {
              Taro.setClipboardData({ data: item.data })
              Taro.showToast({ icon: 'none', title: `已复制 ${item.key}` })
            }}
          >
            <View style={{ fontSize: 10, wordBreak: 'break-all' }}>{item.data}</View>
          </MMCell>
        ))}
      </MMCellGroup>
    )
  }

  return { handleClearAllStorage, renderStorages }
}
