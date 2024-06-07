import { useState, useRef, useEffect } from 'react'
import { IMMPullToRefreshProps, IMMPullRefreshHookRefreshParams, MMPullToRefreshState, IMMPullRefreshHookReturn } from './const'

interface IUseMMPullToRefreshOption<T> {
  /** 默认数据 */
  defaultData?: T[]

  /** 额外传递参数 */
  params?: Record<string, any>

  /** 初始是否发出请求 */
  initRequest?: boolean

  /** 获取数据 */
  getData: (data: Record<string, any> & { pageNum: number }) => Promise<{ data?: { list?: T[]; isLastPage?: boolean; total?: number } }>

  /** 数据格式化 */
  dataFormat?(data: T[]): any[]
}

export default function useMMPullToRefresh<T>(config: IUseMMPullToRefreshOption<T>) {
  const { defaultData = [], params, initRequest = true } = config

  const [list, setList] = useState(defaultData)
  const [total, setTotal] = useState(0)
  const [noMore, setNoMore] = useState(false)
  const [pullToRefreshState, setPullToRefreshState] = useState(MMPullToRefreshState.none)
  const pageNum = useRef(0)

  const isInit = useRef(initRequest)

  const getListData = async (num?: number) => {
    if (num !== undefined) {
      pageNum.current = num
    } else {
      pageNum.current++
    }

    if (pageNum.current === 1) {
      setPullToRefreshState(MMPullToRefreshState.refreshing)
      // setData([]);
    } else {
      setPullToRefreshState(MMPullToRefreshState.pushing)
    }

    try {
      // 存在tab切换的页面。不清理滚动条位置不对
      if (pageNum.current === 1) {
        setList([])
      }

      const { data = {} } = await config.getData({ pageNum: pageNum.current, pageSize: 10, ...params })
      // eslint-disable-next-line prefer-const
      let { list: dataList = [], total: totalNum = -1, isLastPage } = data

      dataList = config.dataFormat ? config.dataFormat(dataList) : dataList

      if (pageNum.current === 1) {
        setList(dataList)
      } else {
        dataList = list.concat(dataList)
        setList(dataList)
      }
      setTotal(totalNum)

      // eslint-disable-next-line no-nested-ternary
      const no = isLastPage !== undefined ? !!isLastPage : totalNum !== -1 ? dataList.length >= totalNum : true
      setNoMore(no)
    } catch (error) {}
    setPullToRefreshState(MMPullToRefreshState.none)
  }

  /**
   * 更新某条数据的值
   *
   * @param updatedata
   */
  function updateById(updatedata: T) {
    setList(
      list.map((value) => {
        if ((value as any).id === (updatedata as any).id) {
          return { ...value, ...updatedata }
        }
        return value
      })
    )
  }

  /**
   * 更新列表中的数据
   *
   * @param {T} data 需要更新的数据
   * @param {(string | ((item: T, index: number) => boolean))} compare 比对逻辑
   */
  function updateLisItem(data: T, compare: string | ((item: T, index: number) => boolean)) {
    const isString = typeof compare === 'string'
    setList(
      list.map((value, index) => {
        if (isString) {
          return (value as any)[compare] === (data as any)[compare] ? { ...value, ...data } : value
        }
        return compare(value, index) ? { ...value, ...data } : value
      })
    )
  }

  useEffect(() => {
    if (!isInit.current) {
      isInit.current = true
    } else {
      getListData()
    }
  }, [])

  function onRefresh(refreshParams?: IMMPullRefreshHookRefreshParams) {
    if (refreshParams?.clearList) {
      setList([])
    }

    getListData(1)
  }

  const pullToRefreshProps: IMMPullRefreshHookReturn = {
    state: pullToRefreshState,
    noMore,
    onRefresh,
    onScrollToLower: () => getListData()
  }

  const info = {
    list,
    setList,

    total,

    updateById,

    updateLisItem,
    /**
     * 根据索引删除某条数据
     * @param index
     * @returns
     */
    deleteByIndex: (index: number) => setList((pre) => pre.filter((_v, idex) => index !== idex)),

    isEmpty: list.length === 0 && pullToRefreshState === MMPullToRefreshState.none
  }

  return [info, pullToRefreshProps] as const
}
