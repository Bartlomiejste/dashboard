import styled from "styled-components";
import AsideNavigation from "../../components/AsideNavigation";
import UserTable from "../../components/UserTable";

const MainPageStyled = styled.div`
  position: relative;
  margin: 0 auto;
  width: 80%;
  height: 100%;
  background: black;
`;

const MainPage = () => {
  return (
    <MainPageStyled>
      <AsideNavigation />
    </MainPageStyled>
  );
};

export default MainPage;
