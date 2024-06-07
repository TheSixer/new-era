import { useEffect, memo, FC } from 'react'
import { View } from '@tarojs/components';
import dayjs from 'dayjs';
import MMModal from '../modal';
import { MMModalAnimationType, MMModalJustifyContent } from '../modal/const';
import { MMDatePickerType } from './const';
import useMMDatePicker from './hooks';
import MMDatePickerView from './view';
import styles from './index.modules.less';
import MMModalPopupTitle from '../modal/title';

export interface IMMDatePickerRangeProps {

  /**
   * 默认选中时间
   *
   * @type {Date}
   * @memberof IMMImagePickerProps
   */
  defaultValue?: [Date, Date]

  /**
   * 当前时间
   */
  value?: [Date, Date]


  /**
   * 类型
   *
   * @type {MMDatePickerType}
   * @memberof IMMDatePickerProps
   */
  type?: MMDatePickerType

  /**
   * 图片值
   *
   * @type {string[]}
   * @memberof IMMImagePickerProps
   */
  minDate?: Date

  /**
   * 图片值
   *
   * @type {string[]}
   * @memberof IMMImagePickerProps
   */
  maxDate?: Date

  /**
   * 是否显示
   *
   * @type {boolean}
   * @memberof IMMDatePickerProps
   */
  visible?: boolean

  /**
   * 点击确定事件
   *
   * @memberof MMPickerProps
   */
  onOk?: (value: [Date, Date]) => void;

  /**
   * 点击取消
   *
   * @memberof MMPickerProps
   */
  onCancel?: () => void;


  /**
   * 标题
   */
  title?: string
}

const Component: FC<IMMDatePickerRangeProps> = ((props) => {
  const { visible = true, title, onCancel, value = [] } = props;
  const dataPickerProps = {
    type: props.type,
    minDate: props.minDate,
    maxDate: props.maxDate
  }
  const startHooks = useMMDatePicker(dataPickerProps);
  const endHooks = useMMDatePicker(dataPickerProps);

  function onOk() {
    props.onOk && props.onOk(startHooks.value.getTime() > endHooks.value.getTime() ?
      [endHooks.value, startHooks.value] : [startHooks.value, endHooks.value])
  }

  const format = {
    [MMDatePickerType.date]: "YYYY-MM-DD",
    [MMDatePickerType.time]: "HH:mm",
    [MMDatePickerType.dateTime]: "YYYY-MM-DD HH:mm",
    [MMDatePickerType.year]: "YYYY",
    [MMDatePickerType.month]: "MM",
    [MMDatePickerType.hourTime]: "MM-DD HH",
  }[props.type !== undefined ? props.type : MMDatePickerType.time];

  useEffect(() => {
    if (value[0]) {
      startHooks.setValue(value[0]);
    }
    if (value[1]) {
      endHooks.setValue(value[1]);
    }
  }, [props.value])

  useEffect(() => {
    startHooks.setVisible(true);
    endHooks.setVisible(false);
  }, [props.visible])



  return (<MMModal visible={visible} animationType={MMModalAnimationType.down}
    justifyContent={MMModalJustifyContent.flexEnd} onClose={props.onCancel}  >
    <View className={styles.modal}>
      <MMModalPopupTitle onCancel={onCancel}
        onOk={onOk} title={title} />
      <View className={styles.timeRange}>
        <View onClick={() => {
          startHooks.setVisible(true);
          endHooks.setVisible(false)
        }}>
          {startHooks.value && dayjs(startHooks.value).format(format)}
        </View>
        <View onClick={() => {
          endHooks.setVisible(true);
          startHooks.setVisible(false)
        }}>
          {endHooks.value && dayjs(endHooks.value).format(format)}
        </View>
      </View>
      {startHooks.visible && <MMDatePickerView {...startHooks} />}
      {endHooks.visible && <MMDatePickerView {...endHooks} />}
    </View>
  </MMModal>)
})

const MMDatePickerRange = memo(Component);
MMDatePickerRange.defaultProps = {
  type: MMDatePickerType.date,
  minDate: new Date(),
  maxDate: dayjs().add(10, 'year').toDate()
}
export default MMDatePickerRange;


