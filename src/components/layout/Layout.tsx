import React, { ReactNode } from "react";
import styled from "styled-components";
import AsideNavigation from "../../components/AsideNavigation";

const MainContainerStyled = styled.div`
  position: relative;
  margin: 0 auto;
  width: 80%;
  height: 100%;
  background: black;
`;

const LayoutContainer = styled.div`
  width: 100%;
  height: 100vh;
  background: linear-gradient(
    to bottom right,
    hsl(22, 80%, 63%),
    hsl(22, 80%, 70%),
    hsl(22, 80%, 77%)
  );

  overflow: hidden;
`;

const MainContent = styled.div`
  padding-left: 300px; /* Width of the navigation */
`;

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <LayoutContainer>
      <MainContainerStyled>
        <AsideNavigation />
        {children}
      </MainContainerStyled>
    </LayoutContainer>
  );
};

export default Layout;
