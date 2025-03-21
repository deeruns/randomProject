import { PagedUserItemResponse } from "tweeter-shared"
import { PagedUserItemRequest} from "tweeter-shared"
import { FollowService } from "../../model/service/FollowService"

//remove duplication with calls to functions

export const handler = async (request: PagedUserItemRequest): Promise<PagedUserItemResponse> => {
    //get the request data
    //call load more followees?
   //wrap what we are passing in a request object
   //return a promise that cotains userdto[] and boolean whether there is more data or not, a success indicator, or error message, items and whether we have more items
    //call an instance of the method and call follow service 
    const followService = new FollowService();
    const [items, hasMore] = await followService.loadMoreFollowees(request.token, request.userAlias, request.pageSize, request.lastItem);

    return {
        success: true,
        message: null,
        items: items,
        hasMore: hasMore
    }
}