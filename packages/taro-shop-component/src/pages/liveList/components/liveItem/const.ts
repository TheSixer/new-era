import { CollectionVo } from '@wmeimob/taro-api';

export interface ICollectionItemProps {
  data: CollectionVo

  onDelete: () => Promise<boolean>
}
