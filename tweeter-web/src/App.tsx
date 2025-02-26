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
import { User, Status } from "tweeter-shared";
import useInfo from "./components/userInfo/userInfoHook";
import { FolloweePresenter } from "./presenter/FolloweePresenter";
import { FollowerPresenter } from "./presenter/FollowerPresenter";
import { FeedPresenter } from "./presenter/FeedPresenter";
import { StoryPresenter } from "./presenter/StoryPresenter";
import ItemScroller from "./components/mainLayout/ItemScroller";
import { PagedItemView } from "./presenter/PagedItemPresenter";
import UserItem from "./components/userItem/UserItem";
import StatusItem from "./components/statusItem/StatusItem";

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
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Navigate to="/feed" />} />
        <Route
          path="feed"
          element={
            <ItemScroller // status
              presenterGenerator={(view: PagedItemView<Status>) =>
                new FeedPresenter(view)
              }
              itemComponentGenerator={(item: Status) => (
                <StatusItem status={item} />
              )}
            />
          }
        />
        <Route
          path="story"
          element={
            <ItemScroller
              presenterGenerator={(view: PagedItemView<Status>) =>
                new StoryPresenter(view)
              }
              itemComponentGenerator={(item: Status) => (
                <StatusItem status={item} />
              )}
            />
          }
        />
        <Route
          path="followees"
          element={
            <ItemScroller
              key={1}
              presenterGenerator={(view: PagedItemView<User>) =>
                new FolloweePresenter(view)
              }
              itemComponentGenerator={(item: User) => <UserItem value={item} />}
            />
          }
        />
        <Route
          path="followers"
          element={
            <ItemScroller
              key={2}
              presenterGenerator={(view: PagedItemView<User>) =>
                new FollowerPresenter(view)
              }
              itemComponentGenerator={(item: User) => <UserItem value={item} />}
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
