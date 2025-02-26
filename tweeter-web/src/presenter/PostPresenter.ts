// apparently I do not need this

// import { AuthToken, User } from "tweeter-shared";
// import { UserService } from "../model/UserService";
// import { Presenter, View } from "./Presenter";

// export interface PostView extends View {
//   SetDisplayedUser: (user: User) => void;
// }

// export class PostPresenter extends Presenter<PostView> {
//   private userService: UserService;

//   public constructor(view: PostView) {
//     super(view);
//     this.userService = new UserService();
//   }

//   public async navigateToUser(
//     event: React.MouseEvent,
//     userAuthToken: AuthToken | null,
//     CurrentUser: User | null
//   ): Promise<void> {
//     event.preventDefault();

//     try {
//       const alias = this.extractAlias(event.target.toString());

//       const user = await this.userService.getUser(userAuthToken!, alias);

//       if (!!user) {
//         if (CurrentUser!.equals(user)) {
//           this.view.SetDisplayedUser(CurrentUser!);
//         } else {
//           this.view.SetDisplayedUser(user);
//         }
//       }
//     } catch (error) {
//       this.view.displayErrorMessage(
//         `Failed to get user because of exception: ${error}`
//       );
//     }
//   }

//   public extractAlias(value: string): string {
//     const index = value.indexOf("@");
//     return value.substring(index);
//   }
// }
