import { FC } from "react";
import styles from "./index.module.less";
import { View } from "@tarojs/components";
import { ICellProps } from "./const";

const Component: FC<ICellProps> = () => {
    return (
        <View className={styles.tips_view}>
            <View className={styles.tips_title}>注意事项</View>
            <View className={styles.tips__text}>1、爱护场地设备，不损坏不破坏。注意保护自身财产。爱护场地设备，不损坏不破坏。注意保护自身财产。</View>
            <View className={styles.tips__text}>1、爱护场地设备，不损坏不破坏。注意保护自身财产。</View>
            <View className={styles.tips__text}>1、爱护场地设备，不损坏不破坏。注意保护自身财产。</View>
        </View>
    )
}

export default Component;