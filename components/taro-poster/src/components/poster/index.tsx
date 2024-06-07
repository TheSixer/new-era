/* eslint-disable no-shadow */
import { Canvas, View, Image } from '@tarojs/components'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import { forwardRef, memo, PropsWithChildren, useEffect, useImperativeHandle, useRef, useState } from 'react'
import MMOverlay from '@wmeimob/taro-design/src/components/overlay'
import {
  IMMPosterProps,
  MMCCanvasPosterImageData,
  MMCCanvasPosterListData,
  MMCCanvasPosterRectData,
  MMCCanvasPosterTextData,
  EPosterDrawType,
  MMPosterData
} from './const'
import styles from './index.modules.less'
import MMButton from '@wmeimob/taro-design/src/components/button'
import icon_close from './icon_close.png'

const isWeapp = process.env.TARO_ENV === 'weapp'
const isH5 = process.env.TARO_ENV === 'h5'

export type IMMPosterRef = ReturnType<typeof usePosterService>['imperativeHandler'] // Toast ref引用类型

/**
 * 海报组件
 *
 * @description 提供分享海报组件生成组件。并且封装了基础的保存下载逻辑
 */
const Componet = forwardRef<IMMPosterRef, PropsWithChildren<IMMPosterProps>>((props, ref) => {
  const { canvasStyle } = props

  const { visible, setVisible, imgSrc } = usePosterService(props, ref)

  const handleSavePic = () => {
    if (isH5) {
      Taro.showToast({ icon: 'none', title: '请长按上方图片保存' })
    }
    if (isWeapp) {
      Taro.saveImageToPhotosAlbum({
        filePath: imgSrc,
        success(_result) {
          Taro.showToast({ icon: 'none', title: '保存成功' })
        },
        fail(_result) {},
        complete() {
          setVisible(false)
        }
      })
    }
  }

  return (
    <View className={styles.poster}>
      {/* 画布容器 */}
      <View className={styles.canvasBox}>
        {isWeapp && <Canvas type="2d" id="canvas" className={styles.canvas} style={canvasStyle} disableScroll={true} />}

        {isH5 && <canvas id="canvas" className={styles.canvas} style={canvasStyle} />}
      </View>

      {/* 海报弹窗 */}
      <MMOverlay visible={visible} catchTouchMove>
        <View className={styles.modal}>
          <View style={{ width: canvasStyle.width, textAlign: 'right' }}>
            <Image src={icon_close} style={{ width: 36, height: 36 }} onClick={() => setVisible(false)} />
          </View>

          <Image src={imgSrc} style={{ ...canvasStyle, margin: '15px 0' }} />

          <MMButton onClick={handleSavePic} style={{ width: 155 }}>
            保存图片
          </MMButton>
        </View>
      </MMOverlay>
    </View>
  )
})

Componet.displayName = 'MMPoster'

const MMPoster = memo(Componet)
export default MMPoster

/**
 * 海报业务逻辑
 */
