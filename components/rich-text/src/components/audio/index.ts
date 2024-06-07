import { Boot, SlateElementAudio } from '@wangeditor/editor'
import { h, VNode } from 'snabbdom'

const TYPE = 'audio'

function renderAudio(elem: SlateElementAudio, children: VNode[] | null) {
  const vnode = h('audio', { src: elem.src, controls: true })
  return vnode
}

function audioToHtml(elem: SlateElementAudio) {
  return `<p class="audio-wrapper"><audio src="${elem.src}" controls /></p>`
}

function register() {
  Boot.registerRenderElem({
    type: TYPE,
    renderElem: renderAudio
  })

  Boot.registerElemToHtml({
    type: TYPE,
    elemToHtml: audioToHtml
  })

  // Boot.registerParseElemHtml() // TODO 未实现
}

const audioConfig = {
  type: TYPE,
  register
}

export default audioConfig
