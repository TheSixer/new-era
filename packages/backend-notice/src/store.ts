import { atom, useAtom } from 'jotai'
import { api } from './request'
import { StationMessageOutputDto } from './request/data-contracts'

export const noticesAtom = atom<StationMessageOutputDto[]>([])

export const unReadAtom = atom(0) // 未读数量

/**
 * 获取未读消息业务
 * @returns
 */
export function useUnRead() {
  const [unRead, setUnRead] = useAtom(unReadAtom)
  const [notices, setNotices] = useAtom(noticesAtom)

  async function getUnRead() {
    const { data = 0 } = await api['/notification/api/stationMessage/getUnReadTotal_GET']()
    setUnRead(data)
  }

  async function getUnReadList() {
    const { data = {} } = await api['/notification/api/stationMessage/query_GET']({ read: '0' })
    const { list = [], total = 0 } = data
    setNotices(list)
    setUnRead(total)
  }

  return {
    notices,
    setNotices,
    unRead,
    setUnRead,
    getUnRead,
    getUnReadList
  }
}
