import React from "react";
import { MemoryRouter } from "react-router-dom";
import Login from "../../../../src/components/authentication/login/Login";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";

library.add(fab);

describe("Login Component", () => {
    it("starts with the sign-in button disables", () => {
        const { signInButton } = registerLoginAndGetElement("/");

        expect(signInButton).toBeDisabled();
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
//we will have to mock the presenter to see if a method is called
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