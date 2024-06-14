export enum EGlobalDataKey {
  Tabs = 'tabs',
  DefaultColor = 'defaultColor',
  ActiveColor = 'activeColor',
  Logo = 'logo',
  Name = 'name',
  Province = 'province'
}

interface IGlobalData {
  [EGlobalDataKey.Tabs]: Record<string, any>[],
  [EGlobalDataKey.DefaultColor]: string;
  [EGlobalDataKey.ActiveColor]: string;
  [EGlobalDataKey.Logo]: string;
  [EGlobalDataKey.Name]: string;
  [EGlobalDataKey.Province]: string;
}

let globalData: IGlobalData = {
  logo: '',
  name: '',
  province: '',
  activeColor: '#1890ff',
  defaultColor: '#999999',
  tabs: []
};

// get overload
export function getGlobalData<K extends keyof IGlobalData>(key: K): IGlobalData[K] {
  return globalData[key]
}

// set overload
export function setGlobalData<K extends keyof IGlobalData>(key: K, val: IGlobalData[K]): void;
export function setGlobalData(data: Partial<IGlobalData>): void;
export function setGlobalData(key: any, val?: any): any {
  if (typeof key === 'object') {
    globalData = { ...globalData, ...key };
  } else if (typeof key === 'string') {
    globalData[key] = val
  }
}
