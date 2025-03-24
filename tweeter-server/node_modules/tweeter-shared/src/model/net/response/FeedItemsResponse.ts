import { StatusDto } from "../../dto/StatusDto";
import { TweeterResponse } from "./TweeterResponse";

export interface FeedItemsResponse extends TweeterResponse{
    feed: StatusDto[],
    hasMorePages: boolean
}