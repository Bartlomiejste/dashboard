import NavLink from "./NavLink";

const NavigationLink = () => {
  const navLinks = [
    { to: "/dashboard", icon: "dashboard", text: "Dashboard" },
    { to: "/routine", icon: "routine", text: "Routine" },
    { to: "/failure", icon: "failure", text: "Failure" },
    {
      to: "/partsOfMachines",
      icon: "partsOfMachines",
      text: "Parts of machines",
    },
    { to: "/outlook", icon: "outlook", text: "Outlook" },
    { to: "/mgpro", icon: "mgpro", text: "MGPro" },
    { to: "/chat", icon: "chat", text: "Chat" },
  ];

  return (
    <>
      {navLinks.map(({ to, icon, text }, index) => (
        <NavLink key={index} to={to} icon={icon} text={text} />
      ))}
    </>
  );
};

export default NavigationLink;
