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

  // DO THIS IN FEED AND STORY
  public async loadMoreItems(authToken: AuthToken, userAlias: string) {
    this.doFailureReportingOperation(async () => {
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
    }, "load followees");
  }
}
