import { memo, FC, useState } from 'react'
import styles from './index.module.less'
import MMIndexBar from '../../components/index-bar'
import MMNavigation from '../..//components/navigation'
import MMCell from '../../components/cell'
import MMCard from '../../components/card'
import MMButton from '../../components/button'
import MMSpace from '../../components/space'
import { PageContainer, useToast } from '../../components'

interface IIndexBarProps {}

const Component: FC<IIndexBarProps> = (props) => {
  // const {} = props;
  const [toast] = useToast()
  const { citys } = useCitys()

  return (
    <PageContainer className={styles.indexBarStyle}>
      <MMNavigation title="索引栏" />
      <MMIndexBar
        header={{
          index: 'header',
          brief: '#',
          headerRender: (
            <MMCard title="热门城市">
              <MMSpace>
                <MMButton size="small">上海</MMButton>
                <MMButton size="small">北京</MMButton>
                <MMButton size="small">广州</MMButton>
              </MMSpace>
            </MMCard>
          )
        }}
        onIndexChange={(cindex) => {
          console.log('索引变了', cindex)
        }}
      >
        {citys.map((py) => {
          return (
            <MMIndexBar.Anchor key={py.index} index={py.index} title={py.index} brief={`${py.index}1`}>
              {py.items.map((item) => {
                return (
                  <MMCell
                    key={`${py.index}${item}`}
                    title={item}
                    onClick={() => {
                      toast?.message(`${item}`)
                    }}
                  />
                )
              })}
            </MMIndexBar.Anchor>
          )
        })}
      </MMIndexBar>
    </PageContainer>
  )
}

const IndexBarPage = memo(Component)
export default IndexBarPage

function useCitys() {
  const [citys, setCitys] = useState([
    { index: 'A', items: ['安庆', '阿泰勒', '安康', '阿克苏'] },
    { index: 'B', items: ['北京', '包头', '北海', '百色', '保山'] },
    { index: 'C', items: ['重庆', '成都', '长沙', '长治', '长春', '常州', '昌都', '朝阳', '常德', '长白山', '赤峰'] },
    { index: 'D', items: ['大同', '大连', '达县', '东营', '大庆', '丹东', '大理', '敦煌'] },
    { index: 'E', items: ['鄂尔多斯', '恩施'] },
    { index: 'F', items: ['福州', '阜阳'] },
    { index: 'G', items: ['广州', '贵阳', '桂林', '广元', '格尔木'] },
    { index: 'H', items: ['杭州', '合肥', '呼和浩特', '哈密', '黑河', '海拉尔', '哈尔滨', '海口', '黄山', '邯郸', '汉中', '和田'] },
    { index: 'J', items: ['晋江', '锦州', '景德镇', '嘉峪关', '井冈山', '济宁', '九江', '佳木斯', '济南'] },
    { index: 'K', items: ['喀什', '昆明', '康定', '克拉玛依', '库尔勒', '库车'] },
    { index: 'L', items: ['兰州', '洛阳', '丽江', '林芝', '柳州', '泸州', '连云港', '黎平', '连成', '拉萨', '临沧', '临沂'] },
    { index: 'M', items: ['芒市', '牡丹江', '满洲里', '绵阳', '梅县', '漠河'] },
    { index: 'N', items: ['南京', '南昌', '内蒙古', '南充', '南宁', '南阳', '南通', '那拉提', '宁波'] },
    { index: 'P', items: ['攀枝花'] },
    { index: 'Q', items: ['青岛', '衢州', '秦皇岛', '庆阳', '齐齐哈尔'] },
    { index: 'S', items: ['上海', '深圳', '苏州', '三亚', '石家庄', '沈阳', '思茅'] },
    { index: 'T', items: ['天津', '铜仁', '塔城', '腾冲', '台州', '通辽', '太原'] },
    { index: 'W', items: ['威海', '梧州', '文山', '无锡', '潍坊', '武夷山', '乌兰浩特', '温州', '乌鲁木齐', '万州', '乌海'] },
    { index: 'X', items: ['厦门', '西安', '西藏', '兴义', '西昌', '襄樊', '西宁', '锡林浩特', '西双版纳', '徐州'] },
    { index: 'Y', items: ['义乌', '永州', '榆林', '延安', '运城', '烟台', '银川', '宜昌', '宜宾', '盐城', '延吉', '玉树', '伊宁'] },
    { index: 'Z', items: ['珠海', '昭通', '张家界', '舟山', '郑州', '中卫', '芷江', '湛江'] }
  ])

  return {
    citys
  }
}
