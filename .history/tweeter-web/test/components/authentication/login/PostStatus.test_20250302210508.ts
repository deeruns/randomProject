import { mock, instance, verify } from "@typestrong/ts-mockito";
import { PostStatus } from "../../../../src/components/postStatus/PostStatus";
import {
    PostStatusPresenter,
    PostStatusView,
  } from "../../../../src/presenter/PostStatusPresenter";
  import {render, screen} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

describe("Post Status Component", () =>{
    it("has the post status and clear buttons disabled when first rendered ", () => {
        const { postStatusButton, clearButton} = 
    })

});

const renderPostStatusElement = () => {
    return render(
        <MemoryRouter>
            <PostStatus />
        </MemoryRouter>
    )
}

