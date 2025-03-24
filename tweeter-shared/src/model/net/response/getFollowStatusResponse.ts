import { TweeterResponse } from "./TweeterResponse";

export interface getFollowStatusResponse extends TweeterResponse{
    readonly isFollower: boolean
}