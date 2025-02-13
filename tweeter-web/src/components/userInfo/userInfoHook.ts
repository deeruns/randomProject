import { AuthToken, User } from "tweeter-shared";
import userInfoContextHook from "./userInfoContextHook";

interface UserInfo {
    CurrentUser: User | null;
    DisplayedUser: User | null;
    userAuthToken: AuthToken | null;
    UpdateUserInfo: (
        currentUser: User,
        displayedUser: User | null,
        authToken: AuthToken,
        remember: boolean
      ) => void;
    clearUser: () => void;
    SetDisplayedUser: (user: User) => void;
}
const useInfo = ():  UserInfo => {
    const { currentUser, displayedUser, authToken, updateUserInfo, clearUserInfo, setDisplayedUser} = userInfoContextHook();

    return {
        CurrentUser: currentUser,
        DisplayedUser: displayedUser,
        userAuthToken: authToken,
        UpdateUserInfo: updateUserInfo,
        clearUser: clearUserInfo,  
        SetDisplayedUser: setDisplayedUser
    }
}

export default useInfo;
