import styled from "styled-components";
import CustomImg from "./CustomImg";

const LogoAside = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const LogoAsideNavigationStyled = styled(CustomImg)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

const LogoAsideNavigation: React.FC = () => {
  return (
    <LogoAside>
      <LogoAsideNavigationStyled src="/logoNav.png" alt="Logo" />
    </LogoAside>
  );
};

export default LogoAsideNavigation;
