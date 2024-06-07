import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import React, { Component } from "react";
import { autobind } from "@wmeimob/decorator";
import MMNavigation from "~/components/navigation";
import MMPopover from "~/components/popover";
import IconFontName from "~/components/icon-font/const";
import { MMPopoverType } from "~/components/popover/const";
import MMItem from "~/components/item";

@autobind
export default class Index extends Component {
  state = {
    data: [],
    value: "4",
    visible: false,
    visible2: false,
    pickerValue: ["2", "4"]
  };

  render() {
    return (
      <View>
        <MMNavigation title="气泡" />
        <View className="container" style={{ position: "relative" }}>
          <View className="spacing" />
          {this.renderPopover()}
          {this.renderPopoverBlack()}
        </View>
      </View>
    );
  }

  private renderPopover() {
    const { visible } = this.state;
    return (
      <View
        style={{ position: "relative" }}
        onClick={() => this.setState({ visible: !visible })}
      >
        点击我
        <MMPopover
          visible={visible}
          onClick={this.onClick}
          data={[
            { value: "添加朋友", iconfont: IconFontName.Add },
            { value: "发起群聊", iconfont: IconFontName.Add },
            { value: "扫一扫", iconfont: IconFontName.Add },
            { value: "二维码", iconfont: IconFontName.Add }
          ]}
        />
      </View>
    );
  }

  private renderPopoverBlack() {
    const { visible2 } = this.state;
    return (
      <View
        style={{ position: "relative" }}
        onClick={() => this.setState({ visible2: !visible2 })}
      >
        点击我
        <MMPopover
          visible={visible2}
          type={MMPopoverType.black}
          onClick={this.onClick}
          data={[
            { value: "添加朋友", iconfont: IconFontName.Add },
            { value: "发起群聊", iconfont: IconFontName.Add },
            { value: "扫一扫", iconfont: IconFontName.Add },
            { value: "二维码", iconfont: IconFontName.Add }
          ]}
        />
      </View>
    );
  }

  private onClick(item) {
    console.log(item);
  }
}
