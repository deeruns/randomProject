import { UserService } from "../../model/service/UserService";
import { GetUserRequest, getUserResponse} from 'tweeter-shared';

export const handler = async (request: GetUserRequest): Promise<getUserResponse> => {
    const userService = new UserService();
    const user = await userService.getUser(request.token, request.alias);

    return {
        success: true,
        message: null,
        user: user
    }
}