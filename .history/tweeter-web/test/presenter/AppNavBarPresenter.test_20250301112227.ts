import { AuthToken } from "tweeter-shared";
import { LogOutPresenter, LogoutView } from "../../src/presenter/LogOutPresenter";
//import L from "../../src/presenter/LogOutPresenter";
import { mock, instance, verify, spy } from "@typestrong/ts-mockito";
import { UserService } from "../../src/model/UserService";

describe("AppNavBarPresenter", () => {
    let mockAppNavBarView: LogoutView; 
    let AppNavBarPresenter: LogOutPresenter;
    let mockUserService: UserService;
    const authToken = new AuthToken("token", Date.now());

    beforeEach(() => {
        //set up the mock and make the presenter
        mockAppNavBarView = mock<LogoutView>();
        const mockAppNavBarPresenterViewInstance = instance(mockAppNavBarView);
        //create a spy so we can pass ina mock user service

        const AppNavBarPresenterSpy = spy(new AppNavBarPresenter(mockAppNavBarPresenterViewInstance));
        //use an instance from a mock when passing it in as a parameter
        //AppNavBarPresenter = new LogOutPresenter(mockAppNavBarPresenterViewInstance);
        AppNavBarPresenter = instance(AppNavBarPresenterSpy);
        //a spy of the presenter will do the same it did before uless you change some of the methods
        const mockUserService = mock<UserService>();
        const mockUserServiceInstance = instance(mockUserService);
    })
    it("tells the view to display a logging out message", () => {
        //we need to mock the view
        AppNavBarPresenter.logOut("token");
        verify(mockAppNavBarView.displayInfoMessage("Logging Out...", 0)).once();
    });

    it("calls logout on the user service with the correct authtoken", () =>{
        AppNavBarPresenter.logOut(authToken);
        verify(
    })
});