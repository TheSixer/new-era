import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import React, { Component } from "react";
import MMImagePicker from "~/components/image-picker";
import MMNavigation from "~/components/navigation";
import { autobind } from "@wmeimob/decorator";

@autobind
export default class Index extends Component {
  state = {
    value: []
  };

  // componentWillMount() { }

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View style={{ height: "100%" }}>
        <MMNavigation title="图片选择器" />
        <View style={{ backgroundColor: "white" }}>
          <View className="container">
            <View className="spacing" />
            <MMImagePicker value={this.state.value} onChange={this.onChange} />
          </View>
          <View className="spacing" />
        </View>
      </View>
    );
  }

  private onChange(value) {
    this.setState({ value });
  }
}
