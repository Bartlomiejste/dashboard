import styled from "styled-components";
import { SM_DOWN } from "../../utils/viewport";

export const ErrorMessage = styled.div`
  color: red;

  @media ${SM_DOWN} {
    font-size: 12px;
  }
`;

export const CorrectMessage = styled.div`
  color: green;
`;
