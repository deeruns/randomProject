import { TweeterResponse } from "./TweeterResponse";

export interface getFollowCountResponse extends TweeterResponse{
    readonly followCount: number
}