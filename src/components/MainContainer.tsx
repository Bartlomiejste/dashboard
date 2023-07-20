import { useState, useEffect } from "react";
import { auth } from "../config/firebase";
import { signOut, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import MainPage from "../pages/MainPage/MainPage";
import { MainContainerStyled } from "../ui/MainContainer";
import Layout from "./layout/Layout";
import Chat from "./Chat/Chat";
import AsideNavigation from "./AsideNavigation";
import styled from "styled-components";

const DashboardStyled = styled.div`
  position: absolute;
  background: pink;
  left: 500px;
`;
const MainContainer = () => {
  const navigate = useNavigate();
  const [inputText, setInputText] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true);
        setInputText(user.displayName || "");
      } else {
        setLoggedIn(false);
      }
    });
  }, []);

  const handleInputChange = (event: any) => {
    setInputText(event.target.value);
  };

  const logout = async () => {
    try {
      await signOut(auth);
      navigate("/", { replace: true });
    } catch (err) {
      console.log(err);
    }
  };

  const saveText = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        await updateProfile(user, {
          displayName: inputText,
        });
        console.log("Tekst został zapisany.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (!loggedIn) {
    navigate("/", { replace: true });
  }

  return (
    <>
      <Layout>
        <DashboardStyled>Strona główna projektu</DashboardStyled>
        {/* <input value={inputText} onChange={handleInputChange} />
      <p>{inputText}</p>
      <button onClick={logout}>Wyloguj</button>
      <button onClick={saveText}>Zapisz Tekst</button> */}
        {/* <UserTable /> */}
        {/* <AsideNavigation /> */}
      </Layout>
    </>
  );
};

export default MainContainer;
