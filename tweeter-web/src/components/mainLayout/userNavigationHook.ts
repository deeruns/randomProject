import { useState, useCallback } from "react";
import { AuthToken, User } from "tweeter-shared";
import useInfo from "../userInfo/userInfoHook";
import useToastListener from "../toaster/ToastListenerHook";
import {
  UserNavigationPresenter,
  UserNavigationView,
} from "../../presenter/UserNavigationPresenter";

export function useUser() {
  const { displayErrorMessage } = useToastListener();
  const { SetDisplayedUser, CurrentUser, userAuthToken, DisplayedUser } =
    useInfo();

  const listener: UserNavigationView = {
    displayErrorMessage: displayErrorMessage,
    // make sure this is correct
    SetDisplayedUser: (user: User) => SetDisplayedUser(user),
  };

  // did I do this right
  // const [presenter] = useState(props.presenterGenerator(listener));
  const presenter = new UserNavigationPresenter(listener);

  // move to USERNAVPRESENTER
  const navigateToUser = async (event: React.MouseEvent): Promise<void> => {
    presenter.navigateToUser(event, userAuthToken, CurrentUser);
  };
  //   event.preventDefault();

  //   try {
  //     const alias = extractAlias(event.target.toString()); // dup

  //     const user = await getUser(userAuthToken!, alias); // dup

  //     if (!!user) {
  //       if (CurrentUser!.equals(user)) {
  //         SetDisplayedUser(CurrentUser!);
  //       } else {
  //         SetDisplayedUser(user);
  //       }
  //     }
  //   } catch (error) {
  //     displayErrorMessage(`Failed to get user because of exception: ${error}`);
  //   }
  // };

  // const extractAlias = (value: string): string => {
  //   const index = value.indexOf("@");
  //   return value.substring(index);
  // };

  // fake data
  //   const getUser = async (
  //     authToken: AuthToken,
  //     alias: string
  //   ): Promise<User | null> => {
  //     // TODO: Replace with the result of calling server
  //     return FakeData.instance.findUserByAlias(alias);
  //   };
  //   return { DisplayedUser, navigateToUser, extractAlias, getUser };
  return { navigateToUser };
}

export default useUser;
