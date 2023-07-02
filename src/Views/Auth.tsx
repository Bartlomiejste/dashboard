import { useEffect, useState } from "react";
import AuthContainer from "../components/AuthContainer";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../config/firebase";

const Auth = () => {
  // const [user, setUser] = useState<string | null | undefined>();

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       setUser(user.email);
  //     } else {
  //       setUser(null);
  //     }
  //   });

  //   return () => unsubscribe();
  // }, []);

  return (
    <>
      <AuthContainer />
    </>
  );
};

export default Auth;
