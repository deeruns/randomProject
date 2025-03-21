import { AuthToken } from "tweeter-shared";
import { LogOutPresenter, LogoutView } from "../../src/presenter/LogOutPresenter";
//import L from "../../src/presenter/LogOutPresenter";
import { mock, instance, verify } from "@typestrong/ts-mockito";

describe("AppNavBarPresenter", () => {
    let mockAppNavBarView; 
    let AppNavBarPresenter;

    const authToken = new AuthToken("token", Date.now());

    beforeEach(() => {
        //set up the mock and make the presenter
        mockAppNavBarView = mock<LogoutView>();
        const mockAppNavBarPresenterViewInstance = instance(mockAppNavBarView);

        //use an instance from a mock when passing it in as a parameter
        AppNavBarPresenter = new LogOutPresenter(mockAppNavBarPresenterViewInstance);
    })
    it("tells the view to display a logging out message", () => {
        //we need to mock the view
        AppNavBarPresenter.logOut("token");
        verify(mockAppNavBarView.displayInfoMessage("Logging Out...", 0)).once();
    });
});