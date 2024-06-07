import { api } from './request'
import { TreeResourceVo } from '@wmeimob/backend-api'

export interface ICurrentUser {
  name: string
  email: string
  unreadCount?: number
}

/**
 * 获取用户信息
 * @returns
 */
export const fetchUserInfo = async () => {
  let authCodes: string[] = []
  let currentUser: ICurrentUser = { name: '', email: '' }
  try {
    const { data } = await api['/admin/api/sysUser/current-authorities_GET']()
    if (data) {
      const { buttons = [], menusTree = [], email = '', username = '' } = data
      authCodes = buttons.concat(getMenuCodesFromMenuTree(menusTree))
      currentUser = {
        name: username,
        email
      }
    }
  } catch (error) {}
  return { authCodes, currentUser }
}

function getMenuCodesFromMenuTree(data: TreeResourceVo[], codes: string[] = []) {
  return data.reduce((result, item) => {
    const { code = '', children = [] } = item
    result.push(code)
    if (children.length) {
      return getMenuCodesFromMenuTree(children, result)
    }

    return result
  }, codes)
}
