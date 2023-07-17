import { useState } from "react";
import {
  fetchSignInMethodsForEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from "../../config/firebase";
import Button from "../../ui/Button/Button";
import Input from "../../ui/LoginInput/LoginInput";
import { ErrorMessage } from "../../ui/Message/Message";
import { useNavigate } from "react-router-dom";
import LoginContentStyled from "../../ui/LoginContent/LoginContent";

const LoginForm = () => {
  const navigate = useNavigate();
  const [loginEmail, setLoginEmail] = useState<string>("");
  const [loginPassword, setLoginPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const signInWithGoogle = async (event: React.FormEvent<EventTarget>) => {
    event.preventDefault();
    try {
      if (!loginPassword || !loginEmail) {
        setErrorMessage("");
        return;
      }
      await signInWithPopup(auth, googleProvider);
      setLoginEmail("");
      setLoginPassword("");
      setErrorMessage("");
      navigate("/dashboard");
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
      const userExists = await checkUserExists(loginEmail);
      if (!userExists) {
        setErrorMessage("The user is not in the database.");
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

  const checkUserExists = async (email: string) => {
    try {
      const userCredential = await fetchSignInMethodsForEmail(auth, email);
      return userCredential.length > 0;
    } catch (error) {
      console.error("Error checking user existence:", error);
      return false;
    }
  };

  return (
    <LoginContentStyled onSubmit={handleSignIn} noValidate>
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
    </LoginContentStyled>
  );
};

export default LoginForm;
