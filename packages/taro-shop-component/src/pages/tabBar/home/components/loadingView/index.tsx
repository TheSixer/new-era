import { View, Image } from "@tarojs/components";
import styles from './index.module.less'
import loadingImg from './loading.gif'

const LoadingView = () => (
    <View className={styles.loadingView}>
        <Image src={loadingImg} className={styles.loadingImg} />
    </View>
)

export default LoadingView;
