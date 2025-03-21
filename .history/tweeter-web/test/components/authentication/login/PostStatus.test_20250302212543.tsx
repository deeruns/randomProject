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

describe("Post Status Component", () =>{
    it("has the post status and clear buttons disabled when first rendered ", () => {
        const { postStatusButton, clearButton} = 
    })

});

const renderPostStatusElement = () => {
    return render(
        <MemoryRouter>
        </MemoryRouter>
    );
}

const registerLoginAndGetElements = () => {
    //to interact with an element you create a user event as if the component is actually being called
    const user = userEvent.setup();

    renderPostStatusElement();

    //call screen to gain access to the elements
    const postButton = screen.getByRole("button", {name: /post/i });
    //its good to label elements so you have access here to the button through screen (see authenticationFields (aria-label))
    const aliasField = screen.getByLabelText("alias");
    const passwordField = screen.getByLabelText("password");

    //we want to return an object that has all these elements in them, so we can access them in our tests

    return { signInButton, aliasField, passwordField, user };
}

