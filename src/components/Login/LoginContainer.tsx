import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import TabSwitch from "./TabSwitch";
import ForgotPasswordForm from "./PassswordReset";
import LogoLogin from "../Logo/LogoLogin";
import LoginContainerStyled from "../../ui/LoginContainer/LoginContainer";

const LoginContainer = () => {
  const [toggleState, setToggleState] = useState<number>(1);

  const toggleTab = (index: number) => {
    setToggleState(index);
  };

  return (
    <>
      <LogoLogin />
      <LoginContainerStyled>
        <TabSwitch toggleTab={toggleTab} toggleState={toggleState} />
        {toggleState === 1 ? (
          <LoginForm />
        ) : toggleState === 2 ? (
          <RegisterForm />
        ) : (
          <ForgotPasswordForm />
        )}
      </LoginContainerStyled>
    </>
  );
};

export default LoginContainer;
