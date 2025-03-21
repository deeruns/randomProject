import React from "react";
import { mock, instance, verify } from "@typestrong/ts-mockito";
import  PostStatus  from "../../../../src/components/postStatus/PostStatus";
import {
    PostStatusPresenter,
    PostStatusView,
  } from "../../../../src/presenter/PostStatusPresenter";
  import {render, screen} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { AuthToken, User } from "tweeter-shared";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import "@testing-library/jest-dom";
import UserInfoProvider from "../../../../src/components/userInfo/UserInfoProvider";
import ToastProvider from "../../../../src/components/toaster/ToastProvider";
import useuserInfoHook from "../../../../src/components/userInfo/userInfoContextHook";

library.add(fab);

jest.mock("../../../../src/components/userInfo/userInfoContextHook", () => ({
    ...jest.requireActual("../../../../src/components/userInfo/userInfoContextHook"),
    __esModule: true,
    default: jest.fn(),
  }));      
       

describe("Post Status Component", () =>{
    const mockUserInstance = new User("first", "last", "alias", "image_url");
  const mockAuthTokenInstance = new AuthToken("token", 1);

  beforeAll(() => {
    (useuserInfoHook as jest.Mock).mockReturnValue({
      currentUser: mockUserInstance,
      authToken: mockAuthTokenInstance,
    });
  });

    it("has the post status and clear buttons disabled when first rendered ", () => {
        const { postStatusButton, clearStatusButton} = registerLoginAndGetElements();

        expect(postStatusButton).toBeDisabled();
        expect(clearStatusButton).toBeDisabled();
    });

    it("enables both buttons when the text field has text", async () => {
        const { postTextBox, postStatusButton, clearStatusButton, user } = registerLoginAndGetElements();

        await user.type(postTextBox, "hello");
        expect(postStatusButton).toBeEnabled();
        expect(clearStatusButton).toBeEnabled();
    });

    it("disables both buttons when the text field is cleared", async () => {
        const { postTextBox, postStatusButton, clearStatusButton, user } = registerLoginAndGetElements();

        await user.type(postTextBox, "hello");
        expect(postStatusButton).toBeEnabled();
        expect(clearStatusButton).toBeEnabled();

        await user.clear(postTextBox)
        expect(postStatusButton).toBeDisabled();
        expect(clearStatusButton).toBeDisabled();
    });

    it("calls the postStatus method with correct parameters when the Post Status Button is Pressed", async () => {
        const mockPresenter = mock<PostStatusPresenter>();
        const mockPresenterInstance = instance(mockPresenter);
        const alias = mockUserInstance;
        const auth = mockAuthTokenInstance;
        const mockEvent: React.MouseEvent = {
            preventDefault: jest.fn(), // Mock preventDefault as a function
        } as any;
        const text = "hello";
        
        const { postTextBox, postStatusButton, clearStatusButton, user } = registerLoginAndGetElements(mockPresenterInstance);

        await user.type(postTextBox, text);
        expect(postStatusButton).toBeEnabled();
        expect(clearStatusButton).toBeEnabled();
        await user.click(postStatusButton);

        verify(mockPresenter.submitPost(mockEvent, alias, auth, text)).called();

    });
});

const renderPostStatusElement = (presenter?: PostStatusPresenter) => {
    return render(
        <MemoryRouter>
            <PostStatus
          presenterGenerator={(view: PostStatusView) => !!presenter ? presenter : new PostStatusPresenter(view)}
        />
        </MemoryRouter>
        // <MemoryRouter>
        //     <ToastProvider>
        //         <UserInfoProvider>
        //             <PostStatus
        //                 presenterGenerator={(view: PostStatusView) => (presenter ? presenter : new PostStatusPresenter(view))}
        //             />
        //         </UserInfoProvider>
        //     </ToastProvider>
        // </MemoryRouter>
    );
}
const getTextBox = async() => {
    const postTextBox = await screen.findByPlaceholderText("What's on your mind?");
    return postTextBox;
}

const registerLoginAndGetElements = (presenter?: PostStatusPresenter) => {
    //to interact with an element you create a user event as if the component is actually being called
  const user = userEvent.setup();

  renderPostStatusElement(presenter);

  const postTextBox = screen.getByLabelText("postStatusTextArea");
//   const postStatusButton = screen.getByLabelText("postStatusButton");
//   const clearStatusButton = screen.getByLabelText("clearStatusButton");

//   const postTextBox = screen.findByPlaceholderText("What's on your mind?");
  const postStatusButton = screen.getByRole("button", {name: /Post Status/i });
  const clearStatusButton = screen.getByRole("button", {name: /Clear/i });
  //const postTextBox = getTextBox();
  //const postTextBox =  screen.getByPlaceholderText("What's on your mind?");
  return { postTextBox, postStatusButton, clearStatusButton, user };
  

}

