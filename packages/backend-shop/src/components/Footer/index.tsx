import { GithubOutlined } from '@ant-design/icons'
import { DefaultFooter } from '@ant-design/pro-layout'

const Footer: React.FC = () => {
  const defaultMessage = '微盟软件出品'
  const currentYear = new Date().getFullYear()
  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'wmeimob',
          title: '微盟软件',
          href: 'https://www.wmeimob.com',
          blankTarget: true
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/ant-design/ant-design-pro',
          blankTarget: true
        },
        {
          key: 'Ant Design Pro',
          title: 'Ant Design Pro',
          href: 'https://pro.ant.design',
          blankTarget: true
        }
      ]}
    />
  )
}

export default Footer
