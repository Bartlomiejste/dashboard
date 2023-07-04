import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import { auth } from "../config/firebase";
import Button from "../styles/Button";
import Content from "../styles/LoginContent";
import Input from "../styles/LoginInput";
import { ErrorMessage } from "../styles/Message";

const RegisterForm = () => {
  const [registerEmail, setRegisterEmail] = useState<string>("");
  const [registerPassword, setRegisterPassword] = useState<string>("");
  const [registerRepeatPassword, setRegisterRepeatPassword] =
    useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const checkIfUserExists = async (email: string) => {
    try {
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);
      return signInMethods.length > 0;
    } catch (error) {
      return false;
    }
  };

  const handleRegister = async (event: React.FormEvent<EventTarget>) => {
    event.preventDefault();
    if (!registerEmail || !registerPassword || !registerRepeatPassword) {
      setErrorMessage("Please complete all form fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(registerEmail)) {
      setErrorMessage("Incorrect email address format.");
      return;
    }

    if (registerPassword.length < 8) {
      setErrorMessage("Password must contain at least 8 characters.");
      return;
    }

    if (registerPassword !== registerRepeatPassword) {
      setErrorMessage("The passwords provided are not identical.");
      return;
    }

    try {
      const userExists = await checkIfUserExists(registerEmail);
      if (userExists) {
        setErrorMessage("User already exists in the database");
        return;
      }
      await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      setRegisterEmail("");
      setRegisterPassword("");
      setRegisterRepeatPassword("");
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("There was an error during registration");
    }
  };

  return (
    <Content onSubmit={handleRegister} noValidate>
      <Input
        type="email"
        placeholder="Email"
        value={registerEmail}
        onChange={(e) => setRegisterEmail(e.target.value)}
        required
      />
      <Input
        type="password"
        placeholder="Password"
        value={registerPassword}
        onChange={(e) => setRegisterPassword(e.target.value)}
        required
      />
      <Input
        type="password"
        placeholder="Repeat Password"
        value={registerRepeatPassword}
        onChange={(e) => setRegisterRepeatPassword(e.target.value)}
        required
      />
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      <Button>Register</Button>
    </Content>
  );
};

export default RegisterForm;
