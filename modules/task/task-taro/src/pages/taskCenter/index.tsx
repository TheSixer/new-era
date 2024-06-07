import { Image, View } from '@tarojs/components'
import Taro, { useDidShow } from '@tarojs/taro'
import { ETaskKey } from '@wmeimob-modules/task-data/src/enums/ETaskKey'
import { api } from '@wmeimob/taro-api'
import { MallConfUserTaskDTO, ScoreGetOutputDto, SigninInfoOutputDto } from '@wmeimob/taro-api/src/request/data-contracts'
import { MMEmpty, PageContainer, useToast } from '@wmeimob/taro-design'
import MMAvatar from '@wmeimob/taro-design/src/components/avatar'
import MMNavigation from '@wmeimob/taro-design/src/components/navigation'
import { getGlobalData } from '@wmeimob/taro-global-data'
import { useGlobalStore } from '@wmeimob/taro-store'
import { useAtomValue } from 'jotai'
import { FC, memo, ReactNode, useMemo, useState } from 'react'
import { isAlreadySignAtom } from '../../store'
import TaskCard from './components/taskCard'
import { taskButtonMap } from './components/taskCard/const'
import styles from './index.module.less'
import classNames from 'classnames'
import iconMobile from './images/icon_phone.png'
import empty from './images/empty.png'

interface ITaskCenterProps {
  /** 业务 */
  service: ReturnType<typeof useService>

  /** 点击任务 */
  onTaskClick(key: ETaskKey, data: MallConfUserTaskDTO | null, index: number | null)
}

const Component: FC<ITaskCenterProps> = (props) => {
  const { service } = props
  const { user } = useGlobalStore()

  const renderItem = (title: string, list: ReactNode) => (
    <>
      <View className={styles.task_title}>{title}</View>
      <View className={styles.taskList}>{list}</View>
    </>
  )
  const desensitizationMobile = useMemo(() => (user.mobile ? user.mobile.replace(/(\d{3})(\d+)(\d{4})/, '$1****$3') : '授权手机号'), [user.mobile])

  return (
    <PageContainer className={styles.taskCenterStyle}>
      <MMNavigation title="任务中心" place type="Transparent" />

      <View className={styles.head}>
        <MMAvatar src={user.headImg} size={62} shape="circle" />

        <View className={styles.head_content}>

          <View className={styles.head_name}>
            <View className={styles.nickName}>{user.nickName}</View>
            <View className={classNames(styles.info_item, styles.mobil)}>
              <Image src={iconMobile} className={styles.info_item_icon} />
              {desensitizationMobile}
            </View>
          </View>

          <View className={styles.head_intergal}>您当前有{service.scoreInfo?.availableScore}积分</View>
        </View>
      </View>

      <View className={styles.content}>
        {getGlobalData('systemConfig').config.enableSignTask &&
          service.signSetting?.enabled &&
          renderItem(
            '每日任务',
            <TaskCard
              name="签到"
              imgUrl={service.signSetting?.iconUrl}
              finish={service.isSign}
              isFinishClick
              rewardPoints={service.signSetting?.num}
              buttonMap={taskButtonMap[ETaskKey.sign]}
              onClick={() => props.onTaskClick(ETaskKey.sign, null, null)}
            />
          )}

        {service.taskList.length?renderItem(
          '固定任务',
          <>
            {service.taskList.map((task, index) => (
              <TaskCard
                key={task.id}
                name={task.name}
                imgUrl={task.imgUrl!}
                finish={task.finish}
                rewardPoints={task.rewardPoints}
                buttonMap={taskButtonMap[task.taskKey!]}
                onClick={() => props.onTaskClick(task.taskKey as ETaskKey, task, index)}
              />
            ))}
          </>
        ):<MMEmpty fixed text="暂时没有积分记录" src={empty} imgStyle={{ width: 160, height: 160 }} />}
      </View>
    </PageContainer>
  )
}

const PageTaskCenter = memo(Component)
export default PageTaskCenter

/**
 * 业务hook
 * @returns
 */
export function useService() {
  const [toast] = useToast()

  const [scoreInfo, setScoreInfo] = useState<ScoreGetOutputDto>()
  const [taskList, setTaskList] = useState<MallConfUserTaskDTO[]>([])
  const [signSetting, setSignSetting] = useState<SigninInfoOutputDto>()

  const isSign = useAtomValue(isAlreadySignAtom)

  const [mpModalVisible, setMpModalVisible] = useState(false)

  useDidShow(() => {
    getScoreInfo()
    getTasks()
    getSignTaskSetting()

    // if (mpModalVisible) {
    //   checkMpFollowStatus()
    // }
  })

  async function getScoreInfo() {
    const { data } = await api['/wechat/mall/score/get_GET']()
    setScoreInfo(data)
  }

  async function getTasks() {
    const { data = {} } = await api['/wechat/mall/userTaskConfig_GET']({})
    const { list = [] } = data
    setTaskList(list)
  }

  async function getSignTaskSetting() {
    const { data } = await api['/wechat/mall/signin/info_GET']()
    setSignSetting(data)
  }

  // 从公众号页面回来时，检测是否已关注
  // https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/union-id.html
  // 只要关注过同一主体的公众号，就会存在 unionId，即使关注后又取消关注
  async function checkMpFollowStatus() {
    toast?.loading()

    try {
      const { code } = await Taro.login()
      const { data: isFollow } = await api['/wechat/web/member/exists/unionId_GET']({ code })

      if (isFollow) {
        setMpModalVisible(false)
        await api['/wechat/mall/userTaskConfig/perform_PUT']({ taskKey: ETaskKey.followMp })
        toast?.message('关注公众号成功')
      }
    } catch (error) {}

    try {
      await getTasks()
    } catch (error) {}

    toast?.hideLoading()
  }

  async function handleShowFollowModal() {
    setMpModalVisible(true)
    await api['/wechat/mall/userTaskConfig/perform_PUT']({ taskKey: ETaskKey.followMp })
    toast?.message('关注公众号成功')
    try{
      await getTasks()
      await getScoreInfo()
    }catch (error){}
  }

  function handleCloseFollowModal() {
    setMpModalVisible(false)
  }

  return {
    scoreInfo,
    signSetting,
    isSign,
    taskList,
    mpModalVisible,
    handleShowFollowModal,
    handleCloseFollowModal
  }
}
