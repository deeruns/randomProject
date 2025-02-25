import { AuthToken, User } from "tweeter-shared";
import { FollowService } from "../model/FollowService";
import { UserItemPresenter, UserItemView } from "./UserItemPresenter";

export const PAGE_SIZE = 10;

export class FollowerPresenter extends UserItemPresenter {
  private followService: FollowService;

  // view will be passed in from user item scroller
  public constructor(view: UserItemView) {
    super(view);
    this.followService = new FollowService();
  }

  public async loadMoreItems(authToken: AuthToken, userAlias: string) {
    //M2B
    this.doFailureReportingOperation(async () => {
      const [newItems, hasMore] = await this.followService.loadMoreFollowers(
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
    }, "load followers");
  }
}
