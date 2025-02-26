import { AuthToken } from "tweeter-shared";
import { UserService } from "../model/UserService";
import { MessageView, Presenter, View } from "./Presenter";

// from Appnavbar
export interface LogoutView extends MessageView {
  clearUser: () => void;
}

export class LogoutPresenter extends Presenter<LogoutView> {
  //private view: LogoutView;
  private userService: UserService;

  public constructor(view: LogoutView) {
    super(view);
    this.userService = new UserService();
  }

  public logOut = async (userAuthToken: AuthToken) => {
    this.view.displayInfoMessage("Logging Out...", 0);

    this.doFailureReportingOperation(async () => {
      await this.userService.logout(userAuthToken!);

      this.view.clearLastInfoMessage();
      this.view.clearUser();
    }, "log user out");
  };
}
