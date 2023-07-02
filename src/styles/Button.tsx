import styled from "styled-components";
import { SM_DOWN } from "../utils/viewport";

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #f08b62;
  margin: 20px 0 10px 0;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;

  @media ${SM_DOWN} {
    padding: 10px;
    font-size: 12px;
  }

  &:hover {
    background-color: #ffa671;
  }
`;

export default Button;
