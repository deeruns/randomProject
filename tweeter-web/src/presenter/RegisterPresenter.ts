import { AuthToken, User } from "tweeter-shared";
import { UserService } from "../model/UserService";
import { Presenter, View } from "./Presenter";

//change the view and make more in presenter
export interface RegisterView extends View {
  navigate: (url: string) => void;
  UpdateUserInfo: (
    currentUser: User,
    displayedUser: User | null,
    authToken: AuthToken,
    remember: boolean
  ) => void;
  displayErrorMessage: (message: string) => void;
  setImageUrl: (newUrl: string) => void;
  setImageBytes: (newBytes: Uint8Array) => void;
  setImageFileExtension: (newExtension: string) => void;
}

export class RegisterPresenter extends Presenter<RegisterView> {
  //private _view: RegisterView;
  private userService: UserService;

  public constructor(view: RegisterView) {
    super(view);
    this.userService = new UserService();
  }

  public async doRegister(
    firstName: string,
    lastName: string,
    alias: string,
    password: string,
    imageBytes: Uint8Array,
    imageFileExtension: string,
    rememberMe: boolean
  ) {
    this.doFailureReportingOperation(async () => {
      const [user, authToken] = await this.userService.register(
        firstName,
        lastName,
        alias,
        password,
        imageBytes,
        imageFileExtension
      );
      this.view.UpdateUserInfo(user, user, authToken, rememberMe);
      this.doNavigationOperation(() => {
        this.view.navigate("/");
      });
    }, "register user");
  }

  public handleImageFile(file: File | undefined) {
    if (file) {
      this.view.setImageUrl(URL.createObjectURL(file));

      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        const imageStringBase64 = event.target?.result as string;

        // Remove unnecessary file metadata from the start of the string.
        const imageStringBase64BufferContents =
          imageStringBase64.split("base64,")[1];

        // original code
        // const bytes: Uint8Array = Buffer.from(
        //   imageStringBase64BufferContents,
        //   "base64"
        // );

        const binaryString = atob(imageStringBase64BufferContents);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }

        this.view.setImageBytes(bytes);
      };
      reader.readAsDataURL(file);

      // Set image file extension (and move to a separate method)
      const fileExtension = this.getFileExtension(file);
      if (fileExtension) {
        this.view.setImageFileExtension(fileExtension);
      }
    } else {
      this.view.setImageUrl("");
      this.view.setImageBytes(new Uint8Array());
    }
  }

  public getFileExtension(file: File): string | undefined {
    return file.name.split(".").pop();
  }
}
