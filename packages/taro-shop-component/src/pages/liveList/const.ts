export enum ELiveStatus  {
  Creating='Creating',
  LiveIng='LiveIng',
  Playback='Playback',
  Preview='Preview',
  Stop='Stop',
}

/** 描述数据 */
export const MLiveStatus = {
  [ELiveStatus.Creating]: '创建中',
  [ELiveStatus.LiveIng]: '直播中',
  [ELiveStatus.Playback]: '回放',
  [ELiveStatus.Preview]: '预告',
  [ELiveStatus.Stop]: '已结束'
}
