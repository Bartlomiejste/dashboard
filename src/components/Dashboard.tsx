import { useState, useEffect } from "react";
import { auth } from "../config/firebase";
import { signOut, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import MainTable from "./UserTable";
import AsideNavigation from "./AsideNavigation";
import Logo from "./Logo";
import styled from "styled-components";
import MainContent from "./MainContent";

const MainContainer = styled.div`
  width: 100%;
  height: 100vh;
  background: #f08b62;
  overflow: hidden;
`;

const Dashboard = () => {
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
    <MainContainer>
      <MainContent />
      {/* <input value={inputText} onChange={handleInputChange} />
      <p>{inputText}</p>
      <button onClick={logout}>Wyloguj</button>
      <button onClick={saveText}>Zapisz Tekst</button> */}
      {/* <MainTable /> */}
      {/* <AsideNavigation /> */}
    </MainContainer>
  );
};

export default Dashboard;
