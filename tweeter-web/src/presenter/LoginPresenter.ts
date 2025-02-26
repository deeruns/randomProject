import { User, AuthToken } from "tweeter-shared";
import { UserService } from "../model/UserService";
import { Presenter, View } from "./Presenter";

export interface loginView extends View {
  updateUserInfo: (
    currentUser: User,
    displayedUser: User | null,
    authToken: AuthToken,
    remember: boolean
  ) => void;
  navigate: (url: string) => void;
  displayErrorMessage: (message: string) => void;
}

export class loginPresenter extends Presenter<loginView> {
  private userService: UserService;
  //private view: loginView;

  constructor(view: loginView) {
    super(view);
    this.userService = new UserService();
  }

  public async doLogin(
    alias: string,
    password: string,
    rememberMe: boolean,
    originalUrl: string | undefined
  ) {
    // doOperation
    this.doFailureReportingOperation(async () => {
      const [user, authToken] = await this.userService.login(alias, password);
      this.view.updateUserInfo(user, user, authToken, rememberMe);
      this.doNavigationOperation(() => {
        if (originalUrl) {
          this.view.navigate(originalUrl);
        } else {
          this.view.navigate("/");
        }
      });
    }, "log user in");
  }
}
