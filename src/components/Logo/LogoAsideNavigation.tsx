import styled from "styled-components";
import CustomImg from "./CustomImg";

const LogoAsideNavigationStyled = styled(CustomImg)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

const LogoAsideNavigation = () => {
  return <LogoAsideNavigationStyled src="/logo.png" alt="Logo" />;
};

export default LogoAsideNavigation;
