import { AuthToken, User } from "tweeter-shared";
import { FollowService } from "../model/FollowService";
import { UserItemPresenter, UserItemView } from "./UserItemPresenter";

export const PAGE_SIZE = 10;

export class FolloweePresenter extends UserItemPresenter {
  private followService: FollowService;

  // view will be passed in from user item scroller
  public constructor(view: UserItemView) {
    super(view);
    this.followService = new FollowService();
  }

  public async loadMoreItems(authToken: AuthToken, userAlias: string) {
    try {
      // this is the loadmorefollowees that we took out of app and put into service
      const [newItems, hasMore] = await this.followService.loadMoreFollowees(
        authToken!,
        userAlias,
        PAGE_SIZE,
        this.lastItem
      );

      this.hasMoreItems = hasMore;
      this.lastItem = newItems[newItems.length - 1];
      // notify the scroller that there are more items to add
      // ad something in the view
      this.view.addItems(newItems);
    } catch (error) {
      this.view.displayErrorMessage(
        `Failed to load followees because of exception: ${error}`
      );
    }
  }
}
