import React from "react";
import { mock, instance, verify } from "@typestrong/ts-mockito";
import  PostStatus  from "../../../../src/components/postStatus/PostStatus";
import {
    PostStatusPresenter,
    PostStatusView,
  } from "../../../../src/presenter/PostStatusPresenter";
  import {render, screen} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ToastProvider from "../../../../src/components/toaster/ToastProvider";
import UserInfoProvider from "../../../../src/components/userInfo/UserInfoProvider";
import userEvent from "@testing-library/user-event";
import { AuthToken, User } from "tweeter-shared";

describe("Post Status Component", () =>{
    const mockUserInstance = new User("first", "last", "alias", "image_url");
    const mockAuthTokenInstance = new AuthToken("token", 1);

    it("has the post status and clear buttons disabled when first rendered ", () => {
        const { postStatusButton, clearStatusButton} = registerLoginAndGetElements();

        expect(postStatusButton).toBeDisabled();
        expect(clearStatusButton).toBeDisabled();
    });

    it("enables both buttons when the text field has text", async () => {
        const { postStatusButton, clearStatusButton, user, postTextBox} = registerLoginAndGetElements();

        await user.type(postTextBox, "hello");
        expect(postStatusButton).toBeEnabled();
        expect(clearStatusButton).toBeEnabled();
    });

    it("disables both buttons when the text field is cleared", async () => {
        const { postStatusButton, clearStatusButton, user, postTextBox} = registerLoginAndGetElements();

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
        
        const { postStatusButton, clearStatusButton, user, postTextBox} = registerLoginAndGetElements(mockPresenterInstance);

        await user.type(postTextBox, text);
        expect(postStatusButton).toBeEnabled();
        expect(clearStatusButton).toBeEnabled();
        await user.click(postStatusButton);

        verify(mockPresenter.submitPost(mockEvent, alias, auth, text))

    });

});

const renderPostStatusElement = (presenter?: PostStatusPresenter) => {
    return render(
        <MemoryRouter>
            <PostStatus
          presenterGenerator={(view: PostStatusView) => !!presenter ? presenter : new PostStatusPresenter(view)}
        />
        </MemoryRouter>
    );
}

const registerLoginAndGetElements = (presenter?: PostStatusPresenter) => {
    //to interact with an element you create a user event as if the component is actually being called
  const user = userEvent.setup();

  renderPostStatusElement(presenter);

  const postTextBox = screen.getByLabelText("postTextArea");
  const postStatusButton = screen.getByLabelText("postButton");
  const clearStatusButton = screen.getByLabelText("clearButton");

  return { postTextBox, postStatusButton, clearStatusButton, user };
}

