import React from "react";
import { MemoryRouter } from "react-router-dom";
import Login from "../../../../src/components/authentication/login/Login";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Login Component", () => {
    it("starts with the sign-in button disables", () => {

    });
});

const renderLogin = (originalUrl: string) => {
    //we need memory router to render the login component and it won't 
    //render the component without it, with the login component inside of it
    return render(
        <MemoryRouter> 
            <Login originalUrl = {originalUrl} />
        </MemoryRouter>
    );
}
//one function that is rendering and one that is calling the tests

const registerLoginAndGetElement = (originalUrl: string) => {
    //to interace with an element you create a user event as if the component is actually being called
    const user = userEvent.setup();

    renderLogin(originalUrl);

    //call screen to gain access to the elements
    const signInButton = screen.getByRole("button", {name: /Sign in/i });
    //its good to label elements so you have access here to the button through screen (see authenticationFields (aria-label))
    const aliasField = screen.getByLabelText("alias");
    const passwordField = screen.getByLabelText("password");

    //we want to return an object that has all these elements in them, so we can access them in our tests

    return { signInButton, aliasField, passwordField, user };
}