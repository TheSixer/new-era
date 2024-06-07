import { FC, memo, useEffect, useRef, useState } from 'react'
import { Canvas, View } from '@tarojs/components';
import styles from './index.module.less';
import Taro from '@tarojs/taro';

interface CountdownCircleProps {
  duration: number; // 倒计时总时长，单位为秒
  onComplete: () => void; // 倒计时结束时的回调函数
  size?: number; // 倒计时圆环的大小，单位为px
  strokeWidth?: number; // 倒计时圆环的宽度，单位为px
}

const Component: FC<CountdownCircleProps> = ({ duration, onComplete, size = 24, strokeWidth = 2 }) => {
  const canvasRef = useRef(null);
  const startTimeRef = useRef(Date.now());
  const requestRef = useRef<number>();

  useEffect(() => {
    const drawCircle = () => {
      const ctx = Taro.createCanvasContext('countdownCanvas');
      const radius = size / 2 - strokeWidth / 2;
      const currentTime = Date.now();
      const elapsed = (currentTime - startTimeRef.current) / 1000;
      const timeLeft = Math.max(duration - elapsed, 0); // 保留一位小数
      const timeShow = Math.floor(Math.max(duration - elapsed, 0)); // 保留一位小数
      const progress = timeLeft / duration;

      const circumference = 2 * Math.PI * radius;
      const offset = circumference * progress;

      // 清除画布
      ctx.clearRect(0, 0, size, size);

      // 绘制背景圆圈
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, radius, 0, 2 * Math.PI);
      ctx.setStrokeStyle('#e6e6e6');
      ctx.setLineWidth(strokeWidth);
      ctx.stroke();

      // 绘制进度圆圈（从底部开始）
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, radius, Math.PI / 2, Math.PI / 2 + 2 * Math.PI * progress, false);
      ctx.setStrokeStyle('#fff');
      ctx.setLineWidth(strokeWidth);
      ctx.stroke();

      // 绘制倒计时数字
      ctx.setFontSize(12);
      ctx.setFillStyle('#fff');
      ctx.setTextAlign('center');
      ctx.setTextBaseline('middle');
      ctx.fillText(`${timeShow}s`, size / 2, size / 2);

      ctx.draw();

      if (timeLeft > 0) {
        requestRef.current = requestAnimationFrame(drawCircle);
      } else {
        onComplete();
      }
    };

    requestRef.current = requestAnimationFrame(drawCircle);
    return () => cancelAnimationFrame(requestRef.current!);
  }, [duration, onComplete, size, strokeWidth]);

  return (
    <View className='countdown-circle' style={{ width: size, height: size }}>
      <Canvas canvasId='countdownCanvas' style={{ width: size, height: size }} ref={canvasRef} />
    </View>
  );
};

const CountdownCircle = memo(Component)
export default CountdownCircle;
