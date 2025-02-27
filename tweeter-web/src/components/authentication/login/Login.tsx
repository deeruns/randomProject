import "./Login.css";
import "bootstrap/dist/css/bootstrap.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthenticationFormLayout from "../AuthenticationFormLayout";
import useToastListener from "../../toaster/ToastListenerHook";
import AuthenticationFields from "../AuthenticationFields";
import useInfo from "../../userInfo/userInfoHook";
import { loginPresenter, loginView } from "../../../presenter/LoginPresenter";

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

  const listener: loginView = {
    UpdateUserInfo: UpdateUserInfo,
    navigate: navigate,
    displayErrorMessage: displayErrorMessage,
  };

  const loginOnEnter = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key == "Enter" && !checkSubmitButtonStatus()) {
      doLogin();
    }
  };
  const [presenter] = useState(new loginPresenter(listener));

  const doLogin = async () => {
    setIsLoading(true);
    presenter.doLogin(alias, password, rememberMe, props.originalUrl);
    setIsLoading(false);
  };

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
    <AuthenticationFormLayout
      headingText="Please Sign In"
      submitButtonLabel="Sign in"
      oAuthHeading="Sign in with:"
      inputFieldGenerator={inputFieldGenerator}
      switchAuthenticationMethodGenerator={switchAuthenticationMethodGenerator}
      setRememberMe={setRememberMe}
      submitButtonDisabled={checkSubmitButtonStatus}
      isLoading={isLoading} // can this be in the presenter?
      submit={doLogin}
    />
  );
};

export default Login;
