/* eslint-disable id-length */
import { FC, memo, useEffect, useState } from 'react'
import { View, Text } from '@tarojs/components'
import { IMonthsProps } from './const'
import styles from './index.module.less';
import classNames from 'classnames';

const getMonthNumbers = (date) => {
  const months: number[] = [];
  const currentMonth = date.getMonth() + 1; // getMonth() 返回的月份是从0开始的，所以要加1

  // 获取前两个月
  for (let i = 2; i > 0; i--) {
    const prevMonth = (currentMonth - i + 12 - 1) % 12 + 1; // +12 -1 和 %12 后再 +1 确保结果在1-12之间
    months.push(prevMonth);
  }

  // 获取当前月份
  months.push(currentMonth);

  // 获取下一个月
  const nextMonth = (currentMonth % 12) + 1;
  months.push(nextMonth);

  return months;
};

const Component: FC<IMonthsProps> = ({ onChange }) => {
  const [months, setMonths] = useState<number[]>([]);
  const [currentMonth, setCurrentMonth] = useState<number>();

  useEffect(() => {
    const currentDate = new Date();
    const monthNumbersArray = getMonthNumbers(currentDate);
    setMonths(monthNumbersArray);

    setCurrentMonth(monthNumbersArray[2]);
    onChange?.(monthNumbersArray[2]);
  }, []);

  const handleChange = (month) => {
    setCurrentMonth(month);
    onChange?.(month);
  }

  return (
    <View className={styles.months_container}>
      {months.map((month, index) => (
        <View
          className={classNames(styles.month, { [styles.active]: month === currentMonth })}
          onClick={() => handleChange(month)}
          key={index}><Text className={styles.month_text}>{month}</Text> 月</View>
      ))}
    </View>
  )
}

const Months = memo(Component)
export default Months
