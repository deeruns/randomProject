import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import useToastListener from "../toaster/ToastListenerHook";
import useInfo from "../userInfo/userInfoHook";
import {
  PagedItemPresenter,
  PagedItemView,
} from "../../presenter/PagedItemPresenter";

export const PAGE_SIZE = 10;

interface Props<T, U> {
  presenterGenerator: (view: PagedItemView<T>) => PagedItemPresenter<T, U>;
  itemComponentGenerator: (item: T) => JSX.Element;
}

const ItemScroller = <T, U>(props: Props<T, U>) => {
  const { displayErrorMessage } = useToastListener();
  const [items, setItems] = useState<T[]>([]);
  const [newItems, setNewItems] = useState<T[]>([]);
  const [changedDisplayedUser, setChangedDisplayedUser] = useState(true);

  const { DisplayedUser, userAuthToken } = useInfo();

  useEffect(() => {
    reset();
  }, [DisplayedUser]);

  useEffect(() => {
    if (changedDisplayedUser) {
      loadMoreItems();
    }
  }, [changedDisplayedUser]);

  useEffect(() => {
    if (newItems) {
      setItems([...items, ...newItems]);
    }
  }, [newItems]);

  const reset = async () => {
    setItems([]);
    setNewItems([]);
    setChangedDisplayedUser(true);

    presenter.reset();
  };

  const listener: PagedItemView<T> = {
    addItems: (newItems: T[]) => setNewItems(newItems),
    displayErrorMessage: displayErrorMessage,
  };

  const [presenter] = useState(props.presenterGenerator(listener));

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
            {props.itemComponentGenerator(item)}
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default ItemScroller;
