import { Status } from "tweeter-shared";
import { View } from "./Presenter";
import { PagedItemPresenter } from "./PagedItemPresenter";
import { StatusService } from "../model/StatusService";

export interface StatusItemView extends View {
  addItems: (newItems: Status[]) => void;
  // displayErrorMessage: (message: string) => void;
}

// this is just a parent class for the feed and story?
export abstract class StatusItemPresenter extends PagedItemPresenter<
  Status,
  StatusService
> {
  protected createService(): StatusService {
    return new StatusService();
  }
}
