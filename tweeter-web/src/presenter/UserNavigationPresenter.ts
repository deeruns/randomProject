import { User, AuthToken } from "tweeter-shared";
import { UserService } from "../model/UserService";
import { View, Presenter } from "./Presenter";

export interface UserNavigationView extends View {
  SetDisplayedUser: (user: User) => void;
}

export class UserNavigationPresenter extends Presenter<UserNavigationView> {
  //private _view: UserNavigationView;
  private userService: UserService;

  public constructor(view: UserNavigationView) {
    super(view);
    this.userService = new UserService();
  }

  public async navigateToUser(
    event: React.MouseEvent,
    userAuthToken: AuthToken | null,
    CurrentUser: User | null
  ): Promise<void> {
    event.preventDefault();

    this.doFailureReportingOperation(async () => {
      const alias = this.extractAlias(event.target.toString());
      const user = await this.userService.getUser(userAuthToken!, alias);
      if (!!user) {
        if (CurrentUser!.equals(user)) {
          this.view.SetDisplayedUser(CurrentUser!);
        } else {
          this.view.SetDisplayedUser(user);
        }
      }
    }, "get user");
  }

  public extractAlias(value: string): string {
    const index = value.indexOf("@");
    return value.substring(index);
  }

  // this could be wrong
  public getUser(authToken: AuthToken, alias: string) {
    return this.userService.getUser(authToken, alias);
  }
}
