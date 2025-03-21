import { AuthToken } from "tweeter-shared";
import { LogoutPresenter, LogoutView } from "../../src/presenter/LogOutPresenter";
import { mock, instance, verify, spy, when, capture, anything } from "@typestrong/ts-mockito";
import { UserService } from "../../src/model/UserService";
import { PostStatusPresenter, PostStatusView } from "../../src/presenter/PostStatusPresenter";
import { StatusService } from "../../src/model/StatusService";

describe("Post Status Presenter Tests", () =>{
    let PostStatusPresenterInstance: PostStatusPresenter;
    let mockPostStatusView: PostStatusView;
    let mockStatusService: StatusService;

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

    
});