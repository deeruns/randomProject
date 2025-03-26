import { PagedUserItemRequest } from "tweeter-shared";
import { AuthToken, User, FakeData } from "tweeter-shared";
import { ServerFacade } from "../network/ServerFacade";
import { PagedUserItemResponse } from "tweeter-shared";
import { getFollowStatusResponse } from "tweeter-shared";
import { getFollowStatusRequest } from "tweeter-shared";
import { getFollowCountResponse } from "tweeter-shared";
import { getFollowCountRequest } from "tweeter-shared";
import { TweeterResponse } from "tweeter-shared";
import { followRequest } from "tweeter-shared";

export class FollowService {
  private serverFacade: ServerFacade = new ServerFacade();
  public async loadMoreFollowers(
    authToken: AuthToken,
    userAlias: string,
    pageSize: number,
    lastItem: User | null
  ): Promise<[User[], boolean]> {
    // TODO: Replace with the result of calling server
    //return FakeData.instance.getPageOfUsers(lastItem, pageSize, userAlias);

    const request: PagedUserItemRequest = new PagedUserItemRequest(
      authToken,
      userAlias,
      pageSize,
      lastItem
    )
    const response: PagedUserItemResponse = 
      await this.serverFacade.getMoreFollowers(request);
    return [response.items, response.hasMore];
  }

  public async loadMoreFollowees(
    authToken: AuthToken,
    userAlias: string,
    pageSize: number,
    lastItem: User | null
  ): Promise<[User[], boolean]> {
    // TODO: Replace with the result of calling server
    //return FakeData.instance.getPageOfUsers(lastItem, pageSize, userAlias);
    const response: PagedUserItemResponse = 
      await this.serverFacade.getMoreFollowers(
        new PagedUserItemRequest(
          authToken,
          userAlias,
          pageSize,
          lastItem
        )
      );
    return [response.users, response.hasMore];
  }

  // from the UserInfo file
  public async getIsFollowerStatus(
    authToken: AuthToken,
    user: User,
    selectedUser: User
  ): Promise<boolean> {
    // TODO: Replace with the result of calling server
    //return FakeData.instance.isFollower();
    const response: getFollowStatusResponse = 
      await this.serverFacade.getMoreFollowers(
        new getFollowStatusRequest(
          authToken,
          user,
          selectedUser
        )
      );

      return response.isFollower;
  }

  public async getFolloweeCount(
    authToken: AuthToken,
    user: User
  ): Promise<number> {
    // TODO: Replace with the result of calling server
    //return FakeData.instance.getFolloweeCount(user.alias);
    const response: getFollowCountResponse = 
      await this.serverFacade.getMoreFollowers(
        new getFollowCountRequest(
          authToken,
          user
        )
      );
      return response.followCount;
  }

  public async getFollowerCount(
    authToken: AuthToken,
    user: User
  ): Promise<number> {
    // TODO: Replace with the result of calling server
    //return FakeData.instance.getFollowerCount(user.alias);
    const response: getFollowCountResponse = 
      await this.serverFacade.getMoreFollowers(
        new getFollowCountRequest(
          authToken,
          user
        )
      );
      return response.followCount;
  }

  public async follow(
    authToken: AuthToken,
    userToFollow: User
  ): Promise<[followerCount: number, followeeCount: number]> {
    // Pause so we can see the follow message. Remove when connected to the server
    //await new Promise((f) => setTimeout(f, 2000));

    const response: TweeterResponse = await this.serverFacade.Follow(
      new followRequest(
        authToken,
        userToFollow
      )
    );

    const followerCount = await this.getFollowerCount(authToken, userToFollow);
    const followeeCount = await this.getFolloweeCount(authToken, userToFollow);

    return [followerCount, followeeCount];
  }

  public async unfollow(
    authToken: AuthToken,
    userToUnfollow: User
  ): Promise<[followerCount: number, followeeCount: number]> {
    // Pause so we can see the unfollow message. Remove when connected to the server
    //await new Promise((f) => setTimeout(f, 2000));

    // TODO: Call the server

    const response: TweeterResponse = await this.serverFacade.Unfollow(
      new FollowRequest(
        authToken,
        userToUnfollow
      )
    );

    const followerCount = await this.getFollowerCount(
      authToken,
      userToUnfollow
    );
    const followeeCount = await this.getFolloweeCount(
      authToken,
      userToUnfollow
    );

    return [followerCount, followeeCount];
  }
}
