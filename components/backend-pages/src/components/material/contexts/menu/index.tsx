import { FC, memo } from 'react'
import { Menu } from 'antd'
import { FileImageOutlined, VideoCameraOutlined } from '@ant-design/icons'
import { useConsumer } from '../context'
import { MaterialType } from '../../const'

interface IProps {}

/**
 * 素材菜单
 */
const MaterialUpload: FC<IProps> = (props) => {
  const { state, dispatch } = useConsumer()

  return (
    <Menu mode="horizontal" selectedKeys={[String(state.type)]} onClick={(event) => dispatch({ type: 'ChangeType', selected: Number(event.key) })}>
      <Menu.Item key={MaterialType.Image} icon={<FileImageOutlined />}>
        图片
      </Menu.Item>
      <Menu.Item key={MaterialType.Video} icon={<VideoCameraOutlined />}>
        视频
      </Menu.Item>
    </Menu>
  )
}

export default memo(MaterialUpload)
