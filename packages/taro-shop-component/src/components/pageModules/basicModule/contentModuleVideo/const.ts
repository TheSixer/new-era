import { IContentModuleVideo } from '@wmeimob-modules/decoration-data'
import { EVideoSource } from '@wmeimob-modules/decoration-data/src/enums/EVideoSource'
import { getDefaultComponetStyle } from '../../utils'

export interface IContentModuleVideoProps extends IContentModuleVideo {}

export function getDefaultModuleVideoProps(): IContentModuleVideo {
  return {
    /** 视频来源 */
    source: EVideoSource.System,
    /** 视频列表 */
    videos: [],
    videoAddress: '',
    videoCoverImg: '',
    /** 播放设置 */
    palySetting: {
      /** 是否显示进度条 */
      progress: false,
      /** 是否自动播放 */
      autoplay: false
    },
    componentStyle: getDefaultComponetStyle()
  }
}
