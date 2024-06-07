import { FC, memo, useEffect, useMemo, useState } from 'react'
import { IPreviewPopoverProps } from './const'
import { Button, Popover, Spin } from 'antd'
import { api } from '~/request'
import styles from './index.module.less'
import { isPrd } from '~/config'

const Component: FC<IPreviewPopoverProps> = (props) => {
  const { scene, page: pg = '' } = props

  const [code, setCode] = useState('')
  const [showPop, setShowPop] = useState(false)

  const page = useMemo(() => pg.replace(/^\//, ''), [pg])

  useEffect(() => {
    /**
     * INFO: 这里采用的方案是每次生成一个新的QRCode。
     * 如果有性能考虑的话。可以与后端调整修改为页面生成的时候。后端同步生成QRcode并存储进数据库
     * 建议code图片转存云服务器。不要直接存base64图片
     */
    if (!code && showPop) {
      api['/admin/api/qrCode/getUnlimited_POST']({ page, scene, version: isPrd ? 'release' : 'trial' }).then(({ data = '' }) => {
        setCode(data)
      })
    }
  }, [showPop])

  function downloadImg() {
    const imgName = page.replace(/\//g, '_') + '_' + scene
    // 如果浏览器支持msSaveOrOpenBlob方法（也就是使用IE浏览器的时候），那么调用该方法去下载图片
    if (window.navigator.msSaveOrOpenBlob) {
      var bstr = atob(code.split(',')[1])
      var n = bstr.length
      var u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      var blob = new Blob([u8arr])
      window.navigator.msSaveOrOpenBlob(blob, `${imgName}.png`)
    } else {
      // 这里就按照chrome等新版浏览器来处理
      const a = document.createElement('a')
      a.href = code
      a.setAttribute('download', imgName)
      a.click()
    }
  }

  return (
    <Popover
      content={
        <Spin spinning={!code}>
          {!!code && (
            <div>
              <img src={code} style={{ width: 145, height: 145 }} />
              <div className={styles.btn}>
                <Button type="link" onClick={downloadImg}>
                  下载
                </Button>
              </div>
            </div>
          )}
        </Spin>
      }
      title="打开微信扫码预览"
      trigger="click"
      onVisibleChange={setShowPop}
    >
      <a>预览</a>
    </Popover>
  )
}

Component.displayName = 'PreviewPopover'

const PreviewPopover = memo(Component)
export default PreviewPopover
