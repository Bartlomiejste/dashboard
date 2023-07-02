import styled from "styled-components";
import { SM_DOWN } from "../utils/viewport";

const ErrorMessage = styled.div`
  color: red;

  @media ${SM_DOWN} {
    font-size: 12px;
  }
`;
export default ErrorMessage;
