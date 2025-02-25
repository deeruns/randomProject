import { StatusService } from "../model/StatusService";
import { AuthToken, Status, User } from "tweeter-shared";

export interface PostStatusView {
  displayErrorMessage: (message: string) => void;
  displayInfoMessage: (
    message: string,
    duration: number,
    bootstrapClasses?: string
  ) => void;
  clearLastInfoMessage: () => void;
  setPost: React.Dispatch<React.SetStateAction<string>>;
}

export class PostStatusPresenter {
  private view;
  private statusService: StatusService;
  public constructor(view: PostStatusView) {
    this.view = view;
    this.statusService = new StatusService();
  }

  submitPost = async (
    event: React.MouseEvent,
    CurrentUser: User,
    userAuthToken: AuthToken,
    post: string
  ) => {
    event.preventDefault();

    try {
      //setIsLoading(true);
      this.view.displayInfoMessage("Posting status...", 0);

      const status = new Status(post, CurrentUser!, Date.now());

      await this.statusService.postStatus(userAuthToken!, status);

      this.view.setPost("");
      this.view.displayInfoMessage("Status posted!", 2000);
    } catch (error) {
      this.view.displayErrorMessage(
        `Failed to post the status because of exception: ${error}`
      );
    } finally {
      this.view.clearLastInfoMessage();
      //setIsLoading(false);
    }
  };
}
