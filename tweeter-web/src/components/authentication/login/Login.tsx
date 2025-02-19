import "./Login.css";
import "bootstrap/dist/css/bootstrap.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthenticationFormLayout from "../AuthenticationFormLayout";
import useToastListener from "../../toaster/ToastListenerHook";
import AuthenticationFields from "../AuthenticationFields";
import useInfo from "../../userInfo/userInfoHook";
import { LoginPresenter, LoginView } from "../../../presenter/LoginPresenter";

interface Props {
  originalUrl?: string;
}

const Login = (props: Props) => {
  const [alias, setAlias] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { UpdateUserInfo } = useInfo();
  const { displayErrorMessage } = useToastListener();

  const checkSubmitButtonStatus = (): boolean => {
    return !alias || !password;
  };

  const loginOnEnter = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key == "Enter" && !checkSubmitButtonStatus()) {
      presenter.doLogin(alias, password, rememberMe, props.originalUrl);
    }
  };

  const listener: LoginView = {
    UpdateUserInfo: UpdateUserInfo,
    navigate: () => useNavigate(),
    displayErrorMessage: displayErrorMessage,
  };

  // do I need the useState thing??
  const presenter = new LoginPresenter(listener);

  // to the presenter
  // const doLogin = async () => {
  //   try {
  //     setIsLoading(true);

  //     const [user, authToken] = await login(alias, password);

  //     UpdateUserInfo(user, user, authToken, rememberMe);

  //     if (!!props.originalUrl) {
  //       navigate(props.originalUrl);
  //     } else {
  //       navigate("/");
  //     }
  //   } catch (error) {
  //     displayErrorMessage(
  //       `Failed to log user in because of exception: ${error}`
  //     );
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // to the service
  // const login = async (
  //   alias: string,
  //   password: string
  // ): Promise<[User, AuthToken]> => {
  //   // TODO: Replace with the result of calling the server
  //   const user = FakeData.instance.firstUser;

  //   if (user === null) {
  //     throw new Error("Invalid alias or password");
  //   }

  //   return [user, FakeData.instance.authToken];
  // };

  const inputFieldGenerator = () => {
    return (
      <>
        <AuthenticationFields
          originalUrl={props.originalUrl}
          onEnterFunc={loginOnEnter}
          setAlias={(event) => setAlias(event.target.value)}
          setPassword={(event) => setPassword(event.target.value)}
        />
      </>
    );
  };

  const switchAuthenticationMethodGenerator = () => {
    return (
      <div className="mb-3">
        Not registered? <Link to="/register">Register</Link>
      </div>
    );
  };

  return (
    <AuthenticationFormLayout // changed something in here
      headingText="Please Sign In"
      submitButtonLabel="Sign in"
      oAuthHeading="Sign in with:"
      inputFieldGenerator={inputFieldGenerator}
      switchAuthenticationMethodGenerator={switchAuthenticationMethodGenerator}
      setRememberMe={setRememberMe}
      submitButtonDisabled={checkSubmitButtonStatus}
      isLoading={isLoading}
      submit={presenter.doLogin(alias, password, rememberMe, props.originalUrl)}
    />
  );
};

export default Login;
