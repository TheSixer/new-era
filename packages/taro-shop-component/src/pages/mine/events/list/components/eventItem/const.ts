import { ActivityOrderOutputDto, ActivityOutputDto } from "@wmeimob/taro-api";

export interface IEventInfoProps {
    single?: boolean;
    data?: ActivityOutputDto;
    toDetail?(p: ActivityOrderOutputDto | ActivityOutputDto): void;
}
