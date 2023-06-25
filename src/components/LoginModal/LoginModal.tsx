import { useState } from "react";
import styled from "styled-components";
import { M_DOWN } from "../../utils/viewport";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import "./LoginModal.css";

// const LoginContainer = styled.div`
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   display: none;
// `;

// const LoginForm = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: space-around;
//   align-items: center;
//   width: 400px;
//   height: 400px;
//   padding: 20px;
//   background-color: #f2f2f2;
//   border-radius: 5px;

//   @media ${M_DOWN} {
//     width: 200px;
//   }
// `;

const Logo = styled.img`
  margin-left: 50px;
  margin-top: 20px;
`;

// const Title = styled.h2`
//   text-align: center;
//   margin-bottom: 20px;
// `;

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

  @media ${M_DOWN} {
    width: 100%;
  }
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
  background: #f1f1f1;
  word-break: break-all;
  border: 1px solid rgba(0, 0, 0, 0.274);
`;

const BlocTabs = styled.div`
  display: flex;
  width: 100%;
`;

const Button2 = styled.div`
  border: none;
`;

const Tabs = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  background: rgba(128, 128, 128, 0.075);
  cursor: pointer;
  border-bottom: 1px solid rgba(0, 0, 0, 0.274);
  position: relative;
  width: 100%;
`;

const Content = styled.div`
  flex-direction: column;
  background: white;
  align-items: center;
  justify-content: center;
  padding: 50px;
  height: 100%;
  display: none;
`;

const Auth = () => {
  const [registerEmail, setRegisterEmail] = useState<string>("");
  const [registerPassword, setRegisterPassword] = useState<string>("");

  const [loginEmail, setLoginEmail] = useState<string>("");
  const [loginPassword, setLoginPassword] = useState<string>("");

  const handleSignIn = () => {};

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      setRegisterEmail("");
      setRegisterPassword("");
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
          <Button2
            className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(1)}
          >
            Zaloguj się
          </Button2>
          <Button2
            className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(2)}
          >
            Zajerestruj się
          </Button2>
        </BlocTabs>
        <div className="content-tabs">
          <div
            className={
              toggleState === 1 ? "content  active-content" : "content"
            }
          >
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
            <Button onClick={handleSignIn}>Zaloguj się</Button>
          </div>

          <div
            className={
              toggleState === 2 ? "content  active-content" : "content"
            }
          >
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
            <Button onClick={handleSignIn}>Zajerestruj się</Button>
          </div>
        </div>
      </Container>
      {/* <LoginContainer>
        <LoginForm>
          <Title>Logowanie do systemu</Title>
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
          <Button onClick={handleSignIn}>Zaloguj się</Button>
          <Button onClick={register}>Zarejestruj się</Button>
        </LoginForm>
      </LoginContainer> */}
    </>
  );
};

export default Auth;
