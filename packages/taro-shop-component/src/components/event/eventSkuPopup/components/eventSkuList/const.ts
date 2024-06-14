import { ActivityUnifyCreateInputDto } from "@wmeimob/taro-api";

export default interface IEventSkuProps {
    unify?: boolean
    data?: ActivityUnifyCreateInputDto[]
    onSelected(p?: string, r?: string): void
}