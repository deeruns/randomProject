import {
    PagedUserItemRequest,
    PagedUserItemResponse,
    User,
    UserDto,
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
          throw new Error(`No followees found`);
        } else {
          return [items, response.hasMore];
        }
      } else {
        console.error(response);
        if (response.message !== null) {
            throw new Error(response.message);
        } else {
            throw new Error("An unknown error occurred");
        }
      }
    }


    public async getMoreFollowers(
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

  }


  public handleErrors<T>(response: T, items: boolean) {
    if (items === false) {
        throw new Error(`No followees found`);
    } else {
        console.error(response);
        if (typeof response === 'object' && response !== null && 'message' in response) {
            const message = (response as { message: string | null }).message;
            throw new Error(message ?? "An unknown error occurred");
        } else {
            throw new Error("An unknown error occurred");
        }
    }
}
}