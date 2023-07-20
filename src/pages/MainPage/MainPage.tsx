import styled from "styled-components";
import MainContainer from "../../components/MainContainer";

const MainPageStyled = styled.div`
  position: relative;
  margin: 0 auto;
  width: 80%;
  height: 100%;
  background: black;
`;

const MainPage: React.FC = () => {
  return (
    <MainPageStyled>
      <MainContainer />
    </MainPageStyled>
  );
};

export default MainPage;
