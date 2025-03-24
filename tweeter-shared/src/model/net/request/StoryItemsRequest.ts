import { StatusDto } from "../../dto/StatusDto";

export interface StoryItemsRequest{
    token: string,
    userAlias: string,
    pageSize: number,
    lastItem: StatusDto | null
}