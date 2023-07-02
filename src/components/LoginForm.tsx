import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../config/firebase";
import Button from "../styles/Button";
import Content from "../styles/LoginContent";
import Input from "../styles/LoginInput";
import ErrorMessage from "../styles/ErrorMessage";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const [loginEmail, setLoginEmail] = useState<string>("");
  const [loginPassword, setLoginPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      return false;
    }
  };

  const handleSignIn = async (event: React.FormEvent<EventTarget>) => {
    event.preventDefault();
    try {
      if (!loginPassword || !loginEmail) {
        setErrorMessage("Please enter your password or emial.");
        return;
      }
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      setLoginEmail("");
      setLoginPassword("");
      setErrorMessage("");
      navigate("/dashboard");
    } catch (error) {
      setErrorMessage("Bad password, please try again.");
    }
  };

  return (
    <Content onSubmit={handleSignIn} noValidate>
      <Input
        type="email"
        placeholder="Email"
        value={loginEmail}
        onChange={(e) => setLoginEmail(e.target.value)}
        required
      />
      <Input
        type="password"
        placeholder="Password"
        value={loginPassword}
        onChange={(e) => setLoginPassword(e.target.value)}
        required
      />
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      <Button>Log in</Button>
      <Button onClick={signInWithGoogle}>Sign in with Google</Button>
    </Content>
  );
};

export default LoginForm;
