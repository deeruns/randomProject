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
    const request: GetUserRequest = {
      token: authToken.token,
      alias: alias,
    }
    const response: User | null = 
      await this.serverFacade.GetUser(request);
    return response;
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

      const request: RegisterRequest = {
        firstName,
        lastName,
        alias,
        password,
        userImageBytes: Array.from(userImageBytes),
        imageFileExtension: imageStringBase64
    }

    const [user, authToken]: [User, AuthToken] = await this.serverFacade.Register(request);
    // TODO: Replace with the result of calling the server

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
    const request: LoginRequest = {
      alias,
      password
    }
    const [user, authToken]: [User, AuthToken] = await this.serverFacade.Login(request);
    //const user = FakeData.instance.firstUser;

    if (user === null) {
      throw new Error("Invalid alias or password");
    }

    return [user, authToken];
  }

  public logout = async (userAuthToken: AuthToken): Promise<void> => {
    // Pause so we can see the logging out message. Delete when the call to the server is implemented.\
    const request: LogoutRequest = {
      authToken: userAuthToken.token
    }
    this.serverFacade.Logout(request);
    //await new Promise((res) => setTimeout(res, 1000));
  };
}
