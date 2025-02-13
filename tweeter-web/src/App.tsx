import "./App.css";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Login from "./components/authentication/login/Login";
import Register from "./components/authentication/register/Register";
import MainLayout from "./components/mainLayout/MainLayout";
import Toaster from "./components/toaster/Toaster";
import { AuthToken, User, FakeData, Status } from "tweeter-shared";
import UserItemScroller from "./components/mainLayout/UserItemScroller";
import StatusItemScroller from "./components/mainLayout/StatusItemScroller";
import useInfo from "./components/userInfo/userInfoHook";
import { FolloweePresenter } from "./presenter/FolloweePresenter";
import { UserItemPresenter, UserItemView } from "./presenter/UserItemPresenter";
import { FollowerPresenter } from "./presenter/FollowerPresenter";
import { StatusItemView } from "./presenter/StatusItemPresenter";
import { FeedPresenter } from "./presenter/FeedPresenter";
import { StoryPresenter } from "./presenter/StoryPresenter";

const App = () => {
  const { CurrentUser, userAuthToken } = useInfo();

  const isAuthenticated = (): boolean => {
    return !!CurrentUser && !!userAuthToken; // do I need to change the rest authTokens?
  };

  return (
    <div>
      <Toaster position="top-right" />
      <BrowserRouter>
        {isAuthenticated() ? (
          <AuthenticatedRoutes />
        ) : (
          <UnauthenticatedRoutes />
        )}
      </BrowserRouter>
    </div>
  );
};

const AuthenticatedRoutes = () => {
  // move this to status service??
  const loadMoreStoryItems = async (
    authToken: AuthToken,
    userAlias: string,
    pageSize: number,
    lastItem: Status | null
  ): Promise<[Status[], boolean]> => {
    // TODO: Replace with the result of calling server
    return FakeData.instance.getPageOfStatuses(lastItem, pageSize);
  };
  // move this to status service
  const loadMoreFeedItems = async (
    authToken: AuthToken,
    userAlias: string,
    pageSize: number,
    lastItem: Status | null
  ): Promise<[Status[], boolean]> => {
    // TODO: Replace with the result of calling server
    return FakeData.instance.getPageOfStatuses(lastItem, pageSize);
  };

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Navigate to="/feed" />} />
        <Route
          path="feed"
          element={
            <StatusItemScroller
              presenterGenerator={(view: StatusItemView) =>
                new FeedPresenter(view)
              }
            />
          }
        />
        <Route
          path="story"
          element={
            <StatusItemScroller
              presenterGenerator={(view: StatusItemView) =>
                new StoryPresenter(view)
              }
            />
          }
        />
        <Route
          path="followees"
          element={
            <UserItemScroller
              key={1}
              presenterGenerator={(view: UserItemView) =>
                new FolloweePresenter(view)
              }
            />
          }
        />
        <Route
          path="followers"
          element={
            <UserItemScroller
              key={2}
              presenterGenerator={(view: UserItemView) =>
                new FollowerPresenter(view)
              }
            />
          }
        />
        <Route path="logout" element={<Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/feed" />} />
      </Route>
    </Routes>
  );
};

const UnauthenticatedRoutes = () => {
  const location = useLocation();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<Login originalUrl={location.pathname} />} />
    </Routes>
  );
};

export default App;
