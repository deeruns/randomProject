import { UserDto } from "../../dto/UserDto";

export interface getFollowStatusRequest{
  readonly token: string,
  readonly user: UserDto,
  readonly selectedUser: UserDto
}