import { AuthToken, Status, User, Type } from "tweeter-shared";
import { Link } from "react-router-dom";
import useToastListener from "../toaster/ToastListenerHook";
import useInfo from "../userInfo/userInfoHook";
import { PostPresenter, PostView } from "../../presenter/PostPresenter";
import { useState } from "react";

interface Props {
  status: Status;
  //presenterGenerator: (view: PostView) => PostPresenter;
}

const Post = (props: Props) => {
  const { SetDisplayedUser, CurrentUser, userAuthToken } = useInfo();
  const { displayErrorMessage } = useToastListener();

  const listener: PostView = {
    displayErrorMessage: displayErrorMessage,
    // make sure this is correct
    SetDisplayedUser: (user: User) => SetDisplayedUser(user),
  };

  // did I do this right
  //const [presenter] = useState(props.presenterGenerator(listener));
  const presenter = new PostPresenter(listener);

  // uses the data that is fake -> presenter
  // const navigateToUser = async (event: React.MouseEvent): Promise<void> => {
  //   event.preventDefault();

  //   try {
  //     const alias = extractAlias(event.target.toString());

  //     const user = await getUser(userAuthToken!, alias);

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

  // uses the data that is fake -> presenter
  // const extractAlias = (value: string): string => {
  //   const index = value.indexOf("@");
  //   return value.substring(index);
  // };

  // uses fake data -> service
  // const getUser = async (
  //   authToken: AuthToken,
  //   alias: string
  // ): Promise<User | null> => {
  //   // TODO: Replace with the result of calling server
  //   return FakeData.instance.findUserByAlias(alias);
  // };

  return (
    <>
      {props.status.segments.map((segment, index) =>
        segment.type === Type.alias ? (
          <Link
            key={index}
            to={segment.text}
            onClick={(event) =>
              presenter.navigateToUser(event, userAuthToken, CurrentUser)
            }
          >
            {segment.text}
          </Link>
        ) : segment.type === Type.url ? (
          <a
            key={index}
            href={segment.text}
            target="_blank"
            rel="noopener noreferrer"
          >
            {segment.text}
          </a>
        ) : segment.type === Type.newline ? (
          <br key={index} />
        ) : (
          segment.text
        )
      )}
    </>
  );
};

export default Post;
