import { useContext } from "react";
import { AuthToken, Status } from "tweeter-shared";

import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import useToastListener from "../toaster/ToastListenerHook";
import StatusItem from "../statusItem/StatusItem";
import useInfo from "../userInfo/userInfoHook";
import {
  StatusItemPresenter,
  StatusItemView,
} from "../../presenter/StatusItemPresenter";

export const PAGE_SIZE = 10;
interface Props {
  // M2A this function will create the presenter instance
  presenterGenerator: (view: StatusItemView) => StatusItemPresenter;
}

const StatusItemScroller = (props: Props) => {
  const { displayErrorMessage } = useToastListener();
  const [items, setItems] = useState<Status[]>([]);
  const [newItems, setNewItems] = useState<Status[]>([]);
  // move  to the presenters??
  // const [hasMoreItems, setHasMoreItems] = useState(true);
  // const [lastItem, setLastItem] = useState<Status | null>(null);
  const [changedDisplayedUser, setChangedDisplayedUser] = useState(true);

  //const addItems = (newItems: Status[]) => setNewItems(newItems);

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

  const reset = async () => {
    setItems([]);
    setNewItems([]);
    // M2A, moved to presenter, use this instead
    // setLastItem(null);
    // setHasMoreItems(true);
    presenter.reset();
    setChangedDisplayedUser(true);
  };

  // M2A create a listener
  const listener: StatusItemView = {
    addItems: (newItems: Status[]) => setNewItems(newItems),
    displayErrorMessage: displayErrorMessage,
  };

  //M2A create a presenter and pass in the listener we just made
  const [presenter] = useState(props.presenterGenerator(listener));

  // move to the feed and story presenters
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
            <StatusItem status={item} />
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default StatusItemScroller;
