import { UserDto } from "../../dto/UserDto";

export interface followRequest {
    readonly token: string,
    readonly userToFollow: UserDto
}