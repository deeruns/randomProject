import { AuthToken, Status } from "tweeter-shared";
import { StatusItemPresenter } from "./StatusItemPresenter";
import { PAGE_SIZE } from "./PagedItemPresenter";

export class StoryPresenter extends StatusItemPresenter {
  protected getItemDescription(): string {
    return "load feed story";
  }
  protected getMoreItems(
    authToken: AuthToken,
    useralias: string
  ): Promise<[Status[], boolean]> {
    return this.service.loadMoreStoryItems(
      authToken!,
      useralias,
      PAGE_SIZE,
      this.lastItem
    );
  }
}
