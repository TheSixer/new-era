export default {
  pages: [
    'pages/index-bar/index',
    'pages/notification/index',
    'pages/radio/index',
    'pages/navigation/index',
    'pages/index/index',
    'pages/image-list/index',
    'pages/cell/index',
    'pages/field/index',
    'pages/overlay/index',
    'pages/dialog/index',
    'pages/divider/index',
    'pages/color/index',
    'pages/picker/index',
    'pages/layout/index',
    'pages/title/index',
    'pages/item/index',
    'pages/tabs/index',
    'pages/checkbox/index',
    'pages/carousel/index',
    'pages/citys-picker/index',
    'pages/menu/index',
    'pages/popover/index',
    'pages/loading/index',
    'pages/icon-font/index',
    'pages/icon-image/index',
    'pages/switch/index',
    'pages/tab-bar/index',
    'pages/image-picker/index',
    'pages/date-picker/index',
    'pages/empty/index',
    'pages/stars/index',
    'pages/button/index',
    'pages/badge/index',
    'pages/modal/index',
    'pages/action-sheet/index',
    'pages/sku-list/index',
    'pages/input-search/index',
    'pages/test/index',

    'pages/components/index',
    'pages/textarea/index',
    'pages/pull-to-refresh/index',
    'pages/drop-down/index',
    'pages/stepper/index',
    'pages/search-input/index',
    'pages/toast/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
    navigationStyle: 'custom'
  },
  tabBar: {
    custom: true,
    list: [
      {
        pagePath: 'pages/index/index',
        text: ''
      },
      {
        pagePath: 'pages/components/index',
        text: ''
      }
    ]
  }
}
