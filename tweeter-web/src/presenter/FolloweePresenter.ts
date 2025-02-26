import { AuthToken, User } from "tweeter-shared";
import { UserItemPresenter } from "./UserItemPresenter";
import { PAGE_SIZE } from "./PagedItemPresenter";

export class FolloweePresenter extends UserItemPresenter {
  protected getItemDescription(): string {
    return "load followees";
  }

  protected getMoreItems(
    authToken: AuthToken,
    useralias: string
  ): Promise<[User[], boolean]> {
    return this.service.loadMoreFollowees(
      authToken!,
      useralias,
      PAGE_SIZE,
      this.lastItem
    );
  }
}
