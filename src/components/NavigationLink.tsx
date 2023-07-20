import { Link } from "react-router-dom";

const NavigationLink = () => {
  return (
    <>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/chat">Chat</Link>
    </>
  );
};

export default NavigationLink;
