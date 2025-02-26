import { AuthToken, User } from "tweeter-shared";
import { FollowService } from "../model/FollowService";
import { View, Presenter, MessageView } from "./Presenter";

export interface UserInfoView extends MessageView {
  setIsFollower: (value: boolean) => void;
  setFolloweeCount: (newCount: number) => void;
  setFollowerCount: (newCount: number) => void;
}

export class UserInfoPresenter extends Presenter<UserInfoView> {
  // private _view: UserInfoView;
  private followService: FollowService;
  //private _isLoading: boolean = false;

  public constructor(view: UserInfoView) {
    super(view);
    this.followService = new FollowService();
  }

  unfollowDisplayedUser = async (
    event: React.MouseEvent,
    userAuthToken: AuthToken,
    DisplayedUser: User
  ): Promise<void> => {
    event.preventDefault();

    this.doFailureReportingOperation(async () => {
      //this._isLoading = true;
      try {
        this.view.displayInfoMessage(
          `Unfollowing ${DisplayedUser!.name}...`,
          0
        );

        const [followerCount, followeeCount] =
          await this.followService.unfollow(userAuthToken!, DisplayedUser!);

        this.setFollowCounts(followerCount, followeeCount, false);
      } finally {
        this.view.clearLastInfoMessage();
      }
    }, "unfollow user");
  };

  followDisplayedUser = async (
    event: React.MouseEvent,
    userAuthToken: AuthToken,
    DisplayedUser: User
  ): Promise<void> => {
    event.preventDefault();

    this.doFailureReportingOperation(async () => {
      //this._isLoading = true;
      try {
        this.view.displayInfoMessage(`Following ${DisplayedUser!.name}...`, 0);

        const [followerCount, followeeCount] = await this.followService.follow(
          userAuthToken!,
          DisplayedUser!
        );
        this.setFollowCounts(followerCount, followeeCount, true);
      } finally {
        this.view.clearLastInfoMessage();
      }
    }, "follow user");
  };

  setIsFollowerStatus = async (
    authToken: AuthToken,
    currentUser: User,
    displayedUser: User
  ) => {
    this.doFailureReportingOperation(async () => {
      if (currentUser === displayedUser) {
        this.view.setIsFollower(false);
      } else {
        this.view.setIsFollower(
          await this.followService.getIsFollowerStatus(
            authToken!,
            currentUser!,
            displayedUser!
          )
        );
      }
    }, "determine follower status");
  };

  setNumbFollowees = async (authToken: AuthToken, displayedUser: User) => {
    this.doFailureReportingOperation(async () => {
      this.view.setFolloweeCount(
        await this.followService.getFolloweeCount(authToken, displayedUser)
      );
    }, "get followees count");
  };

  setNumbFollowers = async (authToken: AuthToken, displayedUser: User) => {
    this.doFailureReportingOperation(async () => {
      this.view.setFollowerCount(
        await this.followService.getFollowerCount(authToken, displayedUser)
      );
    }, "get followers count");
  };

  setFollowCounts(
    followerCount: number,
    followeeCount: number,
    following: boolean
  ) {
    this.view.setIsFollower(following);
    this.view.setFollowerCount(followerCount);
    this.view.setFolloweeCount(followeeCount);
  }
}
