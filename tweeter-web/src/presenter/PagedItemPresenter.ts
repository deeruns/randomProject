import { AuthToken, User } from "tweeter-shared";
import { Presenter, View } from "./Presenter";

export const PAGE_SIZE = 10;

export interface PagedItemView<T> extends View {
  addItems: (newItems: T[]) => void;
  //displayErrorMessage: (message: string) => void;
}

export abstract class PagedItemPresenter<T, U> extends Presenter<
  PagedItemView<T>
> {
  private _hasMoreItems = true;
  private _lastItem: T | null = null;
  private _service: U;

  public constructor(view: PagedItemView<T>) {
    super(view);
    this._service = this.createService();
  }

  public get hasMoreItems(): boolean {
    return this._hasMoreItems;
  }

  protected set hasMoreItems(hasMoreItems: boolean) {
    this._hasMoreItems = hasMoreItems;
  }

  protected get lastItem(): T | null {
    return this._lastItem;
  }

  protected set lastItem(lastItem: T | null) {
    this._lastItem = lastItem;
  }

  protected get service() {
    return this._service;
  }

  reset() {
    this.lastItem = null;
    this.hasMoreItems = true;
  }

  public async loadMoreItems(authToken: AuthToken, userAlias: string) {
    this.doFailureReportingOperation(async () => {
      const [newItems, hasMore] = await this.getMoreItems(
        authToken!,
        userAlias
      );

      this.hasMoreItems = hasMore;
      this.lastItem = newItems[newItems.length - 1];
      // he said we might fix this at the end of the video?? if not then it is at 65min
      this.view.addItems(newItems);
    }, this.getItemDescription());
  }

  protected abstract createService(): U;

  protected abstract getItemDescription(): string;

  protected abstract getMoreItems(
    authToken: AuthToken,
    useralias: string
  ): Promise<[T[], boolean]>;
}
