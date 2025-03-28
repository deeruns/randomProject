import { FollowResponse, followRequest } from "tweeter-shared";
import { FollowService } from "../../model/service/FollowService"

export const handler = async (request: followRequest): Promise<FollowResponse> => {

    const followService = new FollowService();
    const [followerCount, followeeCount] = await followService.follow(request.token, request.userToFollow);

    return {
        success: true,
        message: null,
        followerCount: followerCount,
        followeeCount: followeeCount
    }
}