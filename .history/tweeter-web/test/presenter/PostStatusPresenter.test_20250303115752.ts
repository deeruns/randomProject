import { AuthToken, Status, User } from "tweeter-shared";
import { LogoutPresenter, LogoutView } from "../../src/presenter/LogOutPresenter";
import { mock, instance, verify, spy, when, capture, anything } from "@typestrong/ts-mockito";
import { UserService } from "../../src/model/UserService";
import { PostStatusPresenter, PostStatusView } from "../../src/presenter/PostStatusPresenter";
import { StatusService } from "../../src/model/StatusService";

describe("Post Status Presenter Tests", () =>{
    let PostStatusPresenterInstance: PostStatusPresenter;
    let mockPostStatusView: PostStatusView;
    let mockStatusService: StatusService;
    const mockEvent: React.MouseEvent = {
        preventDefault: jest.fn(), // Mock preventDefault as a function
    } as any;
    const mockUserInstance = new User("first", "last", "alias", "image_url");
    const mockAuthTokenInstance = new AuthToken("token", 1);
    const post = "new status posted";
    const status = new Status(post, mockUserInstance!, Date.now());
    
    beforeEach(() => {
        // set up the mock and make the presenter
        mockPostStatusView = mock<PostStatusView>(); //mock the view
        const mockPostStatusViewInstance = instance(mockPostStatusView); //make the instance of the view mock

        //make a spy on the presenter so the actual methods can be called
        const PostStatusPresenterSpy = spy(new PostStatusPresenter(mockPostStatusViewInstance));
        PostStatusPresenterInstance = instance(PostStatusPresenterSpy); //make an instance on the spy

        mockStatusService = mock<StatusService>();
        const mockStatusServiceInstance = instance(mockStatusService);

        when(PostStatusPresenterSpy.statusService).thenReturn(mockStatusServiceInstance);

    });

    it("tells the view to display a post status message", async() =>{
        await PostStatusPresenterInstance.submitPost(mockEvent, mockUserInstance, mockAuthTokenInstance, post);
        verify(mockPostStatusView.displayInfoMessage("Posting status...", 0)).once();
        //do i need to verify the second part of the message?
    });

    it("calls postStatus on the post status service with the correct status string and auth token.", async() =>{
        await PostStatusPresenterInstance.submitPost(mockEvent, mockUserInstance, mockAuthTokenInstance, post);

        verify(mockStatusService.postStatus(mockAuthTokenInstance, status))
        mockStatusService.
        let [captureAuth, captureStatus] = capture(mockStatusService.postStatus).last();

    });

    it("tells the view to clear the last info message, clear the post, and display a status posted message, when the posting of the status is successful", async() =>{


    });

    it("tells the view to display an error message and clear the last info message and does not tell it to clear the post or display a status posted message, when posting of the status is not successful", async() =>{


    });
});