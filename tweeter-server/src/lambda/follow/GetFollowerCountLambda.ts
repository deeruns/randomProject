import { getFollowCountRequest, getFollowCountResponse } from "tweeter-shared";
import { FollowService } from "../../model/service/FollowService";

export const handler = async (request: getFollowCountRequest): Promise<getFollowCountResponse> => {
    const followService = new FollowService();
    const  followerCount = await followService.getFollowerCount(request.token, request.user);

    return {
        success: true,
        message: null,
        followCount: followerCount
    }
}