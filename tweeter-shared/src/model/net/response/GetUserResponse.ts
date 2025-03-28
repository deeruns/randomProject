import { UserDto } from "../../dto/UserDto";
import { TweeterResponse } from "./TweeterResponse";

export interface getUserResponse extends TweeterResponse{
    user: UserDto
}