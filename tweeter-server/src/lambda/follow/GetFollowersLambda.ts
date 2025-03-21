import { PagedUserItemRequest, PagedUserItemResponse } from "tweeter-shared";
import { FollowService } from "../../model/service/FollowService";

export const handler = async (request: PagedUserItemRequest): Promise<PagedUserItemResponse> => {
    const followService = new FollowService();
    const [items, hasMore] = await followService.loadMoreFollowers(request.token, request.userAlias, request.pageSize, request.lastItem);

    //returning a paged item response
    return {
        success: true,
        message: null,
        items: items,
        hasMore: hasMore
    }
    
}