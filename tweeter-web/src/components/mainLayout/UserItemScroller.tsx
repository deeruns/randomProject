import { useContext } from "react";
import { AuthToken, User } from "tweeter-shared";
import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import UserItem from "../userItem/UserItem";
import useToastListener from "../toaster/ToastListenerHook";
import useInfo from "../userInfo/userInfoHook";
import { FolloweePresenter } from "../../presenter/FolloweePresenter";
import {
  UserItemPresenter,
  UserItemView,
} from "../../presenter/UserItemPresenter";

export const PAGE_SIZE = 10;

interface Props {
  // M2A this function will create the presenter instance
  presenterGenerator: (view: UserItemView) => UserItemPresenter;
  //itemComponentGenerator: (item: Status | User) => // what do I put here?
}

const UserItemScroller = (props: Props) => {
  const { displayErrorMessage } = useToastListener();
  const [items, setItems] = useState<User[]>([]);
  const [newItems, setNewItems] = useState<User[]>([]);
  // M2A these were moved to the presenter
  // const [hasMoreItems, setHasMoreItems] = useState(true);
  // const [lastItem, setLastItem] = useState<User | null>(null);
  const [changedDisplayedUser, setChangedDisplayedUser] = useState(true);

  //moved this to below
  // const addItems = (newItems: User[]) =>
  //   setNewItems(newItems);

  const { DisplayedUser, userAuthToken } = useInfo();

  // Initialize the component whenever the displayed user changes
  useEffect(() => {
    reset();
  }, [DisplayedUser]);

  // Load initial items whenever the displayed user changes. Done in a separate useEffect hook so the changes from reset will be visible.
  useEffect(() => {
    if (changedDisplayedUser) {
      loadMoreItems();
    }
  }, [changedDisplayedUser]);

  // Add new items whenever there are new items to add
  useEffect(() => {
    if (newItems) {
      setItems([...items, ...newItems]);
    }
  }, [newItems]);

  // clears out the UI when we change the displayed user
  const reset = async () => {
    setItems([]);
    setNewItems([]);
    // M2A
    // setLastItem(null);
    // setHasMoreItems(true);
    setChangedDisplayedUser(true);

    presenter.reset();
  };

  // M2A create a view object
  // we have hardcoded it to be followee... this brings ups some problems
  // we should pass them in
  // go to the top, where useritemscroller is defined, and find all to see where that is referenced
  // the reference is in app
  // so the app component need to pass the presenter in
  const listener: UserItemView = {
    // M2A as we add method in the interface we will be required to add them here as well
    // we need a data type to encapsulate followee and follower: parent class
    // now we need to add the things that we defined in the interface in useritempresenter
    addItems: (newItems: User[]) => setNewItems(newItems),
    displayErrorMessage: displayErrorMessage,
  };

  // M2A now we need to create a presenter, pass in the FolloweeView item
  // the use state will make sure it does not lose it state everytime we re-render
  const [presenter] = useState(props.presenterGenerator(listener));

  // moved all this to presenter
  const loadMoreItems = async () => {
    presenter.loadMoreItems(userAuthToken!, DisplayedUser!.alias);
    setChangedDisplayedUser(false);
  };

  return (
    <div className="container px-0 overflow-visible vh-100">
      <InfiniteScroll
        className="pr-0 mr-0"
        dataLength={items.length}
        next={loadMoreItems}
        hasMore={presenter.hasMoreItems}
        loader={<h4>Loading...</h4>}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className="row mb-3 mx-0 px-0 border rounded bg-white"
          >
            <UserItem value={item} />
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default UserItemScroller;
