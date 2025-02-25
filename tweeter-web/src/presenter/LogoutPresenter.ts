import { AuthToken } from "tweeter-shared";
import { UserService } from "../model/UserService";

// from Appnavbar
export interface LogoutView {
  displayErrorMessage: (message: string) => void;
  displayInfoMessage: (
    message: string,
    duration: number,
    bootstrapClasses?: string
  ) => void;
  clearLastInfoMessage: () => void;
  clearUser: () => void;
}

export class LogoutPresenter {
  private view: LogoutView;
  private userService: UserService;

  public constructor(view: LogoutView) {
    this.view = view;
    this.userService = new UserService();
  }

  public logOut = async (userAuthToken: AuthToken) => {
    this.view.displayInfoMessage("Logging Out...", 0);

    try {
      await this.userService.logout(userAuthToken!);

      this.view.clearLastInfoMessage();
      this.view.clearUser();
    } catch (error) {
      this.view.displayErrorMessage(
        `Failed to log user out because of exception: ${error}`
      );
    }
  };
}
