import { AuthToken, User } from "tweeter-shared";
import { FollowService } from "../model/FollowService";

export interface UserInfoView {
  setIsFollower: (value: boolean) => void;
  setFolloweeCount: (newCount: number) => void;
  setFollowerCount: (newCount: number) => void;
  displayErrorMessage: (message: string) => void;
  displayInfoMessage: (
    message: string,
    duration: number,
    bootstrapClasses?: string
  ) => void;
  clearLastInfoMessage: () => void;
  //SetDisplayedUser: (user: User) => void;
}

export class UserInfoPresenter {
  private _view: UserInfoView;
  private followService: FollowService;
  private _isLoading: boolean = false;

  public constructor(view: UserInfoView) {
    this._view = view;
    this.followService = new FollowService();
  }

  unfollowDisplayedUser = async (
    event: React.MouseEvent,
    userAuthToken: AuthToken,
    DisplayedUser: User
  ): Promise<void> => {
    event.preventDefault();

    try {
      this._isLoading = true;
      this._view.displayInfoMessage(`Unfollowing ${DisplayedUser!.name}...`, 0);

      const [followerCount, followeeCount] = await this.followService.unfollow(
        userAuthToken!,
        DisplayedUser!
      );

      this._view.setIsFollower(false);
      this._view.setFollowerCount(followerCount);
      this._view.setFolloweeCount(followeeCount);
    } catch (error) {
      this._view.displayErrorMessage(
        `Failed to unfollow user because of exception: ${error}`
      );
    } finally {
      this._view.clearLastInfoMessage();
      this._isLoading = false;
    }
  };

  followDisplayedUser = async (
    event: React.MouseEvent,
    userAuthToken: AuthToken,
    DisplayedUser: User
  ): Promise<void> => {
    event.preventDefault();

    try {
      this._isLoading = true;
      this._view.displayInfoMessage(`Following ${DisplayedUser!.name}...`, 0);

      const [followerCount, followeeCount] = await this.followService.follow(
        userAuthToken!,
        DisplayedUser!
      );

      this._view.setIsFollower(true);
      this._view.setFollowerCount(followerCount);
      this._view.setFolloweeCount(followeeCount);
    } catch (error) {
      this._view.displayErrorMessage(
        `Failed to follow user because of exception: ${error}`
      );
    } finally {
      this._view.clearLastInfoMessage();
      this._isLoading = false;
    }
  };

  setIsFollowerStatus = async (
    authToken: AuthToken,
    currentUser: User,
    displayedUser: User
  ) => {
    try {
      if (currentUser === displayedUser) {
        this._view.setIsFollower(false);
      } else {
        this._view.setIsFollower(
          await this.followService.getIsFollowerStatus(
            authToken!,
            currentUser!,
            displayedUser!
          )
        );
      }
    } catch (error) {
      this._view.displayErrorMessage(
        `Failed to determine follower status because of exception: ${error}`
      );
    }
  };

  setNumbFollowees = async (authToken: AuthToken, displayedUser: User) => {
    try {
      this._view.setFolloweeCount(
        await this.followService.getFolloweeCount(authToken, displayedUser)
      );
    } catch (error) {
      this._view.displayErrorMessage(
        `Failed to get followees count because of exception: ${error}`
      );
    }
  };

  setNumbFollowers = async (authToken: AuthToken, displayedUser: User) => {
    try {
      this._view.setFollowerCount(
        await this.followService.getFollowerCount(authToken, displayedUser)
      );
    } catch (error) {
      this._view.displayErrorMessage(
        `Failed to get followers count because of exception: ${error}`
      );
    }
  };

  //   switchToLoggedInUser = (event: React.MouseEvent, CurrentUser: User): void => {
  //     event.preventDefault();
  //     this._view.SetDisplayedUser(CurrentUser!);
  //   };

  // public get followerCount() {
  //   return this._followerCount;
  // }

  // public get followeeCount() {
  //   return this._followeeCount;
  // }

  // public get isLoading() {
  //   return this._isLoading;
  // }

  // public get isFollower() {
  //   return this._isFollower;
  // }
}
