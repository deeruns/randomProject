import { AuthToken } from "tweeter-shared";
import { UserService } from "../model/UserService";
import { MessageView, Presenter, View } from "./Presenter";

// from Appnavbar
export interface LogoutView extends MessageView {
  clearUser: () => void;
  //navigateToLogin: () => void;
}

export class AppNavBarPresenter extends Presenter<LogoutView> {
  //private view: LogoutView;
  private _userService: UserService;

  public constructor(view: LogoutView) {
    super(view);
    this._userService = new UserService();
  }

  public get userService() {
    return this._userService;
  }


  public logOut = async (userAuthToken: AuthToken) => {
    this.view.displayInfoMessage("Logging Out...", 0);

    this.doFailureReportingOperation(async () => {
      await this._userService.logout(userAuthToken!);

      this.view.clearLastInfoMessage();
      this.view.clearUser();
      //navigate to login??
    }, "log user out");
  };
}
