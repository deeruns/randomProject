import { UserDto } from "../../dto/UserDto";
import { TweeterResponse } from "./TweeterResponse";

export interface PagedUserItemResponse extends TweeterResponse {
    readonly items: UserDto[] | null,
    readonly hasMore: boolean
}
// all respionses will have success and message