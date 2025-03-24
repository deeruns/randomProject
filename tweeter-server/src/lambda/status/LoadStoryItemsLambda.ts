import { StoryItemsRequest, StoryItemsResponse } from "tweeter-shared";
import { StatusService } from "../../model/service/StatusService";

//remove duplication with calls to functions

export const handler = async (request: StoryItemsRequest): Promise<StoryItemsResponse> => {
    //get the request data with story items request
    // use status Items Dto 
    const statusService = new StatusService();
    const [statuses, hasMorePages] = await statusService.loadMoreStoryItems(request.token, request.userAlias, request.pageSize, request.lastItem);

    return {
        success: true,
        message: null,
        statuses: statuses,
        hasMorePages: hasMorePages
    }
}