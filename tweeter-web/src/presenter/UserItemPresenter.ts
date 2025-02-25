import { AuthToken, User } from "tweeter-shared";
import { Presenter, View } from "./Presenter";

export interface UserItemView extends View {
  addItems: (newItems: User[]) => void;
  //displayErrorMessage: (message: string) => void;
}

export abstract class UserItemPresenter extends Presenter {
  private _hasMoreItems = true;
  private _lastItem: User | null = null;
  // private _view: UserItemView;

  protected constructor(view: UserItemView) {
    super(view);
  }

  public get hasMoreItems(): boolean {
    return this._hasMoreItems;
  }

  protected set hasMoreItems(hasMoreItems: boolean) {
    this._hasMoreItems = hasMoreItems;
  }

  protected get lastItem(): User | null {
    return this._lastItem;
  }

  protected set lastItem(lastItem: User | null) {
    this._lastItem = lastItem;
  }

  reset() {
    this.lastItem = null;
    this.hasMoreItems = true;
  }

  public abstract loadMoreItems(authToken: AuthToken, userAlias: string): void;
}
