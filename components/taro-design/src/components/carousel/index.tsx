import { Swiper, SwiperItem, View } from '@tarojs/components';
import { PureComponent } from 'react';
import classname from 'classnames';
import styles from './index.modules.less';

interface IMMCarouselProps {
  /**
   * 轮播图
   *
   * @type {string[]}
   * @memberof IMMCarouselProps
   */
  images: string[];

  /**
   * 图片样式
   *
   * @type {(string | React.CSSProperties | undefined)}
   * @memberof IMMCarouselProps
   */
  imagesStyle?: React.CSSProperties;

  /**
   * 自动动画
   *
   * @type {Boolean}
   * @memberof IMMCarouselProps
   */
  autoplay?: boolean;

  /**
   * 点击图片事件
   */
  onClick?: (index: number) => void;
}

interface IMMCarouselState {
  current: number;
  scrollLeft: number;
  touched: boolean;
}

/**
 * @name 走马灯
 * @autobind tarobug: 加装饰器会导致Render Props失败
 */
export default class MMCarousel extends PureComponent<IMMCarouselProps, IMMCarouselState> {
  static defaultProps = {
    renderItem: null,
    images: [],
    imagesStyle: {},
    autoplay: true,
    onclick() {
    }
  };

  static options = {
    addGlobalClass: true,
    styleIsolation: 'apply-shared'
  };

  state: IMMCarouselState = {
    current: 0,
    scrollLeft: -1,
    touched: false
  };

  render() {
    const { current } = this.state;
    const { images, imagesStyle, autoplay, onClick } = this.props;
    return (
      <View className={styles.MMCarouselStyle}>
        <Swiper
          className={styles.MMCarouselStyle}
          current={current}
          autoplay={autoplay}
          onChange={event => this.setState({ current: event.detail.current })}
        >
          {images.map((value, index) => (
            <SwiperItem className={styles.item} key={value + index}>
              <View
                className={styles.image}
                style={{
                  backgroundImage: `url(${value})`,
                  ...imagesStyle
                }}
                onClick={() => onClick!(index)}
              />
            </SwiperItem>
          ))}
        </Swiper>

        <View className={styles.dot}>
          {images.map((_value, index) => (
            <View
              className={classname(
                styles.dotItem,
                this.state.current === index ? classname(styles.dotItem__selected) : ''
              )}
              key={_value + index}
            />
          ))}
        </View>
      </View>
    );
  }
}
