import styled from "styled-components";
import LogoAsideNavigation from "./Logo/LogoAsideNavigation";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import NavigationLink from "./Navigation/NavigationLink";
import Button from "../ui/Button/Button";

const AsideContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 300px;
  background: #282f39;
`;

const AsideNavigation: React.FC = () => {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await signOut(auth);
      navigate("/", { replace: true });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AsideContainer>
      <LogoAsideNavigation />
      <NavigationLink />
      <Button onClick={logout}>Log out</Button>
    </AsideContainer>
  );
};

export default AsideNavigation;
