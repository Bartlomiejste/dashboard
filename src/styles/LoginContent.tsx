import styled from "styled-components";
import { SM_DOWN } from "../utils/viewport";

const Content = styled.form`
  display: flex;
  flex-direction: column;
  background: white;
  align-items: center;
  justify-content: center;
  padding: 50px;

  @media ${SM_DOWN} {
    font-size: 12px;
  }
`;

export default Content;
