import { UserDto } from "../../dto/UserDto";

export interface getFollowCountRequest{
    readonly token: string,
    readonly user: UserDto
}