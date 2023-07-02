import { useState, useEffect } from "react";
import { auth } from "../config/firebase";
import { signOut, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";

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
      navigate("/");
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
    navigate("/");
  }

  return (
    <div>
      <input value={inputText} onChange={handleInputChange} />
      <p>{inputText}</p>
      <button onClick={logout}>Wyloguj</button>
      <button onClick={saveText}>Zapisz Tekst</button>
    </div>
  );
};

export default Dashboard;
