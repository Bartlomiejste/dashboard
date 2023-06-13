import { useState } from "react";
import styled from "styled-components";
import { M_DOWN } from "../../utils/viewport";

const LoginContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const LoginForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 400px;
  height: 400px;
  padding: 20px;
  background-color: #f2f2f2;
  border-radius: 5px;

  @media ${M_DOWN} {
    width: 200px;
  }
`;

const Logo = styled.img`
  margin-left: 50px;
  margin-top: 20px;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
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
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    background-color: #ffa671;
  }
`;

const Auth = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSignIn = () => {
    // Obsługa logowania
  };

  const handleSignUp = () => {
    // Obsługa rejestracji
  };

  return (
    <>
      <Logo src="/logo.png" alt="Logo" />
      <LoginContainer>
        <LoginForm>
          <Title>Logowanie do systemu</Title>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Hasło"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleSignIn}>Zaloguj się</Button>
          <Button onClick={handleSignUp}>Zarejestruj się</Button>
        </LoginForm>
      </LoginContainer>
    </>
  );
};

export default Auth;
