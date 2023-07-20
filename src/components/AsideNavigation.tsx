import styled from "styled-components";
import LogoAsideNavigation from "./Logo/LogoAsideNavigation";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import NavigationLink from "./NavigationLink";

const AsideContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 100vh;
  width: 300px;
  background: #282f39;
`;

const LogoAside = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const NavItem = styled.div`
  padding: 10px;
  color: white;
  cursor: pointer;
`;

const LogoutButton = styled.button`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
`;

const AsideNavigation = () => {
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
      <LogoAside>
        <LogoAsideNavigation />
      </LogoAside>
      <NavItem>
        <NavigationLink />
      </NavItem>
      <LogoutButton onClick={logout}>Log out</LogoutButton>
    </AsideContainer>
  );
};

export default AsideNavigation;
