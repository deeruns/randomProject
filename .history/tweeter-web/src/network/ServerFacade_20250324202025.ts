import {
    FollowResponse,
    PagedUserItemRequest,
    PagedUserItemResponse,
    User,
    UserDto,
    followRequest,
    getFollowCountRequest,
    getFollowCountResponse,
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

  public async Follow(request: followRequest):
    Promise<[followerCount: number, followeeCount: number]> {
        const response = await this.clientCommunicator.doPost<
            followRequest,
            FollowResponse
            >(request, "/follow/followUser");
        
        const followerCount = response.success && response.followerCount !== undefined 
            ? response.followerCount 
            : null;
        const followeeCount = response.success && response.followeeCount !== undefined 
            ? response.followeeCount 
            : null;

        let array: number[] = [];
        if (response.success) {
            if (followerCount == null || followeeCount == null) {
                throw this.handleErrors(response, false);
            } else {
                return [followerCount, followeeCount];
            }
        } 
        else {
            throw this.handleErrors(response, true);
        }
    }

    public async getFolloweeCount(request: getFollowCountRequest):
        Promise<number> {
        const response = await this.clientCommunicator.doPost<
            getFollowCountRequest,
            getFollowCountResponse
            >(request, "/followee/count");
        
        const followCount = response.success && response.followCount !== undefined 
            ? response.followCount 
            : null;

        if (response.success) {
            if (followCount == null) {
                throw this.handleErrors(response, false);
            } else {
                return followCount;
            }
        } 
        else {
            throw this.handleErrors(response, true);
        }
    }

    public async getFollowerCount(request: getFollowCountRequest):
        Promise<number> {
        const response = await this.clientCommunicator.doPost<
            getFollowCountRequest,
            getFollowCountResponse
            >(request, "/follower/count");
        
        const followCount = response.success && response.followCount !== undefined 
            ? response.followCount 
            : null;

        if (response.success) {
            if (followCount == null) {
                throw this.handleErrors(response, false);
            } else {
                return followCount;
            }
        } 
        else {
            throw this.handleErrors(response, true);
        }
    }


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