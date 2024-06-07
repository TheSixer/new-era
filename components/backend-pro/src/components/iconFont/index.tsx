import React from 'react';
import './index.less';
import IconFontName from './name';

interface IIconFontProps {
  /**
   * 图标名称
   */
  value: IconFontName;
  /**
   * 图标颜色
   */
  color?: string;
  /**
   * 图标大小
   */
  size?: number;
}
const IconFont: React.FC<IIconFontProps> = ({ value, size, color }) => {
  const style: any = {};
  if (size !== undefined) {
    style.fontSize = size + 'px';
  }

  if (color !== undefined) {
    style.color = color;
  }

  return (
    <div className={`MMIconFont icon${value}`} style={style} />
  )
}

IconFont.defaultProps = {
  value: IconFontName.Index,
  color: undefined,
  size: 16
}

export default IconFont;
