import styled from "styled-components";
import LogoAsideNavigation from "./Logo/LogoAsideNavigation";

const AsideContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 100vh;
  width: 400px;
  background: #282f39;
`;
const LogoAside = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const AsideNavigation = () => {
  return (
    <AsideContainer>
      <LogoAside>
        <LogoAsideNavigation />
      </LogoAside>
    </AsideContainer>
  );
};

export default AsideNavigation;
