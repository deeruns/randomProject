import { AuthView, AuthPresenter } from "./AuthPresenter";

export interface RegisterView extends AuthView {
  setImageUrl: (newUrl: string) => void;
  setImageBytes: (newBytes: Uint8Array) => void;
  setImageFileExtension: (newExtension: string) => void;
}

export class RegisterPresenter extends AuthPresenter<RegisterView> {
  public async doRegister(
    firstName: string,
    lastName: string,
    alias: string,
    password: string,
    imageBytes: Uint8Array,
    imageFileExtension: string,
    rememberMe: boolean
  ) {
    this.doAuthenticationOperation(
      async () => {
        return await this.service.register(
          firstName,
          lastName,
          alias,
          password,
          imageBytes,
          imageFileExtension
        );
      },
      "register user",
      rememberMe
    );
    this.doNavigationOperation(() => {
      this.view.navigate("/");
    });
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
