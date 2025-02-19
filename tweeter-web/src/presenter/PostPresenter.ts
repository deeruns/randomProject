import { AuthToken, User } from "tweeter-shared";
import { UserService } from "../model/UserService";

export interface PostView {
  displayErrorMessage: (message: string) => void;
  SetDisplayedUser: (user: User) => void;
}

export class PostPresenter {
  private _view: PostView;
  private userService: UserService;

  public constructor(view: PostView) {
    this._view = view;
    this.userService = new UserService();
  }

  public async navigateToUser(
    event: React.MouseEvent,
    userAuthToken: AuthToken | null,
    CurrentUser: User | null
  ): Promise<void> {
    event.preventDefault();

    try {
      const alias = this.extractAlias(event.target.toString());

      const user = await this.userService.getUser(userAuthToken!, alias);

      if (!!user) {
        if (CurrentUser!.equals(user)) {
          this._view.SetDisplayedUser(CurrentUser!);
        } else {
          this._view.SetDisplayedUser(user);
        }
      }
    } catch (error) {
      this._view.displayErrorMessage(
        `Failed to get user because of exception: ${error}`
      );
    }
  }

  public extractAlias(value: string): string {
    const index = value.indexOf("@");
    return value.substring(index);
  }
}
