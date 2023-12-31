import { useState } from "react";
import {
  sendPasswordResetEmail,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import { auth } from "../../config/firebase";
import Input from "../../ui/LoginInput/LoginInput";
import { ErrorMessage, CorrectMessage } from "../../ui/Message/Message";
import Button from "../../ui/Button/Button";
import LoginContentStyled from "../../ui/LoginContent/LoginContent";

const ForgotPasswordForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [correctMessage, setCorrectMessage] = useState<string>("");

  const handleResetPassword = async (event: React.FormEvent<EventTarget>) => {
    event.preventDefault();

    if (!email) {
      setErrorMessage("Please enter your emial.");
      return;
    }

    try {
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);

      if (signInMethods.length === 0) {
        setErrorMessage("Email does not exist in the database.");
        return;
      }

      await sendPasswordResetEmail(auth, email);
      setErrorMessage("");
      setEmail("");
      setCorrectMessage("Reset password email sent successfully.");
    } catch (error) {
      setErrorMessage("Failed to send reset password email.");
    }
  };

  return (
    <LoginContentStyled onSubmit={handleResetPassword} noValidate>
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      {errorMessage ? (
        <ErrorMessage>{errorMessage}</ErrorMessage>
      ) : (
        <CorrectMessage>{correctMessage}</CorrectMessage>
      )}
      <Button>Send reset password</Button>
    </LoginContentStyled>
  );
};

export default ForgotPasswordForm;
