import {
    PagedUserItemRequest,
    PagedUserItemResponse,
    User,
    UserDto,
    followRequest,
  } from "tweeter-shared";
  import { ClientCommunicator } from "./ClientCommunicator";
  
  export class ServerFacade {
    private SERVER_URL = "TODO: Set this value.";
  
    private clientCommunicator = new ClientCommunicator(this.SERVER_URL);
  
    public async getMoreFollowees(
      request: PagedUserItemRequest
    ): Promise<[User[], boolean]> {
      const response = await this.clientCommunicator.doPost<
        PagedUserItemRequest,
        PagedUserItemResponse
      >(request, "/followee/list");
  
      // Convert the UserDto array returned by ClientCommunicator to a User array
      const items: User[] | null =
        response.success && response.items
          ? response.items.map((dto) => User.fromDto(dto) as User)
          : null;
  
      // Handle errors    
      if (response.success) {
        if (items == null) {
            throw this.handleErrors(response, false);
        } else {
          return [items, response.hasMore];
        }
      } else {
        throw this.handleErrors(response, true);
      }
    }


    public async getMoreFollowers(
        request: PagedUserItemRequest
      ): Promise<[User[], boolean]> {
        const response = await this.clientCommunicator.doPost<
          PagedUserItemRequest,
          PagedUserItemResponse
        >(request, "/follower/list");
    
        // Convert the UserDto array returned by ClientCommunicator to a User array
        const items: User[] | null =
          response.success && response.items
            ? response.items.map((dto) => User.fromDto(dto) as User)
            : null;

        if (response.success) {
            if (items == null) {
                throw this.handleErrors(response, false);
            } else {
            return [items, response.hasMore];
            }
        } 
        else {
            throw this.handleErrors(response, true);
        }
  }

  public aync FollowLambda(request: followRequest):
    Promise


  public handleErrors<T>(response: T, items: boolean) {
    let ErrorMessage: Error;
    if (items === false) {
        ErrorMessage = new Error(`No followees found`);
    } else {
        console.error(response);
        if (typeof response === 'object' && response !== null && 'message' in response) {
            const message = (response as { message: string | null }).message;
            throw new Error(message ?? "An unknown error occurred");
        } else {
            ErrorMessage = new Error("An unknown error occurred");
        }
    }
    return ErrorMessage;
}
}