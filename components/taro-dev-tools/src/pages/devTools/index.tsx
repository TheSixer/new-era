import MMDevTools from '../../components/devTools'

const apiOptions = ['https://web.px.t5.wmeimob.cn/devwaimai', 'https://web.px.t5.wmeimob.cn/uatwaimai']

export default () => {
  return <MMDevTools apiOptions={apiOptions} />
}
