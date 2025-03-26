import {
    AuthToken,
    FeedItemsRequest,
    FeedItemsResponse,
    FollowResponse,
    GetUserRequest,
    LoginRequest,
    LoginResponse,
    LogoutRequest,
    LogoutResponse,
    PagedUserItemRequest,
    PagedUserItemResponse,
    PostSegment,
    PostSegmentDto,
    PostStatusRequest,
    PostStatusResponse,
    RegisterRequest,
    RegisterResponse,
    Status,
    StoryItemsRequest,
    StoryItemsResponse,
    UnfollowRequest,
    UnfollowResponse,
    User,
    UserDto,
    followRequest,
    getFollowCountRequest,
    getFollowCountResponse,
    getFollowStatusRequest,
    getFollowStatusResponse,
    getUserResponse,
  } from "tweeter-shared";
  import { ClientCommunicator } from "./ClientCommunicator";
import { StatusDto } from "tweeter-shared";
  
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
          ? response.items.map((dto: UserDto) => User.fromDto(dto) as User)
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
            ? response.items.map((dto:UserDto) => User.fromDto(dto) as User)
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


    public async Unfollow(request: UnfollowRequest):
        Promise<[followerCount: number, followeeCount: number]> {
        const response = await this.clientCommunicator.doPost<
            UnfollowRequest,
            UnfollowResponse
            >(request, "/follow/unfollowUser");
        
        const followerCount = response.success && response.followerCount !== undefined 
            ? response.followerCount 
            : null;
        const followeeCount = response.success && response.followeeCount !== undefined 
            ? response.followeeCount 
            : null;

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

    public async getFollowStatus(request: getFollowStatusRequest):
        Promise<boolean> {
        const response = await this.clientCommunicator.doPost<
            getFollowStatusRequest,
            getFollowStatusResponse
            >(request, "/follower/followStatus");
        
        const isFollower = response.success && response.isFollower !== undefined 
            ? response.isFollower
            : null;

        if (response.success) {
            if (isFollower == null) {
                throw this.handleErrors(response, false);
            } else {
                return isFollower;
            }
        } 
        else {
            throw this.handleErrors(response, true);
        }
    }

     ////////////////////////
    //    status lambda   //
   ////////////////////////

   public async loadFeedItems(request: FeedItemsRequest):
    Promise<[Status[], boolean]> {
        const response = await this.clientCommunicator.doPost<
            FeedItemsRequest,
            FeedItemsResponse
            >(request, "/status/loadFeed");

        // const segments: PostSegment[] | null = response.feed?.segments
        //     ? response.feed.segments.map(dto => PostSegment.fromDto(dto) as PostSegment)
        //     : null;
        
        // const feed: Status[] | null =
        //     response.success && response.feed
        //         ? response.feed.map((dto) => Status.fromDto(dto) as Status)
        //         : null;


        //DO I NEED TO MAP THE SEGMENTS HERE? OR IS IT FINE TO LEAVE THE POST SEGMENT DTO OBJECT?
        const feed: Status[] | null = (response.success && response.feed)
            ? response.feed.map((dto: StatusDto) => Status.fromDto(dto) as Status)
            : null;


        // const segments: PostSegment[] | null = (response.success && response.feed)
        //     ? response.feed.flatMap((dto: PostSegmentDto) => dto.segments).map((dto: PostSegmentDto) => PostSegment.fromDto(dto) as PostSegment)
        //     : null;

        let array: number[] = [];
        if (response.success) {
            if (feed == null) {
                throw this.handleErrors(response, false);
            } else {
                return [feed, response.hasMorePages];
            }
        } 
        else {
            throw this.handleErrors(response, true);
        }
    }

    //todo : loadstoryitems, poststatus, getuser, login, logout, register

    public async loadStoryItems(request: StoryItemsRequest):
    Promise<[Status[], boolean]> {
        const response = await this.clientCommunicator.doPost<
            StoryItemsRequest,
            StoryItemsResponse
            >(request, "/status/loadsStory");


        //DO I NEED TO MAP THE SEGMENTS HERE? OR IS IT FINE TO LEAVE THE POST SEGMENT DTO OBJECT?
        const statuses: Status[] | null = (response.success && response.statuses)
            ? response.statuses.map((dto: StatusDto) => Status.fromDto(dto) as Status)
            : null;


        // const segments: PostSegment[] | null = (response.success && response.feed)
        //     ? response.feed.flatMap((dto: PostSegmentDto) => dto).map((dto: PostSegmentDto) => PostSegment.fromDto(dto) as PostSegment)
        //     : null;

        let array: number[] = [];
        if (response.success) {
            if (statuses == null) {
                throw this.handleErrors(response, false);
            } else {
                return [statuses, response.hasMorePages];
            }
        } 
        else {
            throw this.handleErrors(response, true);
        }
    }


    public async PostStatus(request: PostStatusRequest):
    Promise<void> {
        const response = await this.clientCommunicator.doPost<
            PostStatusRequest,
            PostStatusResponse
            >(request, "/status/PostStatus");


        //DO I NEED TO MAP THE SEGMENTS HERE? OR IS IT FINE TO LEAVE THE POST SEGMENT DTO OBJECT?
        const message = response.success && response.message !== undefined


        //IS THIS ERROR HANDLING CORRECT? FOR A VOID FUNCTION?
        let array: number[] = [];
        if (response.success && response.message !== undefined) {
            if (message == null) {
                throw this.handleErrors(response, false);
            } else {
                return;
            }
        } 
        else {
            throw this.handleErrors(response, true);
        }
    }

    public async GetUser(request: GetUserRequest):
        Promise<User | null> {
        const response = await this.clientCommunicator.doPost<
            GetUserRequest,
            getUserResponse
            >(request, "/auth/getUser");


        //return user object from dto
        const user: User | null = response.success && response.user ?
            User.fromDto(response.user) as User : null;

        if (response.success) {
            if (user == null) {
                throw this.handleErrors(response, false);
            } else {
                return user;
            }
        } 
        else {
            throw this.handleErrors(response, true);
        }
    }

    public async Register(request: RegisterRequest):
        Promise<[User, AuthToken]> {
        const response = await this.clientCommunicator.doPost<
            RegisterRequest,
            RegisterResponse
            >(request, "/auth/register");
        //return user object from dto
        const user: User | null = response.success && response.user ?
            User.fromDto(response.user) as User : null;
        
        const authToken: AuthToken | null = response.success && response.authToken ?
            response.authToken : null;

            //Does authToken need to be of type
            // AuthToken or string???

        if (response.success) {
            if (user == null || authToken == null) {
                throw this.handleErrors(response, false);
            } else {
                return [user, authToken];
            }
        } 
        else {
            throw this.handleErrors(response, true);
        }
    }

    public async Login(request: LoginRequest):
        Promise<[User, AuthToken]> {
        const response = await this.clientCommunicator.doPost<
            LoginRequest,
            LoginResponse
            >(request, "/auth/login");
        //return user object from dto
        const user: User | null = response.success && response.user ?
            User.fromDto(response.user) as User : null;
        
        const authToken: AuthToken | null = response.success && response.authToken ?
            response.authToken : null;

            //Does authToken need to be of type
            // AuthToken or string???

        if (response.success) {
            if (user == null || authToken == null) {
                throw this.handleErrors(response, false);
            } else {
                return [user, authToken];
            }
        } 
        else {
            throw this.handleErrors(response, true);
        }
    }

    public async Logout(request: LogoutRequest):
        Promise<void> {
        const response = await this.clientCommunicator.doPost<
            LogoutRequest,
            LogoutResponse
            >(request, "/auth/logout");

        if (response.success) {
            return;
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