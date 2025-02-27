import { User, AuthToken } from "tweeter-shared";
import { Presenter, View } from "./Presenter";
import { UserService } from "../model/UserService";

export interface AuthView extends View {
  navigate: (url: string) => void;
  UpdateUserInfo: (
    currentUser: User,
    displayedUser: User | null,
    authToken: AuthToken,
    remember: boolean
  ) => void;
}

export abstract class AuthPresenter<V extends AuthView> extends Presenter<V> {
  private _service: UserService;

  public constructor(view: V) {
    super(view);
    this._service = new UserService();
  }

  protected async doAuthenticationOperation(
    operation: () => Promise<[User, AuthToken]>,
    itemDescription: string,
    rememberMe: boolean
  ): Promise<void> {
    this.doFailureReportingOperation(async () => {
      const [user, authToken] = await operation();
      this.view.UpdateUserInfo(user, user, authToken, rememberMe);
    }, itemDescription);
  }

  protected get service() {
    return this._service;
  }

  public updateView(view: V) {
    this.view = view;
  }
}
