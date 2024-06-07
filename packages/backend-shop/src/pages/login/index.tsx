import { FC, memo, useState } from 'react'
import { Card } from 'antd'
import styles from './index.module.less'
import Logo from '~/assets/images/logo.png'
import LoginForm from './components/loginForm'
import RegisterForm from './components/registerForm'
import { useLocation } from 'react-router'
import { ECodeScene } from '~/enums/ECodeScene'

const Component: FC = () => {
  const { state = {} } = useLocation<{ from?: string; scene?: ECodeScene }>()

  const [scene, setScene] = useState(state.scene)

  return (
    <div className={styles.component}>
      <Card className={styles.card}>
        <div style={{ textAlign: 'center' }}>
          <img src={Logo} className={styles.logo} />
        </div>
        {!scene ? (
          <LoginForm
            onClick={(scene) => {
              setScene(scene)
            }}
          />
        ) : (
          <RegisterForm scene={scene} onLoginClick={() => setScene(undefined)} />
        )}
      </Card>
    </div>
  )
}

Component.displayName = 'MMPLogin'

const MMPLogin = memo(Component)
export default MMPLogin
