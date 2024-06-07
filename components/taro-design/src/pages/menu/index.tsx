import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import React, { Component } from "react";
import MMMenu from "~/components/menu";
import MMNavigation from "~/components/navigation";
import { autobind } from "@wmeimob/decorator";

@autobind
export default class Index extends Component {
  state = {
    value: ["1", "12"]
  };

  render() {
    return (
      <View>
        <MMNavigation title="菜单" />
        <MMMenu
          value={this.state.value}
          onChange={this.onChange}
          data={[
            {
              text: "一级选中",
              value: "1",
              children: [
                {
                  text: "全部",
                  value: "12"
                },
                {
                  text: "二级选中二级选中二级选中二级选中二级选中二级选中",
                  value: "13"
                },
                {
                  text: "二级选中二级选中二级选中二级选中二级选中二级选中",
                  value: "14"
                },
                {
                  text: "二级选中二级选中二级选中二级选中二级选中二级选中",
                  value: "15"
                },
                {
                  text: "二级选中二级选中二级选中二级选中二级选中二级选中",
                  value: "16"
                },
                {
                  text: "二级选中二级选中二级选中二级选中二级选中二级选中",
                  value: "17"
                },
                {
                  text: "二级选中二级选中二级选中二级选中二级选中二级选中",
                  value: "18"
                },
                {
                  text: "二级选中二级选中二级选中二级选中二级选中二级选中",
                  value: "19"
                },
                {
                  text: "二级选中二级选中二级选中二级选中二级选中二级选中",
                  value: "110"
                },
                {
                  text: "二级选中二级选中二级选中二级选中二级选中二级选中",
                  value: "111"
                },
                {
                  text: "二级选中二级选中二级选中二级选中二级选中二级选中",
                  value: "112"
                }
              ]
            },
            {
              text: "热轧热轧热轧热轧热轧热轧热轧热轧",
              value: "2",
              children: [
                {
                  text: "全部",
                  value: "22"
                }
              ]
            }
          ]}
        />
      </View>
    );
  }

  private onChange(value) {
    this.setState({
      value
    });
  }
}
