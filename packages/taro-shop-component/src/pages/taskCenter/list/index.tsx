import Taro from '@tarojs/taro'
import { ETaskKey } from '@wmeimob-modules/task-data/src/enums/ETaskKey'
import QrCodeModal from '@wmeimob-modules/task-taro/src/components/qrCodeModal'
import PageTaskCenter, { useService } from '@wmeimob-modules/task-taro/src/pages/taskCenter'
import { FC, memo } from 'react'
import { routeNames } from '../../../routes'

interface IListProps {}

const Component: FC<IListProps> = () => {
  const service = useService()

  /**
   * 处理任务点击事件
   */
  const handleTaskClick = (taskKey: ETaskKey, data) => {
    const fn = {
      // 首购物前往商品列表页面
      [ETaskKey.firstPurchase]: () => Taro.navigateTo({ url: routeNames.goodsGoodsList }),

      // 关注公众号跳转公众号页面。并完成任务
      [ETaskKey.followMp]: () => {
        service.handleShowFollowModal()
      },

      // 跳转签到页面
      [ETaskKey.sign]: () => Taro.navigateTo({ url: routeNames.taskCenterSignTask })
    }[taskKey]

    fn?.()
  }

  return (
    <>
      <PageTaskCenter service={service} onTaskClick={handleTaskClick} />
      <QrCodeModal visible={service.mpModalVisible} onClose={service.handleCloseFollowModal} />
    </>
  )
}

const List = memo(Component)
export default List
