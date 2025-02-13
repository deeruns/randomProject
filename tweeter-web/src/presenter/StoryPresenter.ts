import { AuthToken } from "tweeter-shared";
import { StatusItemPresenter, StatusItemView } from "./StatusItemPresenter";
import { StatusService } from "../model/StatusService";

export const PAGE_SIZE = 10;

export class StoryPresenter extends StatusItemPresenter {
  private statusService: StatusService;

  public constructor(view: StatusItemView) {
    super(view);
    this.statusService = new StatusService();
  }

  public async loadMoreItems(userAuthToken: AuthToken, userAlias: string) {
    try {
      const [newItems, hasMore] = await this.statusService.loadMoreStoryItems(
        userAuthToken!,
        userAlias,
        PAGE_SIZE,
        this.lastItem
      );

      this.hasMoreItems = hasMore;
      this.lastItem = newItems[newItems.length - 1];
      this.view.addItems(newItems);
      //   setChangedDisplayedUser(false);
    } catch (error) {
      this.view.displayErrorMessage(
        `Failed to load feed story because of exception: ${error}`
      );
    }
  }
}
