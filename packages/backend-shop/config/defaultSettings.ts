import { Settings as LayoutSettings } from '@ant-design/pro-layout'

const Settings: LayoutSettings & {
  pwa?: boolean
  logo?: string
  smLogo?: string
} = {
  // 左上角标题
  title: 'NEWERA',
  /**
   * 左上角logo
   * @warn 这个图片是绝对路径引用。如果你的项目是相对目录部署的。那么请将这个图片上传到阿里云引用
   */
  logo: '/icons/logo.png',
  smLogo: '/icons/logoSm.png',

  navTheme: 'light',
  // 拂晓蓝
  primaryColor: '#1890ff',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  pwa: false,
  iconfontUrl: ''
}

export default Settings
