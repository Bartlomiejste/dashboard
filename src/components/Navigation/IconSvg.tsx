import styled from "styled-components";
import { IconSvgProps } from "../../models";

export const IconSvgStyled = styled.svg<IconSvgProps>`
  width: ${({ width }) => width || "20px"};
  height: ${({ height }) => height || "20px"};
  fill: ${({ fill }) => fill || "white"};
  margin-right: -50px;
  transition: fill 0.3s;
`;

const IconSvg = ({ width, height, fill }: IconSvgProps) => {
  return <IconSvgStyled width={width} height={height} fill={fill} />;
};

export default IconSvg;
