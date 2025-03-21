import { LogOutPresenter, LogoutView } from "../../src/presenter/LogOutPresenter";
//import L from "../../src/presenter/LogOutPresenter";
import { mock, instance, verify } from "@typestrong/ts-mockito";

describe("AppNavBarPresenter", () => {
    let mockAppNavBarView; 
    let AppNavBarPresenter

    beforeEach(() => {
        //set up the mock and make the presenter
        mockAppNavBarView = mock<LogoutView>();
    })
    it("tells the view to display a logging out message", () => {
        //we need to mock the view
        
    });
});