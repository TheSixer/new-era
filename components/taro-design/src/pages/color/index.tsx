import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import React, { Component } from "react";
import H2 from "~/components/head/h2";
import styles from "./index.module.less";
import MMNavigation from "~/components/navigation";
import { autobind } from "@wmeimob/decorator";

interface IColor {
  key: string;
  title: string;
  intro: string;
}

interface IState {
  list: any[];
  colors: IColor[];
}

@autobind
export default class Index extends Component {
  state: IState = {
    list: new Array(10).fill("1"),
    colors: [
      {
        key: "red",
        title: "Red/红色",
        intro: `主色：${styles["red"]}（红色代表兴奋、热情，能刺激用户消费。常出现在电商/清仓场景）`
      },
      {
        key: "orange",
        title: "Orange/橙色",
        intro: `主色：${styles["orange"]}（橙色代表活力、有生气，呼叫意味浓厚，常用于创建下订单、购买、出售的行动）`
      },
      {
        key: "yellow",
        title: "Yellow/黄色",
        intro: `主色：${styles["yellow"]}（黄色代表快乐、开心，常用于吸引注意力的购物窗口）`
      },
      {
        key: "green",
        title: "Green/绿色",
        intro: `主色：${styles["green"]}（绿色代表活力、有生气，能让放轻松、缓解压力，常用于学习、交流、操作成功）`
      },
      {
        key: "cyan",
        title: "Cyan/青色",
        intro: `主色：${styles["green"]}（青色属于冷色调，代表着冷静沉稳，同时使人的心情感到清爽、舒适）`
      },
      {
        key: "blue",
        title: "Blue/蓝色",
        intro: `主色：${styles["green"]}（蓝色代表信任、自信、希望、未来，常用于企业、银行、商业机构等，是APP最常用主色）`
      },
      {
        key: "purple",
        title: "Purple/紫色",
        intro: `主色：${styles["purple"]}（紫色代表神秘、奢华、高贵，主要用于音乐、艺术、女性相关的产品等）`
      },
      {
        key: "pink",
        title: "Pink/粉色",
        intro: `主色：${styles["pink"]}（粉色代表年轻、浪漫，常用于婴幼儿、母婴类、年轻女性类的产品）`
      },
      {
        key: "gray",
        title: "中性色",
        intro: `以下中性色由黑、白、灰组成。白色与黑色皆为100%不透明度，而灰色则是通过降低黑色不透明度实现的.`
      }
    ]
  };

  // componentWillMount() { }

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View>
        <MMNavigation title="色彩" />
        <View className="container">
          <View className="spacing" />
          <View>
            原理是利用Ant
            Design提供的“色彩生成算法”生成完整的色板。中性色则是在纯黑色/白色的基础上，通过降低不透明度的方式来实现的。
          </View>
          <View className={styles.colorList}>{this.renderList()}</View>
          <View className="spacing" />
        </View>
      </View>
    );
  }

  renderList() {
    const { colors } = this.state;
    return colors.map((color) => (
      <View key={color.key} className={styles.list}>
        <View className="spacing" />
        <H2>{color.title}</H2>
        <View className="spacingSmall" />
        <View>{color.intro}</View>
        <View className="spacingSmall" />
        <View>{this.renderItem(color)}</View>
      </View>
    ));
  }

  renderItem(color: IColor) {
    const { list } = this.state;
    return list.map((value, index) => (
      <View
        key={index + value}
        className={styles.item}
        style={"background-color:" + styles[color.key + (index + 1)]}
      >
        {styles[color.key + (index + 1)]}
      </View>
    ));
  }
}
