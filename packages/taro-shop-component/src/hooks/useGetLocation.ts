import Taro from "@tarojs/taro";
import { useEffect, useState } from "react";

export interface ILocation {
  latitude?: number;
  longitude?: number;
}

export default function useGetLocation() {
  const [location, setLocation] = useState<ILocation>({});

  useEffect(() => {
    Taro.authorize({
      scope: 'scope.userLocation',
      success() {
        // 用户已经同意授权
        getLocation()
      },
      fail() {
        // 用户拒绝授权，引导用户到设置页开启授权
        Taro.showModal({
          title: '授权提示',
          content: '请前往设置开启位置信息授权',
          success(res) {
            if (res.confirm) {
              Taro.openSetting({
                success(settingRes) {
                  if (settingRes.authSetting['scope.userLocation']) {
                    // 用户已同意授权，重新获取位置
                    getLocation();
                  }
                }
              });
            }
          }
        });
      }
    });
  }, []);

  const getLocation = () => {
    Taro.getLocation({
      type: 'wgs84',
      success(res) {
        setLocation({
            latitude: res?.latitude,
            longitude: res?.longitude
        });
      },
      fail() {
        Taro.showToast({
          title: '获取位置失败',
          icon: 'none'
        });
      }
    });
  }

  return {
    location
  }
}