function usePosterService(props: IMMPosterProps, ref) {
  const { width, height } = props.canvasStyle || {}

  const canvas = useRef<any>(null)
  const ctx = useRef<any>(null)
  const multiple = useRef(Taro.getSystemInfoSync().pixelRatio)

  // const resolve = useRef<(value: void | PromiseLike<void>) => void>()
  const sleepPromise = useRef<Promise<void>>()

  const { visible, setVisible, imgSrc, setImgSrc } = usePosterImageService()

  const imperativeHandler = {
    draw,
    getImageSrc,

    /**
     * 显示组件弹窗
     */
    show: () => setVisible(true),

    /**
     * 隐藏组件弹窗
     */
    hide: () => setVisible(false)
  }

  useImperativeHandle(ref, () => imperativeHandler, [width, height])

  useEffect(() => {
    async function init() {
      sleepPromise.current = new Promise((resolve) => {
        if (isWeapp) {
          Taro.nextTick(() => {
            const query = Taro.createSelectorQuery().in(getCurrentInstance().page!)
            query
              .select('#canvas')
              .fields({ node: true, size: true })
              .exec(async (res) => {
                if (!res?.[0]) {
                  return
                }

                canvas.current = res[0].node
                ctx.current = canvas.current.getContext('2d')
                canvas.current.width = width * multiple.current
                canvas.current.height = height * multiple.current
                ctx.current.scale(multiple.current, multiple.current)
                resolve()
              })
          })
        } else {
          canvas.current = document.getElementById('canvas')
          canvas.current.width = width * multiple.current
          canvas.current.height = height * multiple.current
          ctx.current = canvas.current.getContext('2d')
          ctx.current.scale(multiple.current, multiple.current)
          resolve()
        }
      })

      // 画布设置只在初始化时设置一次。后续不再接受更新
      const { borderRadius = 0, ...rest } = props.canvasSetting || {}
      // 绘制画布属性
      await drawRect({ style: { left: 0, top: 0, width, height, borderRadius, ...rest } })
      ctx.current.clip()
    }

    init()

    return () => {
      ctx.current = null
      canvas.current = null
    }
  }, [])

  async function createImage(path: string) {
    let src = path
    // 网络图片加上时间戳
    if (path && /^http(s)?:\/\//.test(path)) {
      src += (path.indexOf('?') === -1 ? '?' : '&') + `timeStamp=${Date.now()}`
    }
    return new Promise((reslove) => {
      let img: any
      if (isWeapp) {
        img = canvas.current.createImage()
      } else if (isH5) {
        img = new window.Image()
      }
      img.crossOrigin = 'anonymous'
      img.src = src
      img.onload = () => {
        reslove(img)
      }
    })
  }

  /**
   * 绘制图片
   *
   * @param {MMCCanvasPosterImageData} data
   * @return {*}
   */
  async function drawImage(data: MMCCanvasPosterImageData) {
    await sleepPromise.current
    const { style } = data
    const { left, top, width, height } = style
    ctx.current.save()
    const { value = '' } = data

    if (style.borderRadius) {
      const borderRadius = style.borderRadius || 0
      ctx.current.beginPath()
      ctx.current.moveTo(left + borderRadius, top)
      ctx.current.arcTo(left + width, top, left + width, top + height, borderRadius)
      ctx.current.arcTo(left + width, top + height, left, top + height, borderRadius)
      ctx.current.arcTo(left, top + height, left, top, borderRadius)
      ctx.current.arcTo(left, top, left + borderRadius, top, borderRadius)
      ctx.current.clip()
    }
    const img = await createImage(value)
    ctx.current.drawImage(img, style.left, style.top, style.width, style.height)

    return {
      width: style.width
    }
  }

  /**
   * 绘制一个矩形填充区域
   *
   * @description
   */
  async function drawRect(data: MMCCanvasPosterRectData) {
    await sleepPromise.current
    ctx.current.save()
    const { style } = data
    const { left, top, width, height, backgroundColor, backgroundImage, borderWidth, borderColor } = style
    const borderRadius = style.borderRadius || 0
    ctx.current.beginPath()
    ctx.current.moveTo(left + borderRadius, top)
    ctx.current.arcTo(left + width, top, left + width, top + height, borderRadius)
    ctx.current.arcTo(left + width, top + height, left, top + height, borderRadius)
    ctx.current.arcTo(left, top + height, left, top, borderRadius)
    ctx.current.arcTo(left, top, left + borderRadius, top, borderRadius)

    if (backgroundImage) {
      const img = await createImage(backgroundImage)
      // const bg = ctx.current.createPattern(img, 'no-repeat') // createPattern() 方法在指定的方向内重复指定的元素。
      // ctx.current.fillStyle = bg // fillStyle 属性设置或返回用于填充绘画的颜色、渐变或模式。
      // ctx.current.fillRect(left, top, width * multiple.current, height * multiple.current)
      ctx.current.drawImage(img, left, top, width, height)
    } else if (backgroundColor) {
      ctx.current.fillStyle = backgroundColor
      ctx.current.fill()
    }
    if (borderWidth) {
      ctx.current.lineWidth = borderWidth
      ctx.current.strokeStyle = borderColor || '#000000'
      ctx.current.stroke()
    }

    return {
      width: style.width
    }
  }

  /**
   * 绘制文本
   */
  async function drawText(data: MMCCanvasPosterTextData) {
    await sleepPromise.current
    const { style } = data
    ctx.current.font = `normal ${style.fontWeight || 'normal'} ${style.fontSize || 12 * multiple.current}px sans-serif`
    const width = data.style.width || ctx.current.measureText(data.value || '').width
    const left = data.style.right !== undefined ? canvas.current.width / multiple.current - width - data.style.right : style.left
    ctx.current.textBaseline = 'top'
    ctx.current.fillStyle = style.color || '#000000'
    if (data.style.width) {
      const result = breakLinesForCanvas(data.value, data.style.width)
      const lineHeight = style.lineHeight || (style.fontSize || 12) * 1.5
      if (style.textOverflow === 'ellipsis' && result.length > 1) {
        ;[result[0].replace(/.$/g, '...')].forEach((line, index) => {
          ctx.current.fillText(line, left, style.top + lineHeight * index)
        })
      } else {
        result.forEach((line, index) => {
          ctx.current.fillText(line, left, style.top + lineHeight * index)
        })
      }
    } else {
      ctx.current.fillText(data.value === undefined ? '' : data.value, left, style.top)
    }

    return {
      width
    }
  }

  /**
   * 绘制一行
   *
   * @description 会自动计算间隔位置
   */
  async function drawList(data: MMCCanvasPosterListData) {
    await sleepPromise.current
    const { style } = data
    let textWidth = 0
    for (const key in data.value) {
      if (data.value.hasOwnProperty(key)) {
        const element = data.value[key]
        const obj = await drawSwitch(mergeStyle(element, style, textWidth))
        textWidth += obj.width
        textWidth += element.style.left || 0
      }
    }
    return {
      width: textWidth
    }
  }

  async function drawSwitch(element) {
    let returnData: { width: number } = null as any
    const newElement = { ...element, style: element.style }
    if (newElement.background) {
      newElement.background.style = element.background.style
    }
    returnData = await switchDraw(newElement)
    return returnData
  }

  function breakLinesForCanvas(value: string, width: number) {
    const result: string[] = []
    let text = value
    let breakPoint = 0

    while ((breakPoint = findBreakPoint(text, width)) !== -1) {
      result.push(text.substr(0, breakPoint))
      text = text.substr(breakPoint)
    }

    if (text) {
      result.push(text)
    }

    return result
  }

  function findBreakPoint(text: string, width: number) {
    let min = 0
    let max = text.length - 1

    while (min <= max) {
      const middle = Math.floor((min + max) / 2)
      const middleWidth = ctx.current.measureText(text.substr(0, middle)).width
      const oneCharWiderThanMiddleWidth = ctx.current.measureText(text.substr(0, middle + 1)).width
      if (middleWidth <= width && oneCharWiderThanMiddleWidth > width) {
        return middle
      }
      if (middleWidth < width) {
        min = middle + 1
      } else {
        max = middle - 1
      }
    }

    return -1
  }

  function mergeStyle(data: MMPosterData, mergeStyle: { left: number; top: number }, prevWidth: number) {
    const newStyle = { ...data.style }
    newStyle.left = newStyle.left || 0
    newStyle.top = newStyle.top || 0
    newStyle.left += mergeStyle.left + prevWidth
    newStyle.top += mergeStyle.top
    return {
      ...data,
      style: newStyle
    }
  }

  function switchDraw(element: MMPosterData) {
    switch (element.type) {
      case EPosterDrawType.image:
        return drawImage(element)
      case EPosterDrawType.text:
        return drawText(element)
      case EPosterDrawType.list:
        return drawList(element)
      case EPosterDrawType.rect:
        return drawRect(element)
      default:
        return Promise.resolve({ width: 0 })
    }
  }

  /**
   * 生成图片url
   *
   * @description 返回canvas图片url并保存内部的图片地址
   */
  function getImageSrc() {
    const dataURL = canvas.current.toDataURL()
    // h5 可直接使用 base64
    if (isH5) {
      setImgSrc(dataURL)
      return dataURL
    }

    /**
     * 小程序端需要将 base64 转为临时文件路径才可用于其他场景(如保存到相册)
     *
     * tips:
     * canvas 输出图片有 canvas.toDataURL 和 Taro.canvasToTempFilePath 两种方式
     * 但 canvasToTempFilePath 在 PC端小程序 输出绘画内容包含 image 的场景时 image 会空白，因此统一使用 toDataURL
     */
    const name = `${Taro.env.USER_DATA_PATH}/${Date.now()}-${Math.random().toString().slice(4)}.png`
    const base64 = dataURL.replace(/^data:image\/\w+;base64,/, '')
    Taro.getFileSystemManager().writeFileSync(name, base64, 'base64')
    setImgSrc(name)
    return name
  }

  /**
   * 海报绘制方法
   *
   * @param {MMPosterData[]} data 绘制配置数据
   * @return {Promise<void>}
   */
  async function draw(data: MMPosterData[]) {
    // 绘制配置项
    await data.reduce((result, item) => result.then(() => switchDraw(item)), Promise.resolve())
  }

  return {
    imperativeHandler,
    visible,
    setVisible,
    imgSrc
  }
}

/**
 * 海报图片业务
 */
function usePosterImageService() {
  const [visible, setVisible] = useState(false)
  const [imgSrc, setImgSrc] = useState('')

  return {
    visible,
    setVisible,
    imgSrc,
    setImgSrc
  }
}
