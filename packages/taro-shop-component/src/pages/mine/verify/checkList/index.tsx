import { FC, memo, useEffect, useMemo, useState } from "react";
import CheckItem from "./components/checkItem";
import { ActivityOrderOutputDto, api } from "@wmeimob/taro-api";
import Searchbar from "../../../../components/searchbar";
import { MMEmpty, PageContainer } from '@wmeimob/taro-design'
import emptyImg from '../../../../assets/images/icon_empty.png'
import styles from './index.module.less';
import MMNavigation from "@wmeimob/taro-design/src/components/navigation";
import LoadingView from "../../../../components/loadingView";

const Component: FC = () => {
    const { loading, records } = useBasicService();
    const [kw, setKw] = useState('');

    const recoredsData =  useMemo(() => {
        if (kw) {
            return records.filter((record) => record?.activity?.name?.includes(kw) || record?.verifyCode?.includes(kw) || record?.name?.includes(kw))
        }
        return records
    }, [records, kw]);

    if (loading) {
      return <LoadingView />
    }

    return (
        <PageContainer className={styles.prefectureStyle} noPlace>
          <MMNavigation title="核销记录" type="Transparent" />
            <Searchbar placeholder='输入活动名称/姓名/核销码' onSearch={(value) => setKw(value)} />

            {recoredsData.map((record, index) => (
               <CheckItem data={record} key={index} />
            ))}

            { recoredsData.length === 0 && !loading && <MMEmpty fixed text='暂无数据' src={emptyImg} imgStyle={{ width: '64rpx', height: '64rpx' }} />}

        </PageContainer>
    )
}

const VerifyCode = memo(Component)
export default VerifyCode;

function useBasicService() {
    const [loading, setLoading] = useState(true);
    const [records, setRecords] = useState<ActivityOrderOutputDto[]>([]);

    const getRecords = async () => {
        setLoading(true);
        const { data = [] } = await api['/wechat/activity/myCheckRecord_GET']({});
        setRecords(data);
        setLoading(false);
    }

    useEffect(() => {
        getRecords();
    }, []);

    return { loading, records };
}