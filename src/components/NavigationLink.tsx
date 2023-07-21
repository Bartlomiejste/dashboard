import { Link } from "react-router-dom";
import styled from "styled-components";

const LinkItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  height: 100%;

  a {
    text-decoration: none;
    padding: 10px;
    color: white;
    cursor: pointer;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      color: #ffa671;
    }
  }
`;

const NavigationLink = () => {
  return (
    <LinkItem>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="#">Routine</Link>
      <Link to="#">Failure analysis</Link>
      <Link to="#">Parts of machines</Link>
      <Link to="#">Outlook</Link>
      <Link to="#">MGPRO</Link>
      <Link to="/chat">Chat</Link>
    </LinkItem>
  );
};

export default NavigationLink;
