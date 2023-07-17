import styled from "styled-components";
import { SM_DOWN } from "../../utils/viewport";

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;

  @media ${SM_DOWN} {
    font-size: 12px;
  }
`;

export default Input;
