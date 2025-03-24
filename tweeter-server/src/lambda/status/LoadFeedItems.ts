import { StatusService } from "../../model/service/StatusService"
import { FeedItemsRequest, FeedItemsResponse } from "tweeter-shared";

//remove duplication with calls to functions

export const handler = async (request: FeedItemsRequest): Promise<FeedItemsResponse> => {
    //get the request data with story items request
    // use status Items Dto 
    const statusService = new StatusService();
    const [feed, hasMorePages] = await statusService.loadMoreFeedItems(request.token, request.userAlias, request.pageSize, request.lastItem);

    return {
        success: true,
        message: null,
        feed: feed,
        hasMorePages: hasMorePages
    }
}