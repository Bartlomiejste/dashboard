import styled from "styled-components";
import CustomImg from "./CustomImg";

const LogoLoginStyled = styled(CustomImg)`
  margin-left: 50px;
  margin-top: 20px;
`;

const LogoLogin: React.FC = () => {
  return <LogoLoginStyled src="/logo.png" alt="Logo" />;
};

export default LogoLogin;
