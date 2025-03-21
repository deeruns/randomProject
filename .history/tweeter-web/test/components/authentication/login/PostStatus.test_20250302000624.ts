import { mock, instance, verify } from "@typestrong/ts-mockito";
import {PostStatus} from "";
import {
    PostStatusPresenter,
    PostStatusView,
  } from "../../presenter/PostStatusPresenter";
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

        </MemoryRouter>

    )
}

