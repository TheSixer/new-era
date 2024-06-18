import { View, Text } from "@tarojs/components";
import { FC, memo } from "react";
import styles from "./index.module.less";
import { ICheckItemProps } from "./const";

const Component: FC<ICheckItemProps> = (props) => {
    const { data } = props;

    return (
        <View className={styles.verify_item}>
            <View className={styles.verify_item_time}>{data?.checkTime}</View>
            <View className={styles.verify_item_contain}>
                <View className={styles.verify_item_title}>
                    {data?.activity?.name}
                </View>
                <View className={styles.verify_item_content}>
                    <View className={styles.verify_item_title_text}>姓名：{data?.name}</View>
                    <View className={styles.verify_item_title_text}>座位区域：{data?.areaName} <Text style={{ marginLeft: 40 }}>座位号：{data?.rowNumber}-{data.seatNo}</Text></View>
                    
                    <View className={styles.verify_item_title_text}>活动场次：{data?.unifyName}</View>
                </View>
                <View className={styles.verify_item_title_text}>核销码：{data?.verifyCode}</View>
            </View>
        </View>
    )
}

const VerifyCode = memo(Component)
export default VerifyCode;