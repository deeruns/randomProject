import { StatusService } from "../../model/service/StatusService"
import { PostStatusRequest, PostStatusResponse } from "tweeter-shared";
//remove duplication with calls to functions

export const handler = async (request: PostStatusRequest): Promise<PostStatusResponse> => {
    const statusService = new StatusService();
    await statusService.postStatus(request.token, request.newStatus);

    return {
        success: true,
        message: null,
    }
}