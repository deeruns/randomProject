import { StatusDto } from "../../dto/StatusDto";
import { TweeterRequest } from "./TweeterRequest";

export interface FeedItemsRequest extends TweeterRequest{
    token: string,
    userAlias: string,
    pageSize: number,
    lastItem: StatusDto | null
}