import { FC } from "react";
import styles from "./index.module.less";
import { View, Text } from "@tarojs/components";
import { ICellProps } from "./const";

const Component: FC<ICellProps> = (props) => {
    const { title, value } = props;
    return (
        <View className={styles.cell_view}>
            <View className={styles.cell_left}>{title}</View>
            <View className={styles.cell_right}>
                <Text>{value}</Text>
            </View>
        </View>
    )
}

export default Component;