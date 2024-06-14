import React, { CSSProperties } from "react";

export interface IBannerProps {
  title: string;
  subTitle: string;
  style?: CSSProperties;
  data: any[];
  renderItem?(p: any, i: number): React.ReactNode;
}
