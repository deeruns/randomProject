import { AuthToken, FakeData, User, UserDto } from "tweeter-shared";
import { Buffer } from "buffer";

export class UserService {
  // put the stuff in here that uses fake data and will eventually contact the server to send or recieve data

  // this is from Post.tsx
  public async getUser(
    token: string,
    alias: string
  ): Promise<UserDto | null> {
    // TODO: Replace with the result of calling server
    const user = FakeData.instance.findUserByAlias(alias);
    return user ? user.dto : null;
  }

  // this is from register.tsx
  public async register(
    firstName: string,
    lastName: string,
    alias: string,
    password: string,
    userImageBytes: Uint8Array,
    imageFileExtension: string
  ): Promise<[UserDto, AuthToken]> {
    // Not neded now, but will be needed when you make the request to the server in milestone 3
    const imageStringBase64: string =
      Buffer.from(userImageBytes).toString("base64");

    // TODO: Replace with the result of calling the server
    const user = FakeData.instance.firstUser;
    let firstuser = user ? user.dto : null;

    if (firstuser === null) {
      throw new Error("Invalid registration");
    }

    return [firstuser, FakeData.instance.authToken];
  }

  public async login(
    alias: string,
    password: string
  ): Promise<[UserDto, AuthToken]> {
    // TODO: Replace with the result of calling the server
    const user = FakeData.instance.firstUser;
    let firstuser = user ? user.dto : null;
    if (firstuser === null) {
      throw new Error("Invalid alias or password");
    }

    return [firstuser, FakeData.instance.authToken];
  }

  public logout = async (userAuthToken: string): Promise<void> => {
    // Pause so we can see the logging out message. Delete when the call to the server is implemented.
    await new Promise((res) => setTimeout(res, 1000));
  };
}
