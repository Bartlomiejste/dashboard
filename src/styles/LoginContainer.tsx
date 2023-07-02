import styled from "styled-components";
import { SM_DOWN } from "../utils/viewport";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 440px;
  height: 420px;
  background: white;
  word-break: break-all;
  border: 1px solid rgba(0, 0, 0, 0.274);

  @media ${SM_DOWN} {
    width: 300px;
  }
`;

export default Container;
