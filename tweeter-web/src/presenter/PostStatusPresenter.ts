import { StatusService } from "../model/StatusService";
import { AuthToken, Status, User } from "tweeter-shared";
import { View, Presenter } from "./Presenter";

export interface PostStatusView extends View {
  displayErrorMessage: (message: string) => void;
  displayInfoMessage: (
    message: string,
    duration: number,
    bootstrapClasses?: string
  ) => void;
  clearLastInfoMessage: () => void;
  setPost: React.Dispatch<React.SetStateAction<string>>;
}

export class PostStatusPresenter extends Presenter<PostStatusView> {
  //private view;
  private statusService: StatusService;

  public constructor(view: PostStatusView) {
    super(view);
    this.statusService = new StatusService();
  }

  submitPost = async (
    event: React.MouseEvent,
    CurrentUser: User,
    userAuthToken: AuthToken,
    post: string
  ) => {
    event.preventDefault();

    this.doFailureReportingOperation(async () => {
      try {
        this.view.displayInfoMessage("Posting status...", 0);

        const status = new Status(post, CurrentUser!, Date.now());

        await this.statusService.postStatus(userAuthToken!, status);

        this.view.setPost("");
        this.view.displayInfoMessage("Status posted!", 2000);
      } finally {
        this.view.clearLastInfoMessage();
      }
    }, "post the status");
  };
}
