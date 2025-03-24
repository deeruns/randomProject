import { StatusDto } from "../../dto/StatusDto";

export interface FeedItemsRequest{
    token: string,
    userAlias: string,
    pageSize: number,
    lastItem: StatusDto | null
}