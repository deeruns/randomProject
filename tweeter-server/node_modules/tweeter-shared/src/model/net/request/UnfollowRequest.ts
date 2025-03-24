import { UserDto } from "../../dto/UserDto";

export interface UnfollowRequest {
    readonly token: string,
    readonly userToUnfollow: UserDto
}