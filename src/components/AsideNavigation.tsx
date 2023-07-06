import styled from "styled-components";

const AsideContainer = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  height: 100vh;
  width: 400px;
  background: #282f39;
`;

const AsideNavigation = () => {
  return (
    <>
      <AsideContainer>AsideNavigation</AsideContainer>
    </>
  );
};

export default AsideNavigation;
