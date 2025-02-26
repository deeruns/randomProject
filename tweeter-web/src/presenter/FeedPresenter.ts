import { AuthToken, Status } from "tweeter-shared";
import { StatusItemPresenter } from "./StatusItemPresenter";
import { PAGE_SIZE } from "./PagedItemPresenter";

export class FeedPresenter extends StatusItemPresenter {
  protected getItemDescription(): string {
    return "load feed items";
  }
  protected getMoreItems(
    authToken: AuthToken,
    useralias: string
  ): Promise<[Status[], boolean]> {
    return this.service.loadMoreFeedItems(
      authToken!,
      useralias,
      PAGE_SIZE,
      this.lastItem
    );
  }
}
