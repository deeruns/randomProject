import { StatusDto } from "../../dto/StatusDto";
import { TweeterRequest } from "./TweeterRequest";

export interface StoryItemsRequest extends TweeterRequest{
    token: string,
    userAlias: string,
    pageSize: number,
    lastItem: StatusDto | null
}