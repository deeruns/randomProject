import { NavigateFunction } from "react-router-dom";
import { UserService } from "../model/UserService";
import { User, AuthToken } from "tweeter-shared";

export interface LoginView {
  UpdateUserInfo: (
    currentUser: User,
    displayedUser: User | null,
    authToken: AuthToken,
    remember: boolean
  ) => void;
  // make sure import is correct
  navigate: NavigateFunction;
  displayErrorMessage: (message: string) => void;
}

export class LoginPresenter {
  private _view: LoginView;
  private userService: UserService;
  private isLoading: boolean = false;

  public constructor(view: LoginView) {
    this._view = view;
    this.userService = new UserService();
  }

  public async doLogin(
    alias: string,
    password: string,
    rememberMe: boolean,
    originalUrl?: string
  ) {
    try {
      this.isLoading = true;

      const [user, authToken] = await this.userService.login(alias, password);

      this._view.UpdateUserInfo(user, user, authToken, rememberMe);

      if (!!originalUrl) {
        this._view.navigate(originalUrl);
      } else {
        this._view.navigate("/");
      }
    } catch (error) {
      this._view.displayErrorMessage(
        `Failed to log user in because of exception: ${error}`
      );
    } finally {
      this.isLoading = false;
    }
  }
}
