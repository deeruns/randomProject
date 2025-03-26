import { AuthToken, FakeData, User } from "tweeter-shared";
import { Buffer } from "buffer";
import { ServerFacade } from "../network/ServerFacade";
import { getUserResponse } from "tweeter-shared";
import { GetUserRequest } from "tweeter-shared";
import { RegisterRequest } from "tweeter-shared";
import { LoginRequest } from "tweeter-shared";
import { LoginResponse } from "tweeter-shared";
import { RegisterResponse } from "tweeter-shared";
import { LogoutRequest } from "tweeter-shared";

export class UserService {
  // put the stuff in here that uses fake data and will eventually contact the server to send or recieve data
  private serverFacade: ServerFacade = new ServerFacade();
  // this is from Post.tsx
  public async getUser(
    authToken: AuthToken,
    alias: string
  ): Promise<User | null> {
    const response: getUserResponse = 
      await this.serverFacade.GetUser(
        new GetUserRequest(authToken, alias)
      );
    return response.user;
    // TODO: Replace with the result of calling server
    //return FakeData.instance.findUserByAlias(alias);
  }

  // this is from register.tsx
  public async register(
    firstName: string,
    lastName: string,
    alias: string,
    password: string,
    userImageBytes: Uint8Array,
    imageFileExtension: string
  ): Promise<[User, AuthToken]> {

    // Not neded now, but will be needed when you make the request to the server in milestone 3
    const imageStringBase64: string =
      Buffer.from(userImageBytes).toString("base64");

    const response: RegisterResponse = await this.serverFacade.Register(
      new RegisterRequest(
        firstName,
        lastName,
        alias,
        password,
        userImageBytes,
        imageStringBase64
      )
    );
    // TODO: Replace with the result of calling the server

    const user = response.user;
    const authToken = response.authToken;

    if (user === null) {
      throw new Error("Invalid registration");
    }

    return [user, authToken];
  }

  public async login(
    alias: string,
    password: string
  ): Promise<[User, AuthToken]> {
    // TODO: Replace with the result of calling the server
    const response: LoginResponse = await this.serverFacade.Register(
      new LoginRequest(
        alias,
        password
      )
    );
    //const user = FakeData.instance.firstUser;
    const user = response.user;
    const authToken = response.authToken;

    if (user === null) {
      throw new Error("Invalid alias or password");
    }

    return [user, authToken];
  }

  public logout = async (userAuthToken: AuthToken): Promise<void> => {
    // Pause so we can see the logging out message. Delete when the call to the server is implemented.
    this.serverFacade.Logout(new LogoutRequest(userAuthToken));
    //await new Promise((res) => setTimeout(res, 1000));
  };
}
