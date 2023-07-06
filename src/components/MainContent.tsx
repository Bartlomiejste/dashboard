import styled from "styled-components";
import Logo from "./Logo";
import AsideNavigation from "./AsideNavigation";

const MainContentPage = styled.div`
  position: relative;
  margin: 0 auto;
  width: 80%;
  height: 100%;
  background: black;
`;

const MainContent = () => {
  return (
    <MainContentPage>
      <Logo />
      <AsideNavigation />
    </MainContentPage>
  );
};

export default MainContent;
