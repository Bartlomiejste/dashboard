import styled from "styled-components";
import { Link } from "react-router-dom";
import { IconSvgProps, IconType, NavLinkProps } from "../../models";

const IconSvg = styled.svg<IconSvgProps>`
  width: ${({ width }) => width || "50%"};
  height: ${({ height }) => height || "20px"};
  fill: ${({ fill }) => fill || "white"};
  transition: fill 0.3s;
`;

const LinkText = styled.div`
  width: 100%;
`;

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
    color: #ffff;
    cursor: pointer;
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.3s;

    &:hover ${IconSvg} {
      fill: #ffa671;
    }

    &:hover {
      color: #ffa671;
    }
  }
`;

const icons: IconType = {
  dashboard: (
    <IconSvg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      width="20px"
      height="20px"
      fill="white"
      key="dashboard"
    >
      <path d="M 16 2.59375 L 15.28125 3.28125 L 2.28125 16.28125 L 3.71875 17.71875 L 5 16.4375 L 5 28 L 14 28 L 14 18 L 18 18 L 18 28 L 27 28 L 27 16.4375 L 28.28125 17.71875 L 29.71875 16.28125 L 16.71875 3.28125 Z M 16 5.4375 L 25 14.4375 L 25 26 L 20 26 L 20 16 L 12 16 L 12 26 L 7 26 L 7 14.4375 Z" />
    </IconSvg>
  ),
  routine: (
    <IconSvg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width="20px"
      height="20px"
      fill="white"
      key="routine"
    >
      <path d="M421.938 90.068C330.438 -1.43201 181.563 -1.43201 90.0631 90.068C86.1041 94.0768 83.8919 99.4892 83.9095 105.123C83.9271 110.758 86.1731 116.156 90.1571 120.14C94.1411 124.124 99.5395 126.37 105.174 126.388C110.808 126.405 116.22 124.193 120.229 120.234C195.083 45.37 316.896 45.37 391.771 120.234C466.625 195.094 466.625 316.906 391.771 391.766C325.747 457.775 222.6 465.342 147.626 414.2L166.667 407.853C172.035 406.063 176.472 402.214 179.002 397.152C181.531 392.09 181.947 386.231 180.157 380.863C178.366 375.496 174.517 371.059 169.456 368.529C164.394 365.999 158.535 365.584 153.167 367.374L97.8671 385.811C93.0029 387.435 88.8859 390.755 86.2692 395.165C83.6525 399.575 82.7111 404.78 83.6171 409.827L95.0001 473.109C95.8866 478.03 98.4722 482.483 102.306 485.693C106.14 488.903 110.979 490.665 115.979 490.672C117.253 490.67 118.525 490.555 119.779 490.328C125.347 489.326 130.29 486.154 133.519 481.509C136.749 476.863 138.001 471.125 137 465.557L135.466 457.029C180.316 483.884 232.841 495.014 284.727 488.656C336.614 482.299 384.899 458.817 421.938 421.929C513.427 330.438 513.427 181.563 421.938 90.068Z" />
    </IconSvg>
  ),
  failure: (
    <IconSvg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      width="20px"
      height="20px"
      fill="white"
      key="failure"
    >
      <g id="Analysis">
        <path d="M29,25H27V22a2,2,0,0,0-2-2H23a2,2,0,0,0-2,2v3H19V20a2,2,0,0,0-2-2H15a2,2,0,0,0-2,2v5H11V8A2,2,0,0,0,9,6H7A2,2,0,0,0,5,8V25H3a1,1,0,0,0,0,2H29a1,1,0,0,0,0-2ZM7,25V8H9V25Zm8,0V20h2v5Zm8,0V22h2v3Z" />
        <path d="M21,17a5.948,5.948,0,0,0,3.473-1.113l3.82,3.82a1,1,0,0,0,1.414-1.414l-3.82-3.82A5.995,5.995,0,1,0,21,17ZM18.171,8.171a4,4,0,1,1,0,5.658A3.992,3.992,0,0,1,18.171,8.171Z" />
      </g>
    </IconSvg>
  ),
  partsOfMachines: (
    <IconSvg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      width="20px"
      height="20px"
      fill="white"
      key="partsOfMachines"
    >
      <path d="M15.89,9.76a1,1,0,0,0-.7-.71l-3.36-.9a1,1,0,0,0-1,.26L8.41,10.86a1,1,0,0,0-.26,1l.9,3.36a1,1,0,0,0,.71.7l3.35.9a1,1,0,0,0,1-.26l2.45-2.45a1,1,0,0,0,.26-1Zm-2.82,5-2.24-.6-.6-2.24,1.64-1.64,2.24.6.6,2.24Z" />
      <path d="M58.24,44.82a9.49,9.49,0,0,0-9.36-2.37L21.55,15.12C24.25,5.75,12.7-1.11,5.76,5.76s0,18.52,9.38,15.81L42.45,48.88C40.57,54.69,45.39,61.2,51.53,61,59.89,61.09,64.19,50.7,58.24,44.82Zm-1.41,12c-5.66,5.63-15-.41-12.32-7.89a1.08,1.08,0,0,0-.25-1.07L16.12,19.72a1.09,1.09,0,0,0-1.05-.23A7.54,7.54,0,0,1,5,12.47,7.54,7.54,0,0,1,12.47,5a7.54,7.54,0,0,1,7,10.09,1.1,1.1,0,0,0,.25,1.07h0L47.86,44.26h0a1.08,1.08,0,0,0,1.08.25C56.4,41.77,62.44,51.17,56.83,56.82Z" />
      <path d="M55.46,48.3a1,1,0,0,0-.71-.7l-4-1.09a1,1,0,0,0-1,.26l-3,3a1,1,0,0,0-.26,1l1.09,4a1,1,0,0,0,.7.71l4.06,1.09a1,1,0,0,0,1-.26l3-3a1,1,0,0,0,.26-1Zm-3.14,6.17-2.94-.79-.79-2.94,2.15-2.15,2.94.79.79,2.94Z" />
      <path d="M35.19,24.94a1,1,0,0,0,.71-.29l7.79-7.8a1.07,1.07,0,0,0,.22-1.09A7.83,7.83,0,0,1,50.54,5.1L47.67,8a1,1,0,0,0-.26,1l1.47,5.48a1,1,0,0,0,.7.7l5.48,1.47a1.15,1.15,0,0,0,.26,0,1,1,0,0,0,.71-.29l2.87-2.87a7.83,7.83,0,0,1-10.66,6.63h0a1,1,0,0,0-1.09.22l-7.79,7.8a1,1,0,0,0,1.42,1.42l7.34-7.36C55,24.61,62.32,18.09,60.75,11a1,1,0,0,0-.88-.78,1.06,1.06,0,0,0-.81.27l-4,4-4.36-1.17L49.49,9l4-4a1.06,1.06,0,0,0,.27-.81A1,1,0,0,0,53,3.25C45.86,1.71,39.45,9,41.84,15.86l-7.36,7.37A1,1,0,0,0,35.19,24.94Z" />
      <path d="M28.11,39.36,20.77,46.7a9.32,9.32,0,0,0-3.47-3.47l7.35-7.33a1,1,0,0,0-1.42-1.42l-7.89,7.89C6,39.56-1.06,51.09,5.87,58.13S24.44,58,21.63,48.67l7.9-7.89A1,1,0,0,0,28.11,39.36ZM17.86,56.71a7.47,7.47,0,0,1-10.57,0C2.57,52.12,6.06,43.84,12.57,44,19.08,43.84,22.58,52.12,17.86,56.71Z" />
      <path d="M14.38,46.61a1,1,0,0,0-1-.26L9.3,47.45a1,1,0,0,0-.71.71l-1.1,4.11a1,1,0,0,0,.26,1l3,3a1,1,0,0,0,1,.26l4.11-1.1a1,1,0,0,0,.71-.71l1.1-4.11a1,1,0,0,0-.26-1Zm.39,7-3,.81-2.2-2.2.81-3,3-.8,2.2,2.2Z" />
    </IconSvg>
  ),
  outlook: (
    <IconSvg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100.354 100.352"
      width="20px"
      height="20px"
      fill="white"
      key="outlook"
    >
      <path
        d="M93.09,76.224c0.047-0.145,0.079-0.298,0.079-0.459V22.638c0-0.162-0.032-0.316-0.08-0.462
      c-0.007-0.02-0.011-0.04-0.019-0.06c-0.064-0.171-0.158-0.325-0.276-0.46c-0.008-0.009-0.009-0.02-0.017-0.029
      c-0.005-0.005-0.011-0.007-0.016-0.012c-0.126-0.134-0.275-0.242-0.442-0.323c-0.013-0.006-0.023-0.014-0.036-0.02
      c-0.158-0.071-0.33-0.111-0.511-0.123c-0.018-0.001-0.035-0.005-0.053-0.005c-0.017-0.001-0.032-0.005-0.049-0.005H8.465
      c-0.017,0-0.033,0.004-0.05,0.005c-0.016,0.001-0.032,0.004-0.048,0.005c-0.183,0.012-0.358,0.053-0.518,0.125
      c-0.01,0.004-0.018,0.011-0.028,0.015c-0.17,0.081-0.321,0.191-0.448,0.327c-0.005,0.005-0.011,0.006-0.016,0.011
      c-0.008,0.008-0.009,0.019-0.017,0.028c-0.118,0.135-0.213,0.29-0.277,0.461c-0.008,0.02-0.012,0.04-0.019,0.061
      c-0.048,0.146-0.08,0.3-0.08,0.462v53.128c0,0.164,0.033,0.32,0.082,0.468c0.007,0.02,0.011,0.039,0.018,0.059
      c0.065,0.172,0.161,0.327,0.28,0.462c0.007,0.008,0.009,0.018,0.016,0.026c0.006,0.007,0.014,0.011,0.021,0.018
      c0.049,0.051,0.103,0.096,0.159,0.14c0.025,0.019,0.047,0.042,0.073,0.06c0.066,0.046,0.137,0.083,0.21,0.117
      c0.018,0.008,0.034,0.021,0.052,0.028c0.181,0.077,0.38,0.121,0.589,0.121h83.204c0.209,0,0.408-0.043,0.589-0.121
      c0.028-0.012,0.054-0.03,0.081-0.044c0.062-0.031,0.124-0.063,0.181-0.102c0.03-0.021,0.057-0.048,0.086-0.071
      c0.051-0.041,0.101-0.082,0.145-0.129c0.008-0.008,0.017-0.014,0.025-0.022c0.008-0.009,0.01-0.021,0.018-0.03
      c0.117-0.134,0.211-0.288,0.275-0.458C93.078,76.267,93.083,76.246,93.09,76.224z M9.965,26.04l25.247,23.061L9.965,72.346V26.04z
      M61.711,47.971c-0.104,0.068-0.214,0.125-0.301,0.221c-0.033,0.036-0.044,0.083-0.073,0.121l-11.27,10.294L12.331,24.138h75.472
      L61.711,47.971z M37.436,51.132l11.619,10.613c0.287,0.262,0.649,0.393,1.012,0.393s0.725-0.131,1.011-0.393l11.475-10.481
      l25.243,23.002H12.309L37.436,51.132z M64.778,49.232L90.169,26.04v46.33L64.778,49.232z"
      />
    </IconSvg>
  ),
  mgpro: (
    <IconSvg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      width="20px"
      height="20px"
      fill="white"
      key="mgpro"
    >
      <path
        d="M62,57h-2V28h2c0.375,0,0.718-0.209,0.89-0.542c0.171-0.333,0.142-0.734-0.076-1.039l-5-7
        c-0.375-0.526-1.252-0.526-1.627,0l-5,7c-0.218,0.305-0.247,0.706-0.076,1.039C51.282,27.791,51.625,28,52,28h2v29h-8V34h2
        c0.375,0,0.718-0.209,0.89-0.542c0.171-0.334,0.142-0.734-0.076-1.039l-5-7c-0.375-0.526-1.252-0.526-1.627,0l-5,7
        c-0.218,0.305-0.247,0.705-0.076,1.039C37.282,33.791,37.625,34,38,34h2v23h-8V40h2c0.375,0,0.718-0.209,0.89-0.542
        c0.171-0.334,0.142-0.734-0.076-1.039l-5-7c-0.375-0.526-1.252-0.526-1.627,0l-5,7c-0.218,0.305-0.247,0.705-0.076,1.039
        C23.282,39.791,23.625,40,24,40h2v17h-8V46h2c0.375,0,0.718-0.209,0.89-0.542c0.171-0.334,0.142-0.734-0.076-1.039l-5-7
        c-0.375-0.525-1.252-0.525-1.627,0l-5,7c-0.218,0.305-0.247,0.705-0.076,1.039C9.282,45.791,9.625,46,10,46h2v11H7V2
        c0-0.552-0.447-1-1-1H2C1.447,1,1,1.448,1,2v60c0,0.553,0.447,1,1,1h60c0.553,0,1-0.447,1-1v-4C63,57.447,62.553,57,62,57z M55,26
        h-1.057L57,21.721L60.057,26H59c-0.553,0-1,0.448-1,1v30h-2V27C56,26.448,55.553,26,55,26z M41,32h-1.057L43,27.721L46.057,32H45
        c-0.553,0-1,0.448-1,1v24h-2V33C42,32.448,41.553,32,41,32z M27,38h-1.057L29,33.721L32.057,38H31c-0.553,0-1,0.447-1,1v18h-2V39
        C28,38.447,27.553,38,27,38z M13,44h-1.057L15,39.721L18.057,44H17c-0.553,0-1,0.447-1,1v12h-2V45C14,44.447,13.553,44,13,44z
        M61,61H3V3h2v55c0,0.553,0.447,1,1,1h55V61z"
      />
      <path
        d="M18,25c0.019,0,0.037,0,0.056-0.001l0.997-0.055c10.717-0.596,20.858-5.492,27.997-13.479l2.243,2.242
        c0.287,0.287,0.717,0.373,1.09,0.217C50.757,13.769,51,13.404,51,13V5c0-0.552-0.447-1-1-1l-8.001,0
        c-0.404,0-0.77,0.244-0.924,0.617c-0.155,0.374-0.069,0.804,0.217,1.09l2.282,2.282c-6.088,5.7-14.275,8.669-22.633,8.183
        l-2.883-0.169c-0.269-0.02-0.544,0.082-0.745,0.271C17.113,16.461,17,16.725,17,17v7c0,0.275,0.113,0.538,0.312,0.727
        C17.499,24.902,17.745,25,18,25z M19,18.061l1.824,0.107c9.25,0.547,18.326-2.904,24.883-9.46C45.895,8.52,46,8.265,46,8
        s-0.105-0.52-0.293-0.707L44.414,6L49,6v4.586l-1.294-1.293C47.509,9.095,47.256,8.996,46.957,9
        c-0.279,0.012-0.541,0.14-0.722,0.353C39.435,17.392,29.511,22.343,19,22.943V18.061z"
      />
    </IconSvg>
  ),
  chat: (
    <IconSvg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 25 25"
      width="20px"
      height="20px"
      fill="white"
      key="chat"
    >
      <path
        id="Chat_Bubble"
        data-name="Chat Bubble"
        d="M.5,25A.5.5,0,0,1,0,24.36l1.65-5.6A12.5,12.5,0,1,1,12.5,25a12.36,12.36,0,0,1-6.69-1.94L.67,25A.51.51,0,0,1,.5,25Zm5.37-3a.5.5,0,0,1,.28.08A11.35,11.35,0,0,0,12.5,24a11.49,11.49,0,1,0-9.86-5.57.5.5,0,0,1,.05.4L1.26,23.68,5.7,22A.5.5,0,0,1,5.87,22Z"
      />
    </IconSvg>
  ),
};

const NavLink = ({ to, icon, text }: NavLinkProps) => {
  const IconComponent = icons[icon];

  return (
    <LinkItem>
      <Link to={to}>
        {IconComponent && <IconSvg>{IconComponent}</IconSvg>}
        <LinkText>{text}</LinkText>
      </Link>
    </LinkItem>
  );
};

export default NavLink;