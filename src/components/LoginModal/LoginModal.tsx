import { useState, useEffect } from "react";
import styled from "styled-components";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
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

const Content = styled.form<{ active?: boolean }>`
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
const ErrorMessage = styled.div`
  color: red;
`;

const Auth = () => {
  const [registerEmail, setRegisterEmail] = useState<string>("");
  const [registerPassword, setRegisterPassword] = useState<string>("");
  const [loginEmail, setLoginEmail] = useState<string>("");
  const [loginPassword, setLoginPassword] = useState<string>("");
  const [user, setUser] = useState<string | null | undefined>(undefined);
  const [registerRepeatPassword, setRegisterRepeatPassword] =
    useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser.email);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignIn = async (event: React.FormEvent<EventTarget>) => {
    event.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      setLoginEmail("");
      setLoginPassword("");
      console.log(userCredential.user);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRegister = async (event: React.FormEvent<EventTarget>) => {
    event.preventDefault();
    if (!registerEmail || !registerPassword || !registerRepeatPassword) {
      setErrorMessage("Wypełnij wszystkie pola formularza.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(registerEmail)) {
      setErrorMessage("Niepoprawny format adresu email.");
      return;
    }

    if (registerPassword.length < 8) {
      setErrorMessage("Hasło musi zawierać co najmniej 8 znaków.");
      return;
    }

    if (registerPassword !== registerRepeatPassword) {
      setErrorMessage("Podane hasła nie są identyczne.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      console.log("Rejestracja udana");
      setRegisterEmail("");
      setRegisterPassword("");
      setRegisterRepeatPassword("");
      setErrorMessage("");
    } catch (error) {
      console.log("errorRegister", error);
      setErrorMessage(
        "Wystąpił błąd podczas rejestracji lub użytkownik jest już w bazie."
      );
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  const [toggleState, setToggleState] = useState(1);

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
            Zarejestruj się
          </Switch>
        </BlocTabs>

        <Content active={toggleState === 1} onSubmit={handleSignIn}>
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
          <Button>Zaloguj się</Button>
        </Content>
        <Content active={toggleState === 2} onSubmit={handleRegister}>
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
            value={registerRepeatPassword}
            onChange={(e) => setRegisterRepeatPassword(e.target.value)}
            required
          />
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          <Button>Zarejestruj się</Button>
        </Content>
      </Container>
      <h4>Użytkownik zalogowany:</h4>
      {user ? <p>{user}</p> : <p>Nie zalogowany</p>}

      <button onClick={logout}>Wyloguj</button>
    </>
  );
};

export default Auth;
