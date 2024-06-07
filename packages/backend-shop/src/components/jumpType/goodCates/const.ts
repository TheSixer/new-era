import { DataNode } from "antd/lib/tree";
import { GoodCatesContent } from "../const";

export interface IGoodCatesProps {
  value?: GoodCatesContent
  onChange?: (data: GoodCatesContent) => void
}

export interface CateDataNode extends DataNode {
  level: number;
  children: CateDataNode[]
}


/**
 * 模拟商品类目数据
 *
 * @export
 * @param {string} [categoryNo='']
 * @return {*} 
 */
export function mockTreeGoodsCates(categoryNo = '') {
  const key = 'CG1'
  const values = ['家具家装', '医疗健康', '服饰鞋包', '运动户外', '生活服务', '家用电器', '汽车用品/配件', '美妆个护', '文化办公/玩乐', '3C数码', '收藏品', '健康保健', '母婴用品', '家居百货', '美食', '珠宝首饰', '宠物用品'];

  return Promise.resolve({
    data: values.map((value, index) => ({
      value,
      key: categoryNo + key + index
    }))
  })
}