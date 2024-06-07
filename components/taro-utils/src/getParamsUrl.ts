import URLSearchParams from 'url-search-params'

export default function getParamsUrl(url, params={}) {
  return url + '?' + new URLSearchParams(params).toString()
}
