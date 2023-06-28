import { useState } from "react";
import styled from "styled-components";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";

const Logo = styled.img`
  margin-left: 50px;
  margin-top: 20px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 400px;
  background: white;
  word-break: break-all;
  border: 1px solid rgba(0, 0, 0, 0.274);
`;

const BlocTabs = styled.div`
  display: flex;
  width: 100%;
`;

const Switch = styled.div<{ active?: boolean }>`
  display: flex;
  align-items: center;
  padding: 20px;
  background: rgba(128, 128, 128, 0.075);
  cursor: pointer;
  border-bottom: 1px solid rgba(0, 0, 0, 0.274);
  position: relative;
  width: 100%;

  ${(props) =>
    props.active &&
    `
    background: white;
    border-bottom: 1px solid transparent;

    &::before {
      content: "";
      display: block;
      position: absolute;
      top: -5px;
      left: 50%;
      transform: translateX(-50%);
      width: calc(100% + 2px);
      height: 5px;
      background: #f08b62;
    }
  `}
`;

const Content = styled.div<{ active?: boolean }>`
  display: flex;
  flex-direction: column;
  background: white;
  align-items: center;
  justify-content: center;
  padding: 50px;
  height: 100%;

  ${(props) => !props.active && `display: none;`}
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
`;

const Button = styled.button`
  width: 50%;
  padding: 10px;
  background-color: #f08b62;
  margin: 20px;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    background-color: #ffa671;
  }
`;

const Auth = () => {
  const [loginEmail, setLoginEmail] = useState<string>("");
  const [loginPassword, setLoginPassword] = useState<string>("");

  const [registerEmail, setRegisterEmail] = useState<string>("");
  const [registerPassword, setRegisterPassword] = useState<string>("");
  const [registerRepeatPassword, setRegisterRepeatPassword] =
    useState<string>("");
  const handleSignIn = () => {};

  const handleRegister = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      setRegisterEmail("");
      setRegisterPassword("");
      setRegisterRepeatPassword("");
    } catch (error) {
      console.log("errorRegister", error);
    }
  };

  const [toggleState, setToggleState] = useState<number>(1);

  const toggleTab = (index: number) => {
    setToggleState(index);
  };

  return (
    <>
      <Logo src="/logo.png" alt="Logo" />
      <Container>
        <BlocTabs>
          <Switch active={toggleState === 1} onClick={() => toggleTab(1)}>
            Zaloguj się
          </Switch>
          <Switch active={toggleState === 2} onClick={() => toggleTab(2)}>
            Zajerestruj się
          </Switch>
        </BlocTabs>

        <Content active={toggleState === 1}>
          <Input
            type="email"
            placeholder="Email"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Hasło"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            required
          />
          <Button onClick={handleSignIn}>Zaloguj się</Button>
        </Content>
        <Content active={toggleState === 2}>
          <Input
            type="email"
            placeholder="Email"
            value={registerEmail}
            onChange={(e) => setRegisterEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Hasło"
            value={registerPassword}
            onChange={(e) => setRegisterPassword(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Powtórz hasło"
            value={registerPassword}
            onChange={(e) => setRegisterPassword(e.target.value)}
            required
          />
          <Button onClick={handleRegister}>Zajerestruj się</Button>
        </Content>
      </Container>
    </>
  );
};

export default Auth;
