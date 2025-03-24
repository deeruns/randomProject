import { getFollowCountRequest, getFollowCountResponse } from "tweeter-shared";
import { FollowService } from "../../model/service/FollowService";

export const handler = async (request: getFollowCountRequest): Promise<getFollowCountResponse> => {
    const followService = new FollowService();
    const  followeeCount = await followService.getFolloweeCount(request.token, request.user);

    return {
        success: true,
        message: null,
        followCount: followeeCount
    }
}

//failing