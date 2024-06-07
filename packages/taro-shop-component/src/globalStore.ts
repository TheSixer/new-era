import { useGlobalStore as useGlobal } from '@wmeimob/taro-store'
export * from '@wmeimob/taro-store'

export default function useGlobalStore(getUser?: boolean) {
  return useGlobal(getUser)
}
