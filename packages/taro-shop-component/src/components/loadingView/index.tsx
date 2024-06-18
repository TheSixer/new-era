import { View, Image } from "@tarojs/components";
import styles from './index.module.less'
import { ILoadingViewProps } from "./const";
import { FC } from "react";

const LoadingView: FC<ILoadingViewProps> = ({ style }) => (
    <View className={styles.loadingView} style={{...(style || {})}}> 
        <View className={styles.spinner}> </View>
    </View>
)

export default LoadingView;
