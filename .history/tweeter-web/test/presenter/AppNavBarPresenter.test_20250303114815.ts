import { AuthToken } from "tweeter-shared";
import { LogoutPresenter, LogoutView } from "../../src/presenter/LogOutPresenter";
import { mock, instance, verify, spy, when, capture, anything } from "@typestrong/ts-mockito";
import { UserService } from "../../src/model/UserService";

describe("AppNavBarPresenter", () => {
    let mockAppNavBarView: LogoutView; 
    let AppNavBarPresenter: LogoutPresenter;
    let mockUserService: UserService;
    const authToken = new AuthToken("token", Date.now());

    beforeEach(() => {
        //set up the mock and make the presenter
        mockAppNavBarView = mock<LogoutView>();
        const mockAppNavBarPresenterViewInstance = instance(mockAppNavBarView);
        //create a spy so we can pass ina mock user service

        const AppNavBarPresenterSpy = spy(new LogoutPresenter(mockAppNavBarPresenterViewInstance));
        //use an instance from a mock when passing it in as a parameter
        //AppNavBarPresenter = new LogOutPresenter(mockAppNavBarPresenterViewInstance);
        AppNavBarPresenter = instance(AppNavBarPresenterSpy);
        //a spy of the presenter will do the same it did before uless you change some of the methods

       // const ??
        mockUserService = mock<UserService>();
        const mockUserServiceInstance = instance(mockUserService);

        when(AppNavBarPresenterSpy.userService).thenReturn(mockUserServiceInstance);
    })
    it("tells the view to display a logging out message", async () => {
        //we need to mock the view
        await AppNavBarPresenter.logOut(authToken);
        verify(mockAppNavBarView.displayInfoMessage("Logging Out...", 0)).once();
    });

    it("calls logout on the user service with the correct authtoken", () =>{
        AppNavBarPresenter.logOut(authToken);
        //method called with specific authToken
        verify(mockUserService.logout(authToken)).once();

        let [captureAuthToken] = capture(mockUserService.logout).last();
        expect(captureAuthToken).toEqual(authToken);
    });

    it("tells the view to clear the last info message, clear the user info, and navigate to the login page", async () => {
        await AppNavBarPresenter.logOut(authToken);

        verify(mockAppNavBarView.clearLastInfoMessage()).once();
        verify(mockAppNavBarView.clearUser).once();
        //verify(mockAppNavBarView.navigatetoLogin).once();

    });

    it("displays an error message and does not clear the last info message, clear the user info and navigate to the login page when log out fails", async() => {
        const error = new Error("An error occurred");
        when(mockUserService.logout(authToken)).thenThrow(error);

        await AppNavBarPresenter.logOut(authToken);

        verify(mockAppNavBarView.displayErrorMessage("Failed to log user out because of exception: An error occurred")).once();

        verify(mockAppNavBarView.clearLastInfoMessage()).never();
        verify(mockAppNavBarView.clearUser).never();
        //verify(mockAppNavBarView).never();
    })
});