import React from "react";
import { MemoryRouter } from "react-router-dom";
import Login from "../../../../src/components/authentication/login/Login";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { loginPresenter } from "../../../../src/presenter/LoginPresenter";
import { mock, instance } from "@typestrong/ts-mockito";


library.add(fab);

describe("Login Component", () => {
    it("starts with the sign-in button disables", () => {
        const { signInButton } = registerLoginAndGetElements("/");
        expect(signInButton).toBeDisabled();
    });

    it("enables the sign-in button if both alias and password fields have text", async () => {
        //await and use the user to type text into the field
        const { signInButton, aliasField, passwordField, user } = registerLoginAndGetElements("/");
        await user.type(aliasField, "a");
        await user.type(passwordField, "b");
        expect(signInButton).toBeEnabled();
    });

    it("disables the sign-in button if either fields are cleared", async () => {
        //call function to get rid of duplication??
        const { signInButton, aliasField, passwordField, user } = registerLoginAndGetElements("/");
        await user.type(aliasField, "a");
        await user.type(passwordField, "b");
        expect(signInButton).toBeEnabled();

        //clear the field and diable the button
        await user.clear(aliasField);
        expect(signInButton).toBeDisabled();

        await user.type(aliasField, "3");
        expect(signInButton).toBeEnabled();

        await user.clear(passwordField);
        expect(signInButton).toBeDisabled();

    });

    it("calls the presenter's doLogin method when the sign-in button is clicked", async () => {
        const mockPresenter = mock<loginPresenter>();
        const mockPresenterInstance = instance(mockPresenter);

        const { signInButton, aliasField, passwordField, user } = registerLoginAndGetElements("/", mockPresenterInstance);
    });

});

const renderLogin = (originalUrl: string, presenter?: loginPresenter) => {
    //we need memory router to render the login component and it won't 
    //render the component without it, with the login component inside of it
    //!!presenter ? () : () -- if the presenter doesn't exist, render it one way, if it does exist, render it another way
    return render(
        <MemoryRouter> 
            {!!presenter ? (
                <Login originalUrl = {originalUrl} presenter={presenter}/>
            ) : (
                <Login originalUrl = {originalUrl} />)
            }

        </MemoryRouter>
    );
}
//one function that is rendering and one that is calling the tests
//we will have to mock the presenter to see if a method is called
const registerLoginAndGetElements = (originalUrl: string, presenter?: loginPresenter) => {
    //to interace with an element you create a user event as if the component is actually being called
    const user = userEvent.setup();

    renderLogin(originalUrl, presenter);

    //call screen to gain access to the elements
    const signInButton = screen.getByRole("button", {name: /Sign in/i });
    //its good to label elements so you have access here to the button through screen (see authenticationFields (aria-label))
    const aliasField = screen.getByLabelText("alias");
    const passwordField = screen.getByLabelText("password");

    //we want to return an object that has all these elements in them, so we can access them in our tests

    return { signInButton, aliasField, passwordField, user };
}