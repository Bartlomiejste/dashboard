import styled from "styled-components";

const StyledLogo = styled.img`
  margin-left: 50px;
  margin-top: 20px;
`;

const Logo = () => {
  return <StyledLogo src="/logo.png" alt="Logo" />;
};

export default Logo;
