import { StatusDto } from "../../dto/StatusDto";
import { TweeterResponse } from "./TweeterResponse";

export interface StoryItemsResponse extends TweeterResponse{
    statuses: StatusDto[],
    hasMorePages: boolean
}