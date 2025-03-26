import { AuthToken, FakeData, Status } from "tweeter-shared";
import { ServerFacade } from "../network/ServerFacade";
import { StoryItemsRequest } from "tweeter-shared";
import { StoryItemsResponse } from "tweeter-shared";
import { FeedItemsResponse } from "tweeter-shared";
import { FeedItemsRequest } from "tweeter-shared";
import PostStatus from "../components/postStatus/PostStatus";
import { PostStatusRequest } from "tweeter-shared";

export class StatusService {
  private serverFacade: ServerFacade = new ServerFacade();

  public async loadMoreStoryItems(
    authToken: AuthToken,
    userAlias: string,
    pageSize: number,
    lastItem: Status | null
  ): Promise<[Status[], boolean]> {

    const request: StoryItemsRequest = {
      authToken: authToken.token,
      userAlias: userAlias,
      pageSize: pageSize,
      lastItem: lastItem.dto
    };

    const [statuses, hasMore]: [Status[], boolean] = 
      await this.serverFacade.loadStoryItems(request);

    return [statuses, hasMore];
    // TODO: Replace with the result of calling server
    //return FakeData.instance.getPageOfStatuses(lastItem, pageSize);
  }

  public async loadMoreFeedItems(
    authToken: AuthToken,
    userAlias: string,
    pageSize: number,
    lastItem: Status | null
  ): Promise<[Status[], boolean]> {
    const request : FeedItemsRequest = {
        authToken,
        userAlias,
        pageSize,
        lastItem
    }

    const response: FeedItemsResponse = 
      await this.serverFacade.loadFeedItems(request);

    return [response.statuses, response.hasMore];
    // TODO: Replace with the result of calling server
    //return FakeData.instance.getPageOfStatuses(lastItem, pageSize);
  }

  public postStatus = async (
    authToken: AuthToken,
    newStatus: Status
  ): Promise<void> => {
    // Pause so we can see the logging out message. Remove when connected to the server
    //await new Promise((f) => setTimeout(f, 2000));
    this.serverFacade.PostStatus(
      new PostStatusRequest(
        authToken,
        newStatus
      )
    );
    //VOID return type
    // TODO: Call the server to post the status
  };
}
