import { mock, instance, verify } from "@typestrong/ts-mockito";
import PostStatus from "../../../../src/components/postStatus/PostStatus";
import {
    PostStatusPresenter,
    PostStatusView,
} from "../../../../src/presenter/PostStatusPresenter";
import { render, screen, RenderResult } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ToastProvider from "../../../../src/components/toaster/ToastProvider";
import UserInfoProvider from "../../../../src/components/userInfo/UserInfoProvider";

const renderPostStatusElement = (): RenderResult => {
    return render(
        <MemoryRouter>
            <ToastProvider>
                <UserInfoProvider value={{ CurrentUser: null, userAuthToken: null }}>
                    <PostStatus />
                </UserInfoProvider>
            </ToastProvider>
        </MemoryRouter>
    );
};

describe("Post Status Component", () => {
    it("has the post status and clear buttons disabled when first rendered", () => {
        renderPostStatusElement();
        const postStatusButton = screen.getByText("Post Status").closest("button");
        const clearButton = screen.getByText("Clear");
        expect(postStatusButton).toBeDisabled();
        expect(clearButton).toBeDisabled();
    });
});
