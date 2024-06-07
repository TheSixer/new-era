import * as ShopConfig from './config'
import merge from 'deepmerge'

type Config = typeof ShopConfig

type DeepPartial<T> = Partial<{ [P in keyof T]: DeepPartial<T[P]> }>

/**
 * 定义商城系统配置
 * 可以用于覆盖默认配置
 * @export
 * @param {DeepPartial<Config>} [override={}]
 * @return {*}
 */
export function defineShopConfig(override: DeepPartial<Config> = {}) {
  return merge(ShopConfig, override) as Config
}
