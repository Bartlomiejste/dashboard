import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import TabSwitch from "./TabSwitch";
import Container from "../styles/LoginContainer";
import ForgotPasswordForm from "./ForgotPasswordForm";
import Logo from "./Logo";

const AuthContainer = () => {
  const [toggleState, setToggleState] = useState<number>(1);

  const toggleTab = (index: number) => {
    setToggleState(index);
  };

  return (
    <>
      <Logo />
      <Container>
        <TabSwitch toggleTab={toggleTab} toggleState={toggleState} />
        {toggleState === 1 ? (
          <LoginForm />
        ) : toggleState === 2 ? (
          <RegisterForm />
        ) : (
          <ForgotPasswordForm />
        )}
      </Container>
    </>
  );
};

export default AuthContainer;
