import { AuthView, AuthPresenter } from "./AuthPresenter";

export interface loginView extends AuthView {}

export class loginPresenter extends AuthPresenter<loginView> {
  public async doLogin(
    alias: string,
    password: string,
    rememberMe: boolean,
    originalUrl: string | undefined
  ) {
    this.doAuthenticationOperation(
      async () => {
        return await this.service.login(alias, password);
      },
      "log user in",
      rememberMe
    );
    this.doNavigationOperation(() => {
      if (originalUrl) {
        this.view.navigate(originalUrl);
      } else {
        this.view.navigate("/");
      }
    });
  }
}
